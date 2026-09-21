import { cp, mkdir, readFile, realpath, stat } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import type { Plugin } from 'vite';

const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function within(root: string, target: string): boolean {
  const path = relative(root, target);
  return path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

export function documentationMiddleware(
  sourceDirectory: string,
  mountPaths: string[],
) {
  const root = resolve(sourceDirectory);
  const mounts = mountPaths.map(path => path.replace(/\/$/, ''));
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void,
  ): Promise<void> => {
    const rawPath = (req.url || '').split('?', 1)[0];
    const mount = mounts.find(
      path => rawPath === path || rawPath.startsWith(`${path}/`),
    );
    if (!mount) {
      next();
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET, HEAD');
      res.end();
      return;
    }
    if (rawPath === mount) {
      res.statusCode = 308;
      res.setHeader(
        'Location',
        `${mount}/${req.url?.slice(rawPath.length) || ''}`,
      );
      res.end();
      return;
    }
    let path: string;
    try {
      path = decodeURIComponent(rawPath.slice(mount.length + 1));
    } catch {
      res.statusCode = 400;
      res.end('Invalid documentation path');
      return;
    }
    if (
      path.split(/[\\/]/).some(part => part === '..' || part.startsWith('.')) ||
      path.includes('\0')
    ) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }
    const file = resolve(root, path || 'index.html');
    try {
      const [realRoot, realFile] = await Promise.all([
        realpath(root),
        realpath(file),
      ]);
      if (!within(realRoot, realFile)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }
      const metadata = await stat(realFile);
      if (!metadata.isFile()) {
        res.statusCode = 404;
        res.end('Documentation file not found');
        return;
      }
      res.statusCode = 200;
      res.setHeader(
        'Content-Type',
        contentTypes[extname(realFile)] || 'application/octet-stream',
      );
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(req.method === 'HEAD' ? undefined : await readFile(realFile));
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      res.statusCode = code === 'ENOENT' || code === 'ENOTDIR' ? 404 : 500;
      res.end(
        res.statusCode === 404
          ? 'Documentation file not found'
          : 'Cannot read documentation',
      );
    }
  };
}

async function canonicalOutput(path: string): Promise<string> {
  try {
    return await realpath(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    return join(await canonicalOutput(dirname(path)), basename(path));
  }
}

export async function publishDocumentation(
  sourceDirectory: string,
  targetDirectory: string,
): Promise<void> {
  const source = await realpath(sourceDirectory);
  const target = await canonicalOutput(resolve(targetDirectory));
  if (within(source, target) || within(target, source)) {
    throw new Error('Documentation source and output must not overlap');
  }
  await stat(join(source, 'index.html'));
  await stat(join(source, 'script/docsify.js'));
  await mkdir(target, { recursive: true });
  await cp(source, target, {
    recursive: true,
    force: true,
    filter: file =>
      !relative(source, file)
        .split(sep)
        .some(part => part.startsWith('.')),
  });
}

export function localDocumentationPlugin(options: {
  sourceDirectory: string;
  mountPaths?: string[];
}): Plugin {
  const mounts = options.mountPaths || ['/doc/'];
  let outputDirectory: string;
  let build = false;
  return {
    name: 'ibiz:local-documentation',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir, 'doc');
      build = config.command === 'build';
    },
    configureServer(server) {
      server.middlewares.use(
        documentationMiddleware(options.sourceDirectory, mounts),
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use(documentationMiddleware(outputDirectory, mounts));
    },
    async closeBundle() {
      if (build)
        await publishDocumentation(options.sourceDirectory, outputDirectory);
    },
  };
}
