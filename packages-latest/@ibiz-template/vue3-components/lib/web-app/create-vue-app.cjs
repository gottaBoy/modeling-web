'use strict';

var vue = require('vue');
var ElementPlus = require('element-plus');
var zhCn = require('../node_modules/.pnpm/element-plus@2.4.4_vue@3.5.22/node_modules/element-plus/dist/locale/zh-cn.cjs');
var en = require('../node_modules/.pnpm/element-plus@2.4.4_vue@3.5.22/node_modules/element-plus/dist/locale/en.cjs');
var vue3Util = require('@ibiz-template/vue3-util');
var ibizVue3 = require('../ibiz-vue3.cjs');
var index = require('../locale/index.cjs');

"use strict";
function createVueApp(rootComponent, rootProps) {
  const app = vue.createApp(rootComponent, rootProps);
  app.component("KeepAlive", vue.KeepAlive);
  app.config.errorHandler = function(err) {
    ibiz.util.error.handle(err);
  };
  const installPlugin = (_, plugin, extraParams) => {
    app.use(plugin, extraParams);
  };
  vue3Util.AppHooks.useComponent.tap(installPlugin);
  const importBIReport = () => import('@ibiz-template-plugin/bi-report');
  importBIReport().then((value) => {
    const biReport = value.default;
    vue3Util.AppHooks.useComponent.callSync(null, biReport);
    vue3Util.AppHooks.createApp.tap((_, _app) => {
      _app.use(biReport);
    });
  });
  const importDataView = () => import('@ibiz-template-plugin/data-view');
  importDataView().then((value) => {
    const dataView = value.default;
    vue3Util.AppHooks.useComponent.callSync(null, dataView);
    vue3Util.AppHooks.createApp.tap((_, _app) => {
      _app.use(dataView);
    });
  });
  if (rootProps) {
    const oldUnMounted = rootProps.unmounted;
    rootProps.unmounted = () => {
      oldUnMounted();
      vue3Util.AppHooks.useComponent.removeTap(installPlugin);
    };
  }
  app.use(index.i18n);
  app.use(ElementPlus, {
    locale: index.i18n.global.locale.value === "zh-CN" ? zhCn.default : en.default
  });
  app.use(vue3Util.piniaInstance);
  app.use(ibizVue3.default);
  vue3Util.AppHooks.createApp.callSync(null, app);
  ibiz.plugin.register(app);
  return app;
}

exports.createVueApp = createVueApp;
