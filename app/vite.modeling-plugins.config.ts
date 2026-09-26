import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { modelingPluginApi } from './modeling-server/api';
import { PluginStore } from './modeling-server/store';

const root = resolve(__dirname);
const store = new PluginStore(
  process.env.MODELING_PLUGIN_DATA || resolve(root, '../../runtime/modeling-plugins'),
);

export default defineConfig({
  root,
  base: './',
  publicDir: false,
  cacheDir: resolve(root, 'node_modules/.vite-modeling-plugins'),
  plugins: [
    vue(),
    {
      name: 'local-modeling-plugin-api',
      configureServer(server) {
        // Unit tests use in-process middleware; they do not need a WebSocket listener.
        if (process.env.VITEST || process.env.NODE_ENV === 'test') {
          server.ws.listen = () => {};
        }
        server.middlewares.use(modelingPluginApi(store));
        server.middlewares.use((req, res, next) => {
          if (req.url === '/') {
            res.statusCode = 302;
            res.setHeader('Location', '/modeling-plugins.html');
            res.end();
          } else next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use(modelingPluginApi(store));
      },
    },
  ],
  server: { host: '127.0.0.1', port: 4175, strictPort: true, hmr: process.env.VITEST ? false : undefined },
  preview: { host: '127.0.0.1', port: 4175, strictPort: true },
  build: {
    outDir: 'dist-modeling-plugins',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: { input: resolve(root, 'modeling-plugins.html') },
  },
  test: {
    include: ['tests/modeling-plugins-*.test.ts'],
    pool: 'forks',
    poolOptions: { forks: { singleFork: true } },
    setupFiles: ['./tests/setup-node-runtime.ts'],
  },
});
