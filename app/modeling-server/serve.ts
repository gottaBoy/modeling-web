import { createServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PluginStore } from './store';
import {
  checkDataDirectory,
  checkPluginArtifact,
  listenOptions,
} from './deployment';
import { modelingPluginHandler } from './http';

const root = dirname(fileURLToPath(import.meta.url));
const { host, port } = listenOptions(process.env);
const store = new PluginStore(
  process.env.MODELING_PLUGIN_DATA ||
    resolve(root, '../../../runtime/modeling-plugins'),
);
await checkPluginArtifact(root);
await checkDataDirectory(store.root);

if (process.argv.includes('--check')) {
  console.log(
    'Modeling plugin artifact and data directory are ready (23 plugins).',
  );
} else {
  const handler = modelingPluginHandler(store, root, () =>
    checkDataDirectory(store.root),
  );
  const server = createServer((req, res) => {
    void handler(req, res).catch(() => {
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
  });
  server.listen(port, host, () => {
    console.log(`Modeling plugins listening on ${host}:${port}`);
    console.log(`Local draft storage: ${store.root}`);
  });
  for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    process.on(signal, () => {
      server.close(() => process.exit(0));
      server.closeIdleConnections();
      setTimeout(() => {
        server.closeAllConnections();
        process.exit(0);
      }, 8000).unref();
    });
  }
}
