import { ModelHelper } from '@ibiz-template/model-helper';
import { AppHooks } from '@ibiz-template/vue3-util';
import { AuthGuard } from './auth-guard.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DynaAuthGuard extends AuthGuard {
  constructor() {
    super(...arguments);
    __publicField(this, "hasModelInit", false);
    __publicField(this, "noPermissionModel", false);
  }
  async initModel(context, permission = true) {
    if (!this.hasModelInit || this.hasModelInit && this.noPermissionModel !== permission) {
      ibiz.hub.reset();
      const helper = new ModelHelper(
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
      ibiz.appUtil.registerAutoCloseOnNavEnd();
      const app = await ibiz.hub.getAppAsync(ibiz.env.appId);
      await AppHooks.initedApp.call({ context, app });
      const appModel = app.model;
      ibiz.env.isMob = appModel.mobileApp === true;
      const module = await import('@ibiz-template/web-theme');
      const theme = module.default || module;
      AppHooks.useComponent.callSync(null, theme);
      if (ibiz.config.theme)
        ibiz.util.theme.setTheme(ibiz.config.theme);
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

export { DynaAuthGuard };
