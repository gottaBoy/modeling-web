'use strict';

var core = require('@ibiz-template/core');
var ramda = require('ramda');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var devtool = require('@ibiz-template/devtool');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AuthGuard {
  constructor(opts) {
    /**
     * 是否是全代码模式
     * @author lxm
     * @date 2024-02-21 11:16:08
     * @type {boolean}
     */
    __publicField(this, "isFullCode", false);
    /**
     * 自定义模型加载
     * @author lxm
     * @date 2024-02-21 11:16:17
     * @type {ModelLoaderProvider}
     */
    __publicField(this, "customModelLoader");
    this.isFullCode = (opts == null ? void 0 : opts.isFullCode) || false;
    this.customModelLoader = (opts == null ? void 0 : opts.customModelLoader) || void 0;
    if (this.customModelLoader) {
      ibiz.hub.registerModelLoaderProvider(this.customModelLoader);
    }
  }
  /**
   * 总的入口校验
   *
   * @author tony001
   * @date 2024-11-12 14:11:32
   * @param {IParams} context
   * @param {boolean} [notLogin=true]
   * @return {*}  {Promise<boolean>}
   */
  async verify(context, notLogin = true) {
    if (notLogin) {
      let result = true;
      try {
        if (ibiz.env.enableAnonymous) {
          await this.anonymousValidate(context);
        } else {
          await this.appInit(context);
        }
      } catch (error) {
        result = false;
        error.tag = "APPINIT";
        ibiz.util.error.handle(error);
      }
      return result;
    }
    await ibiz.hub.loadExtensionPlugin(ibiz.env.appId);
    await this.initModel(context, false);
    return true;
  }
  /**
   * 匿名登录相关校验逻辑，不通过会抛异常
   *
   * @author tony001
   * @date 2024-11-12 14:11:27
   * @param {IParams} context
   * @return {*}  {Promise<void>}
   */
  async anonymousValidate(context) {
    const authInfo = ibiz.auth.getAuthInfo();
    if (authInfo && !authInfo.isAnonymous) {
      try {
        await this.appInit(context);
        return;
      } catch (error) {
        const { status } = error;
        if (status === 401) {
          const refreshToken = core.getAppCookie(core.CoreConst.REFRESH_TOKEN);
          if (refreshToken) {
            try {
              await ibiz.auth.refreshToken();
            } catch (refreshTokenError) {
              if (ibiz.env.enableAnonymous) {
                const loginResult = await ibiz.auth.anonymousLogin();
                if (!loginResult) {
                  throw error;
                }
              } else {
                throw error;
              }
            }
            await this.appInit(context);
            return;
          }
          ibiz.auth.clearAuthData();
        } else {
          throw error;
        }
      }
    }
    if (authInfo == null ? void 0 : authInfo.token) {
      try {
        await this.appInit(context);
      } catch (error) {
        const { status } = error;
        if (status === 401) {
          const loginResult = await ibiz.auth.anonymousLogin();
          if (!loginResult) {
            throw new core.RuntimeError(ibiz.i18n.t("webApp.authGuard.loginFailed"));
          }
          await this.appInit(context);
        } else {
          throw error;
        }
      }
      return;
    }
    await ibiz.hub.loadExtensionPlugin(ibiz.env.appId);
    await this.initModel(context, false);
    const urlPaths = window.location.hash.split("/");
    const viewName = urlPaths[urlPaths.length - 2];
    let viewModel;
    try {
      if (["#", "index"].includes(viewName) && ibiz.hub.defaultPage) {
        viewModel = await ibiz.hub.getAppView(ibiz.hub.defaultPage.id);
      } else {
        viewModel = await ibiz.hub.getAppView(viewName);
      }
    } catch (error) {
      ibiz.log.error(error);
    }
    if (!viewModel) {
      ibiz.log.error(
        "\u627E\u4E0D\u5230\u89C6\u56FE\u6A21\u578B".concat(viewName, ",\u8BF7\u786E\u4FDD\u8BE5\u89C6\u56FE\u914D\u7F6E\u4E86\u533F\u540D\u8BBF\u95EE\u548C\u7528\u6237\u5F15\u7528")
      );
      this.throw401();
      return;
    }
    if (viewModel.accUserMode !== 3) {
      this.throw401();
      return;
    }
    if (!authInfo) {
      const loginResult = await ibiz.auth.anonymousLogin();
      if (!loginResult) {
        throw new core.RuntimeError(ibiz.i18n.t("webApp.authGuard.loginFailed"));
      }
    }
    await this.appInit(context);
  }
  /**
   * 应用参数初始化
   *
   * @author tony001
   * @date 2024-11-12 14:11:06
   * @param {IParams} context
   * @return {*}  {Promise<void>}
   */
  async appInit(context) {
    await vue3Util.AppHooks.beforeInitApp.call({ context });
    try {
      if (ibiz.env.isSaaSMode === true && ibiz.env.isLocalModel !== true) {
        await this.loadOrgData();
      }
      await this.loadAppData(context);
      await vue3Util.AppHooks.authedApp.call({ context });
    } catch (error) {
      const responseStatus = error.status;
      const remember = core.getAppCookie(core.CoreConst.TOKEN_REMEMBER);
      const refreshToken = core.getAppCookie(core.CoreConst.REFRESH_TOKEN);
      if (responseStatus === 401 && remember && refreshToken != null && refreshToken !== "") {
        try {
          try {
            await ibiz.auth.refreshToken();
          } catch (refreshTokenError) {
            if (ibiz.env.enableAnonymous) {
              const loginResult = await ibiz.auth.anonymousLogin();
              if (!loginResult) {
                throw error;
              }
            } else {
              throw error;
            }
          }
          if (ibiz.env.isSaaSMode === true && ibiz.env.isLocalModel !== true) {
            await this.loadOrgData();
          }
          await this.loadAppData(context);
          await vue3Util.AppHooks.authedApp.call({ context });
        } catch (refreshTokenError) {
          throw error;
        }
      } else {
        throw error;
      }
    }
    await ibiz.hub.loadExtensionPlugin(ibiz.env.appId);
    await this.initModel(context);
    await ibiz.auth.extendLogin(context);
    await ibiz.hub.notice.init();
    await ibiz.util.theme.initCustomTheme();
  }
  /**
   * 初始化模型
   *
   * @author tony001
   * @date 2024-11-12 14:11:43
   * @param {IParams} context
   * @param {boolean} [_permission=true]
   * @return {*}  {Promise<void>}
   */
  async initModel(context, _permission = true) {
  }
  /**
   * 加载应用数据
   *
   * @author tony001
   * @date 2024-12-19 20:12:01
   * @param {IParams} [context]
   * @return {*}  {Promise<void>}
   */
  async loadAppData(context) {
    const bol = await ibiz.auth.loadAppData(context);
    if (bol) {
      devtool.updateDevToolConfig();
    }
  }
  /**
   * 加载组织数据
   *
   * @author chitanda
   * @date 2022-07-20 20:07:44
   * @return {*}  {Promise<void>}
   */
  async loadOrgData() {
    const appFuncBlockProvider = await runtime.getAppFuncBlockProvider();
    const res = await appFuncBlockProvider.loadOrgData();
    if (res.ok) {
      const orgDataItems = res.data;
      if (orgDataItems) {
        const [data] = orgDataItems;
        ibiz.orgData = data;
      }
    }
  }
  async initTheme(appModel) {
    const module = await import('@ibiz-template/web-theme');
    const theme = module.default || module;
    vue3Util.AppHooks.useComponent.callSync(null, theme);
    if (appModel.appUIThemes) {
      await this.loadTheme();
    }
  }
  /**
   * 加载主题插件
   *
   * @author chitanda
   * @date 2023-12-03 01:12:38
   * @protected
   * @return {*}  {Promise<void>}
   */
  async loadTheme() {
    const app = ibiz.hub.getApp();
    const uiThemes = app.model.appUIThemes || [];
    if (uiThemes.length > 0) {
      const colorThemes = uiThemes.filter((uiTheme) => {
        return uiTheme.themeParams && uiTheme.themeParams["icon-theme"] !== "true";
      });
      if (colorThemes.length > 0) {
        for (let index = 0; index < colorThemes.length; index++) {
          const colorTheme = colorThemes[index];
          await ibiz.util.theme.loadTheme(colorTheme);
        }
      }
      const iconThemes = uiThemes.filter((uiTheme) => {
        return uiTheme.themeParams && uiTheme.themeParams["icon-theme"] === "true";
      });
      if (iconThemes.length > 0) {
        for (let index = 0; index < iconThemes.length; index++) {
          const iconTheme = iconThemes[index];
          await ibiz.util.theme.loadTheme(iconTheme, "ICON");
        }
      }
    }
  }
  /**
   * 根据应用自定义参数解析成环境变量
   *
   * @author chitanda
   * @date 2023-11-24 19:11:50
   * @return {*}  {Promise<void>}
   */
  async initEnvironment(app) {
    const userParam = app.userParam;
    if (userParam) {
      Object.keys(userParam).forEach((key) => {
        const value = ibiz.util.rawValue.format(userParam[key]);
        const keys = key.split(".");
        let currentObj = ibiz.env;
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (i === keys.length - 1) {
            currentObj[k] = value;
          } else {
            currentObj[k] = currentObj[k] || {};
            currentObj = currentObj[k];
          }
        }
      });
      if (ibiz.env.globalConfig) {
        ibiz.config = ramda.mergeDeepRight(ibiz.config, ibiz.env.globalConfig);
      }
      ibiz.log.setLevel(ibiz.env.logLevel);
    }
  }
  throw401() {
    throw new core.HttpError({
      response: {
        status: 401,
        statusText: ibiz.i18n.t("webApp.authGuard.noPermission")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
  }
}

exports.AuthGuard = AuthGuard;
