/// <reference types="vite/client" />

declare module 'vue-grid-layout';
declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module 'element-plus/dist/locale/en.mjs';

declare module '@ibiz-template/vue3-components' {
  export function runApp(plugins?: unknown[], opts?: {
    getAuthGuard?: () => unknown;
    userRoutes?: unknown[];
    environmentOverrides?: { enableMqtt?: boolean };
  }): Promise<void>;
}

declare module '@ibiz-template-plugin/gantt';

declare module '@ibiz-template/devtool';

interface Window {
  Environment?: {
    modelingWebUrl?: string;
  };
}
