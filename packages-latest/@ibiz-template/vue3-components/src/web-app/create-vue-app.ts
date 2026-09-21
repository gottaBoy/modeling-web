import { App, Component, KeepAlive, createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { piniaInstance, AppHooks } from '@ibiz-template/vue3-util';
import IBizVue3 from '../ibiz-vue3';
import { i18n } from '../locale';

/**
 * 创建 vue3 实例，避免多实例情况下全局方法未成功挂载
 *
 * @author chitanda
 * @date 2024-02-04 15:02:54
 * @export
 * @param {Component} rootComponent
 * @param {IData} [rootProps]
 * @param {Plugin[]} [plugins]
 * @return {*}  {App<Element>}
 */
export function createVueApp(
  rootComponent: Component,
  rootProps?: IData,
): App<Element> {
  const app = createApp(rootComponent, rootProps);

  app.component('KeepAlive', KeepAlive);

  // 全局 Vue 异常处理
  app.config.errorHandler = function (err: unknown): void {
    ibiz.util.error.handle(err);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const installPlugin = (_: null, plugin: any, extraParams: any): void => {
    app.use(plugin, extraParams);
  };

  AppHooks.useComponent.tap(installPlugin);

  const importBIReport = () => import('@ibiz-template-plugin/bi-report');
  importBIReport().then(value => {
    const biReport = value.default;
    AppHooks.useComponent.callSync(null, biReport);
    AppHooks.createApp.tap((_, _app) => {
      _app.use(biReport);
    });
  });

  // eslint-disable-next-line import/no-extraneous-dependencies
  const importDataView = () => import('@ibiz-template-plugin/data-view');
  importDataView().then(value => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataView: any = value.default;
    AppHooks.useComponent.callSync(null, dataView);
    AppHooks.createApp.tap((_, _app) => {
      _app.use(dataView);
    });
  });

  // 模态等销毁的时候删除全局的app
  if (rootProps) {
    const oldUnMounted = rootProps.unmounted;
    // eslint-disable-next-line no-param-reassign
    rootProps.unmounted = (): void => {
      oldUnMounted();
      AppHooks.useComponent.removeTap(installPlugin);
    };
  }

  app.use(i18n);

  app.use(ElementPlus, {
    locale: i18n.global.locale.value === 'zh-CN' ? zhCn : en,
  });

  app.use(piniaInstance);
  app.use(IBizVue3);

  AppHooks.createApp.callSync(null, app);

  ibiz.plugin.register(app);

  return app;
}
