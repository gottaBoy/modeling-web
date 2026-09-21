import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve } from 'node:path';
import { modelingPluginApi } from './api';
import type { PluginStore } from './store';

const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

async function serveAsset(
  req: IncomingMessage,
  res: ServerResponse,
  root: string,
): Promise<void> {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD');
      res.writeHead(405);
      res.end();
      return;
    }
    const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    const path = pathname === '/' ? '/modeling-plugins.html' : pathname;
    // Never serve server.mjs, manifests, source maps, drafts, or arbitrary JSON.
    if (
      path !== '/modeling-plugins.html' &&
      !/^\/assets\/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/.test(path)
    ) {
      res.writeHead(404);
      res.end();
      return;
    }
    const canonicalRoot = await realpath(root);
    const file = await realpath(resolve(canonicalRoot, `.${path}`));
    const part = relative(canonicalRoot, file);
    const type = types[extname(file)];
    if (
      isAbsolute(part) ||
      part === '..' ||
      part.startsWith('../') ||
      part !== path.slice(1) ||
      !type ||
      !(await stat(file)).isFile()
    ) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.setHeader('Content-Type', type);
    res.setHeader(
      'Cache-Control',
      extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600',
    );
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.end(req.method === 'HEAD' ? undefined : await readFile(file));
  } catch {
    res.writeHead(404);
    res.end();
  }
}

export function modelingPluginHandler(
  store: PluginStore,
  root: string,
  ready: () => Promise<void>,
) {
  const api = modelingPluginApi(store);
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const pathname = (req.url || '/').split('?')[0];
    if (pathname === '/healthz') {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.setHeader('Allow', 'GET, HEAD');
        res.writeHead(405);
        res.end();
        return;
      }
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      let healthy = true;
      try {
        await ready();
      } catch {
        healthy = false;
      }
      res.statusCode = healthy ? 200 : 503;
      res.end(
        req.method === 'HEAD'
          ? undefined
          : JSON.stringify({
              status: healthy ? 'ok' : 'unavailable',
            }),
      );
      return;
    }
    let handled = true;
    await api(req, res, () => {
      handled = false;
    });
    if (!handled) await serveAsset(req, res, root);
  };
}
