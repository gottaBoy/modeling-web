'use strict';

var modelHelper = require('@ibiz-template/model-helper');
var vue3Util = require('@ibiz-template/vue3-util');
var authGuard = require('./auth-guard.cjs');
var index = require('../../../locale/index.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DynaAuthGuard extends authGuard.AuthGuard {
  constructor() {
    super(...arguments);
    __publicField(this, "hasModelInit", false);
    __publicField(this, "noPermissionModel", false);
  }
  async initModel(context, permission = true) {
    if (!this.hasModelInit || this.hasModelInit && this.noPermissionModel !== permission) {
      ibiz.hub.reset();
      const helper = new modelHelper.ModelHelper(
        async (url, params) => {
          const res = await ibiz.net.get(
            "".concat(ibiz.env.remoteModelUrl).concat(url),
            params,
            permission ? {} : { srfdcsystem: ibiz.env.dcSystem }
          );
          return res.data;
        },
        ibiz.env.appId,
        context,
        permission
      );
      const tempApp = await helper.getAppModel();
      await this.initEnvironment(tempApp);
      const app = await ibiz.hub.getAppAsync(ibiz.env.appId);
      const appModel = app.model;
      ibiz.env.isMob = appModel.mobileApp === true;
      if (ibiz.env.isEnableMultiLan) {
        const lang = ibiz.i18n.getLang();
        const m = await helper.getPSAppLang(
          lang.replace("-", "_").toUpperCase()
        );
        const items = m.languageItems || [];
        const data = {};
        items.forEach((item) => {
          data[item.lanResTag] = item.content;
        });
        index.i18n.global.mergeLocaleMessage(lang, data);
      }
      const module = await import('@ibiz-template/web-theme');
      const theme = module.default || module;
      vue3Util.AppHooks.useComponent.callSync(null, theme);
      if (appModel.appUIThemes) {
        await this.loadTheme();
      }
      if (app.model.title) {
        ibiz.util.setBrowserTitle("");
      }
    }
    this.noPermissionModel = permission;
    this.hasModelInit = true;
  }
}

exports.DynaAuthGuard = DynaAuthGuard;
