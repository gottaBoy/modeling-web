'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var devtool = require('@ibiz-template/devtool');
var vue3Util = require('@ibiz-template/vue3-util');
var createVueApp = require('./create-vue-app.cjs');
var attachEnvironmentConfig = require('./attach-environment-config.cjs');
var App = require('./App.cjs');
require('./util/index.cjs');
var index = require('./router/index.cjs');
require('../util/index.cjs');
require('./guard/index.cjs');
var unauthorizedHandler = require('./util/unauthorized-handler/unauthorized-handler.cjs');
var dynaAuthGuard = require('./guard/auth-guard/dyna-auth-guard.cjs');
var appUtil = require('../util/app-util/app-util.cjs');
var openViewUtil = require('../util/open-view-util/open-view-util.cjs');
var renderUtil = require('../util/render-util/render-util.cjs');
var messageUtil = require('../util/message-util/message-util.cjs');
var modalUtil = require('../util/modal-util/modal-util.cjs');
var confirmUtil = require('../util/confirm-util/confirm-util.cjs');
var notificationUtil = require('../util/notification-util/notification-util.cjs');
var loadingUtil = require('../util/loading-util/loading-util.cjs');
var noticeUtil = require('../util/notice-util/notice-util.cjs');
var overlayController = require('../util/overlay-controller/overlay-controller.cjs');
var inlineAiUtil = require('../util/inline-ai-util/inline-ai-util.cjs');
var screenShotUtil = require('../util/screen-shot-util/screen-shot-util.cjs');
var aiChatUtil = require('../util/ai-chat-util/ai-chat-util.cjs');
var qrcodeUtil = require('../util/qrcode-util/qrcode-util.cjs');
var printPreviewUtil = require('../util/print-preview-util/print-preview-util.cjs');
var fullscreenUtil = require('../util/fullscreen/fullscreen-util.cjs');
var appFuncBlockProvider = require('./util/app-func-block-provider/app-func-block-provider.cjs');

"use strict";
async function runApp(plugins, opts) {
  vue3Util.AppHooks.createApp.tap((_, app2) => {
    if (plugins) {
      plugins.forEach((plugin) => {
        app2.use(plugin);
      });
    }
  });
  core.install();
  runtime.install();
  vue3Util.AppHooks.appResorceInited.call(ibiz.hub);
  ibiz.util.getGlobalParam = () => {
    return vue3Util.useAppStore().appStore;
  };
  ibiz.util.getRouterParams = () => {
    const routePath = vue3Util.route2routePath(index.AppRouter.getRouter().currentRoute.value);
    return routePath.pathNodes;
  };
  ibiz.plugin = new vue3Util.PluginFactory();
  ibiz.util.error.register(new unauthorizedHandler.UnauthorizedHandler());
  const app = createVueApp.createVueApp(App.default);
  vue3Util.OverlayContainer.createVueApp = createVueApp.createVueApp;
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
  await attachEnvironmentConfig.attachEnvironmentConfig();
  devtool.install();
  let authGuard;
  if (opts == null ? void 0 : opts.getAuthGuard) {
    authGuard = opts.getAuthGuard();
  } else {
    authGuard = new dynaAuthGuard.DynaAuthGuard();
  }
  index.AppRouter.setAuthGuard(
    (context, notLogin) => authGuard.verify(context, notLogin)
  );
  app.use(index.AppRouter.getRouter(opts == null ? void 0 : opts.userRoutes));
  devtool.listenOpenDevTool(index.AppRouter.getRouter());
  ibiz.appUtil = new appUtil.AppUtil(index.AppRouter.getRouter());
  ibiz.openView = new openViewUtil.OpenViewUtil(index.AppRouter.getRouter());
  ibiz.render = new renderUtil.RenderUtil();
  ibiz.message = new messageUtil.MessageUtil();
  ibiz.modal = new modalUtil.ModalUtil();
  ibiz.confirm = new confirmUtil.ConfirmUtil();
  ibiz.notification = new notificationUtil.NotificationUtil();
  ibiz.loading = new loadingUtil.LoadingUtil();
  ibiz.notice = new noticeUtil.NoticeUtil();
  ibiz.overlay = new overlayController.OverlayController();
  ibiz.inLineAIUtil = new inlineAiUtil.InLineAIUtil();
  ibiz.screenShotUtil = new screenShotUtil.ScreenShotUtil();
  ibiz.aiChatUtil = new aiChatUtil.AIChatUtil();
  ibiz.util.text.format = (value, code) => {
    return app.config.globalProperties.$textFormat(value, code);
  };
  ibiz.qrcodeUtil = new qrcodeUtil.QrcodeUtil();
  ibiz.printPreview = new printPreviewUtil.PrintPreviewUtil();
  ibiz.fullscreenUtil = new fullscreenUtil.FullscreenUtil();
  runtime.registerAppFuncBlockProvider(() => new appFuncBlockProvider.AppFuncBlockProvider());
  await ibiz.i18n.init();
  app.mount("#app");
}

exports.runApp = runApp;
