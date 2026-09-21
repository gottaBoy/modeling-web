import { install } from '@ibiz-template/core';
import { install as install$1, registerAppFuncBlockProvider } from '@ibiz-template/runtime';
import { install as install$2, listenOpenDevTool } from '@ibiz-template/devtool';
import { AppHooks, useAppStore, route2routePath, PluginFactory, OverlayContainer } from '@ibiz-template/vue3-util';
import { createVueApp } from './create-vue-app.mjs';
import { attachEnvironmentConfig } from './attach-environment-config.mjs';
import App from './App.mjs';
import './util/index.mjs';
import { AppRouter } from './router/index.mjs';
import '../util/index.mjs';
import './guard/index.mjs';
import { UnauthorizedHandler } from './util/unauthorized-handler/unauthorized-handler.mjs';
import { DynaAuthGuard } from './guard/auth-guard/dyna-auth-guard.mjs';
import { AppUtil } from '../util/app-util/app-util.mjs';
import { OpenViewUtil } from '../util/open-view-util/open-view-util.mjs';
import { RenderUtil } from '../util/render-util/render-util.mjs';
import { MessageUtil } from '../util/message-util/message-util.mjs';
import { ModalUtil } from '../util/modal-util/modal-util.mjs';
import { ConfirmUtil } from '../util/confirm-util/confirm-util.mjs';
import { NotificationUtil } from '../util/notification-util/notification-util.mjs';
import { LoadingUtil } from '../util/loading-util/loading-util.mjs';
import { NoticeUtil } from '../util/notice-util/notice-util.mjs';
import { OverlayController } from '../util/overlay-controller/overlay-controller.mjs';
import { InLineAIUtil } from '../util/inline-ai-util/inline-ai-util.mjs';
import { ScreenShotUtil } from '../util/screen-shot-util/screen-shot-util.mjs';
import { AIChatUtil } from '../util/ai-chat-util/ai-chat-util.mjs';
import { QrcodeUtil } from '../util/qrcode-util/qrcode-util.mjs';
import { PrintPreviewUtil } from '../util/print-preview-util/print-preview-util.mjs';
import { FullscreenUtil } from '../util/fullscreen/fullscreen-util.mjs';
import { AppFuncBlockProvider } from './util/app-func-block-provider/app-func-block-provider.mjs';

"use strict";
async function runApp(plugins, opts) {
  AppHooks.createApp.tap((_, app2) => {
    if (plugins) {
      plugins.forEach((plugin) => {
        app2.use(plugin);
      });
    }
  });
  install();
  install$1();
  AppHooks.appResorceInited.call(ibiz.hub);
  ibiz.util.getGlobalParam = () => {
    return useAppStore().appStore;
  };
  ibiz.util.getRouterParams = () => {
    const routePath = route2routePath(AppRouter.getRouter().currentRoute.value);
    return routePath.pathNodes;
  };
  ibiz.plugin = new PluginFactory();
  ibiz.util.error.register(new UnauthorizedHandler());
  const app = createVueApp(App);
  OverlayContainer.createVueApp = createVueApp;
  window.onerror = function(_event, _source, _lineno, _colno, error) {
    if (error) {
      ibiz.util.error.handle(error);
    }
    return true;
  };
  window.addEventListener("unhandledrejection", function(event) {
    event.preventDefault();
    event.promise.catch((err) => {
      ibiz.util.error.handle(err);
    });
  });
  await attachEnvironmentConfig();
  install$2();
  let authGuard;
  if (opts == null ? void 0 : opts.getAuthGuard) {
    authGuard = opts.getAuthGuard();
  } else {
    authGuard = new DynaAuthGuard();
  }
  AppRouter.setAuthGuard(
    (context, notLogin) => authGuard.verify(context, notLogin)
  );
  app.use(AppRouter.getRouter(opts == null ? void 0 : opts.userRoutes));
  listenOpenDevTool(AppRouter.getRouter());
  ibiz.appUtil = new AppUtil(AppRouter.getRouter());
  ibiz.openView = new OpenViewUtil(AppRouter.getRouter());
  ibiz.render = new RenderUtil();
  ibiz.message = new MessageUtil();
  ibiz.modal = new ModalUtil();
  ibiz.confirm = new ConfirmUtil();
  ibiz.notification = new NotificationUtil();
  ibiz.loading = new LoadingUtil();
  ibiz.notice = new NoticeUtil();
  ibiz.overlay = new OverlayController();
  ibiz.inLineAIUtil = new InLineAIUtil();
  ibiz.screenShotUtil = new ScreenShotUtil();
  ibiz.aiChatUtil = new AIChatUtil();
  ibiz.util.text.format = (value, code) => {
    return app.config.globalProperties.$textFormat(value, code);
  };
  ibiz.qrcodeUtil = new QrcodeUtil();
  ibiz.printPreview = new PrintPreviewUtil();
  ibiz.fullscreenUtil = new FullscreenUtil();
  registerAppFuncBlockProvider(() => new AppFuncBlockProvider());
  await ibiz.i18n.init();
  app.mount("#app");
}

export { runApp };
