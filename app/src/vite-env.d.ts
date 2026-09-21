/// <reference types="vite/client" />

declare module 'vue-grid-layout';

declare module '@ibiz-template/vue3-components' {
  export function runApp(plugins?: unknown[], opts?: unknown): Promise<void>;
}

declare module '@ibiz-template-plugin/gantt';

declare module '@ibiz-template/devtool';
