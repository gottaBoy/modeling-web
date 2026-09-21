#!/usr/bin/env node
import { createServer, request as httpRequest } from 'node:http';
import { createReadStream, openSync, closeSync } from 'node:fs';
import { appendFile, readFile, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { containedFile } from './audit-source-contracts.mjs';
import {
  fingerprint,
  treeFingerprint,
} from '../../../scripts/localization-baseline.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.jsonschema': 'application/schema+json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
  '.mp4': 'video/mp4',
};

export function isAllowedProxyRequest(method, pathname) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true;
  if (method !== 'POST') return false;
  return (
    /\/fetch_[a-z0-9_]+$/i.test(pathname) ||
    /\/recents\/my_summary$/.test(pathname) ||
    /\/v7\/(login|logout)$/.test(pathname)
  );
}

export async function createCandidateServer({
  dist,
  upstream = 'http://127.0.0.1:32003',
  log = async () => {},
  identity = 'test',
}) {
  dist = await containedFile(workspace, resolve(dist));
  const target = new URL(upstream);
  if (
    target.protocol !== 'http:' ||
    !['127.0.0.1', 'localhost', 'modelingweb'].includes(target.hostname) ||
    target.username ||
    target.password ||
    target.pathname !== '/' ||
    target.search
  )
    throw new Error(
      'Candidate upstream must be loopback or the existing modelingweb service',
    );
  const respond = (res, status, value) => {
    res.writeHead(status, {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    });
    res.end(JSON.stringify(value));
  };
  const server = createServer(async (req, res) => {
    let url;
    try {
      const host = new URL(`http://${req.headers.host}`);
      if (!['127.0.0.1', 'localhost'].includes(host.hostname))
        return respond(res, 403, { error: 'Loopback host required' });
      if (req.headers.origin && req.headers.origin !== host.origin)
        return respond(res, 403, { error: 'Same-origin requests required' });
      url = new URL(req.url, 'http://candidate.invalid');
      if (url.origin !== 'http://candidate.invalid')
        return respond(res, 400, { error: 'Origin-form URLs required' });
    } catch {
      return respond(res, 400, { error: 'Invalid URL' });
    }
    const pathname = url.pathname;
    res.on('finish', () => {
      void log({ method: req.method, path: pathname, status: res.statusCode });
    });
    if (pathname === '/__candidate/health')
      return respond(res, 200, {
        identity,
        explicitMutationsBlocked: true,
        productionModified: false,
      });
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/portal/') ||
      pathname.startsWith('/modeling-plugins/')
    ) {
      if (!isAllowedProxyRequest(req.method, pathname))
        return respond(res, 403, {
          code: 'CANDIDATE_READ_ONLY',
          message:
            'Explicit business writes are blocked in this verification candidate.',
        });
      const headers = { ...req.headers };
      for (const name of [
        'connection',
        'proxy-connection',
        'keep-alive',
        'te',
        'trailer',
        'transfer-encoding',
        'upgrade',
      ])
        delete headers[name];
      const upstreamUrl = new URL(target);
      upstreamUrl.pathname = pathname;
      upstreamUrl.search = url.search;
      const outgoing = httpRequest(
        upstreamUrl,
        { method: req.method, headers, timeout: 30000 },
        incoming => {
          const responseHeaders = { ...incoming.headers };
          for (const name of ['connection', 'transfer-encoding'])
            delete responseHeaders[name];
          responseHeaders['cache-control'] = 'no-store';
          res.writeHead(incoming.statusCode, responseHeaders);
          incoming.pipe(res);
        },
      );
      outgoing.on('timeout', () =>
        outgoing.destroy(new Error('Upstream timeout')),
      );
      outgoing.on('error', error => {
        void log({
          method: req.method,
          path: pathname,
          error: error.code || 'upstream-failure',
        });
        if (!res.headersSent)
          respond(res, 502, { error: 'Candidate upstream unavailable' });
        else res.destroy();
      });
      req.pipe(outgoing);
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method))
      return respond(res, 405, { error: 'Static resources are read-only' });
    if (pathname === '/' || pathname === '/modeldesign') {
      res.writeHead(302, { location: '/modeldesign/' });
      res.end();
      return;
    }
    let path;
    try {
      const suffix = decodeURIComponent(
        pathname.startsWith('/modeldesign/')
          ? pathname.slice('/modeldesign'.length)
          : pathname,
      );
      path = resolve(dist, `.${suffix}`);
      if (path !== dist && !path.startsWith(`${dist}/`))
        throw new Error('outside');
      if (path === dist || suffix.endsWith('/'))
        path = join(path, 'index.html');
      try {
        path = await containedFile(dist, path);
      } catch {
        if (
          pathname.startsWith('/modeldesign/') &&
          !extname(pathname) &&
          req.headers.accept?.includes('text/html')
        )
          path = join(dist, 'index.html');
        else
          return respond(res, 404, {
            error: 'Candidate asset not found',
            path: pathname,
          });
      }
      const info = await stat(path);
      if (!info.isFile()) return respond(res, 404, { error: 'Not a file' });
      res.writeHead(200, {
        'content-type': mime[extname(path)] || 'application/octet-stream',
        'content-length': info.size,
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      });
      if (req.method === 'HEAD') res.end();
      else
        createReadStream(path)
          .on('error', () => res.destroy())
          .pipe(res);
    } catch {
      respond(res, 403, { error: 'Invalid candidate path' });
    }
  });
  server.on('upgrade', (req, socket) => {
    let path = '';
    try {
      path = new URL(req.url, 'http://candidate.invalid').pathname;
    } catch {}
    void log({ method: 'UPGRADE', path, status: 403 });
    socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
  });
  return server;
}

