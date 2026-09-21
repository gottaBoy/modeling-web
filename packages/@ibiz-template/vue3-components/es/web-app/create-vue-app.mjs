import { createApp, KeepAlive } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from '../node_modules/.pnpm/element-plus@2.4.4_vue@3.3.8/node_modules/element-plus/dist/locale/zh-cn.mjs';
import { AppHooks, piniaInstance } from '@ibiz-template/vue3-util';
import IBizVue3 from '../ibiz-vue3.mjs';
import { i18n } from '../locale/index.mjs';

"use strict";
function createVueApp(rootComponent, rootProps) {
  const app = createApp(rootComponent, rootProps);
  app.component("KeepAlive", KeepAlive);
  app.config.errorHandler = function(err) {
    ibiz.util.error.handle(err);
  };
  const installPlugin = (_, plugin) => {
    app.use(plugin);
  };
  AppHooks.useComponent.tap(installPlugin);
  const importBIReport = () => import('@ibiz-template-plugin/bi-report');
  importBIReport().then((value) => {
    const biReport = value.default;
    AppHooks.useComponent.callSync(null, biReport);
    AppHooks.createApp.tap((_, _app) => {
      _app.use(biReport);
    });
  });
  const importDataView = () => import('@ibiz-template-plugin/data-view');
  importDataView().then((value) => {
    const dataView = value.default;
    AppHooks.useComponent.callSync(null, dataView);
    AppHooks.createApp.tap((_, _app) => {
      _app.use(dataView);
    });
  });
  if (rootProps) {
    const oldUnMounted = rootProps.unmounted;
    rootProps.unmounted = () => {
      oldUnMounted();
      AppHooks.useComponent.removeTap(installPlugin);
    };
  }
  app.use(i18n);
  app.use(ElementPlus, {
    locale: zhCn
  });
  app.use(piniaInstance);
  app.use(IBizVue3);
  AppHooks.createApp.callSync(null, app);
  ibiz.plugin.register(app);
  return app;
}

export { createVueApp };