async function runServer(run, port, upstream, host) {
  const reportPath = join(run, 'report.json');
  const report = JSON.parse(await readFile(reportPath, 'utf8'));
  if (
    report.status !== 'assembled-not-deployed' ||
    report.productionModified !== false
  )
    throw new Error('Only an assembled isolated candidate may be served');
  const dist = await containedFile(run, join(workspace, report.output.path));
  if (
    (await treeFingerprint(dist, { exclude: new Set() })).sha256 !==
    report.output.sha256
  )
    throw new Error('Candidate artifact bytes changed');
  const identity = (await fingerprint(reportPath)).sha256;
  const log = event =>
    appendFile(
      join(run, 'server-requests.jsonl'),
      JSON.stringify({ at: new Date().toISOString(), ...event }) + '\n',
      { mode: 0o600 },
    ).catch(() => {});
  const server = await createCandidateServer({ dist, upstream, log, identity });
  for (let attempt = 0; ; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const onError = error => {
          server.off('listening', onListen);
          reject(error);
        };
        const onListen = () => {
          server.off('error', onError);
          resolve();
        };
        server.once('error', onError);
        server.once('listening', onListen);
        server.listen(port === 0 ? 0 : port + attempt, host);
      });
      break;
    } catch (error) {
      if (error.code !== 'EADDRINUSE' || attempt >= 10) throw error;
    }
  }
  const actualPort = server.address().port;
  const info = {
    pid: process.pid,
    port: actualPort,
    url: `http://127.0.0.1:${actualPort}/modeldesign/`,
    upstream,
    identity,
    startedAt: new Date().toISOString(),
    explicitMutationsBlocked: true,
    runtime: process.env.CANDIDATE_CONTAINER_NAME ? 'docker' : 'host',
    container: process.env.CANDIDATE_CONTAINER_NAME || null,
  };
  await writeFile(
    join(run, 'server.json'),
    JSON.stringify(info, null, 2) + '\n',
    { flag: 'wx', mode: 0o600 },
  );
  console.log(JSON.stringify(info, null, 2));
  const stop = () => {
    server.closeAllConnections();
    server.close(() => process.exit(0));
  };
  process.once('SIGTERM', stop);
  process.once('SIGINT', stop);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { values } = parseArgs({
    options: {
      run: { type: 'string' },
      port: { type: 'string', default: '32703' },
      upstream: { type: 'string', default: 'http://127.0.0.1:32003' },
      host: { type: 'string', default: '127.0.0.1' },
      daemon: { type: 'boolean' },
    },
  });
  if (!values.run) throw new Error('--run is required');
  const run = await containedFile(
    join(workspace, '.artifacts/frontend-candidates'),
    resolve(values.run),
  );
  const port = Number(values.port);
  if (!Number.isInteger(port) || port < 0 || port > 65535)
    throw new Error('Invalid port');
  if (
    values.host !== '127.0.0.1' &&
    !(values.host === '0.0.0.0' && process.env.CANDIDATE_CONTAINER_NAME)
  )
    throw new Error(
      'All-interface binding is only enabled for the named candidate container',
    );
  try {
    await stat(join(run, 'server.json'));
    throw new Error(
      'Candidate already has a server record; use a new candidate run',
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (!values.daemon) await runServer(run, port, values.upstream, values.host);
  else {
    const log = openSync(join(run, 'server.log'), 'ax', 0o600);
    const child = spawn(
      process.execPath,
      [
        fileURLToPath(import.meta.url),
        '--run',
        run,
        '--port',
        String(port),
        '--upstream',
        values.upstream,
        '--host',
        values.host,
      ],
      { detached: true, stdio: ['ignore', log, log] },
    );
    closeSync(log);
    let exit = null;
    child.once('exit', code => {
      exit = code;
    });
    child.unref();
    let info;
    for (let attempt = 0; attempt < 300; attempt++) {
      try {
        info = JSON.parse(await readFile(join(run, 'server.json'), 'utf8'));
        break;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      if (exit !== null)
        throw new Error(
          `Candidate server failed; see ${join(run, 'server.log')}`,
        );
      await delay(100);
    }
    if (!info) {
      child.kill('SIGTERM');
      throw new Error('Candidate server startup timed out');
    }
    console.log(JSON.stringify(info, null, 2));
  }
}
