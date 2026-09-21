'use strict';

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AppUtil {
  /**
   * Creates an instance of AppUtil.
   * @author tony001
   * @date 2024-05-14 17:05:00
   * @param {Router} router
   */
  constructor(router) {
    this.router = router;
    /**
     * @description 视图缓存中心
     * @type {Map<string, IApiViewController>}
     * @memberof AppUtil
     */
    __publicField(this, "viewCacheCenter", /* @__PURE__ */ new Map());
  }
  /**
   * @description 注册导航结束事件
   * @param {(form: string, to: string) => void} [callBack]
   * @memberof AppUtil
   */
  registerEventOnNavEnd(callBack) {
    this.router.afterEach((form, to) => {
      if (callBack)
        callBack(form.fullPath, to.fullPath);
    });
  }
  /**
   * @description 注册路由导航完成关闭模态类视图
   */
  registerAutoCloseOnNavEnd() {
    if (!ibiz.config.common.autoCloseModalView || !this.router)
      return;
    this.router.afterEach((to) => {
      if (this.viewCacheCenter.size === 0)
        return;
      if (to && to.path && to.path.indexOf("/".concat(runtime.RouteConst.ROUTE_MODAL_TAG)) !== -1) {
        return;
      }
      const cacheViews = [...this.viewCacheCenter.values()];
      const validModalViews = cacheViews.filter((view) => {
        return view && view.state.isDestroyed === false && view.modal && view.modal.viewUsage === 2;
      });
      if (validModalViews.length === 0)
        return;
      setTimeout(() => {
        validModalViews.forEach(
          (view) => view && view.closeView && view.closeView()
        );
      }, 0);
    });
  }
  /**
   * @description 路由是否初始化构建完成
   * @returns {*}  {Promise<void>}
   * @memberof AppUtil
   */
  async onRouteIsReady() {
    return this.router.isReady();
  }
  /**
   * 登录
   *
   * @author tony001
   * @date 2024-05-14 16:05:41
   * @param {string} loginName
   * @param {string} password
   * @param {(boolean | undefined)} [remember]
   * @param {(IData | undefined)} [headers]
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async login(loginName, password, remember, headers, opts) {
    const appFuncBlockProvider = await runtime.getAppFuncBlockProvider();
    const bol = await appFuncBlockProvider.login({
      loginname: loginName,
      password,
      rememberme: remember,
      headers
    });
    return bol;
  }
  /**
   * 登出
   *
   * @author tony001
   * @date 2024-05-14 16:05:02
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async logout(opts) {
    const appFuncBlockProvider = await runtime.getAppFuncBlockProvider();
    const bol = await appFuncBlockProvider.logout({
      router: this.router
    });
    return bol;
  }
  /**
   * 变更密码
   *
   * @author tony001
   * @date 2024-05-14 16:05:11
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async changePwd(oldPwd, newPwd, opts) {
    if (this.validatePwd(oldPwd, newPwd, opts)) {
      const result = await ibiz.auth.changePwd(oldPwd, newPwd);
      return result;
    }
    return { ok: false, result: {} };
  }
  /**
   * 切换组织
   *
   * @author tony001
   * @date 2024-05-14 16:05:20
   * @param {string} oldOrgId
   * @param {string} newOrgId
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchOrg(oldOrgId, newOrgId, opts) {
    throw new Error("Method not implemented.");
  }
  /**
   * 切换主题
   *
   * @author tony001
   * @date 2024-05-14 16:05:30
   * @param {string} oldTheme
   * @param {string} newTheme
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchTheme(oldTheme, newTheme, opts) {
    throw new Error("Method not implemented.");
  }
  /**
   * 切换语言
   *
   * @author tony001
   * @date 2024-05-14 16:05:42
   * @param {string} oldLanguage
   * @param {string} newLanguage
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchLanguage(oldLanguage, newLanguage, opts) {
    throw new Error("Method not implemented.");
  }
  /**
   * 获取应用上下文
   *
   * @return {*}  {(IParams | undefined)}
   * @memberof AppUtil
   */
  getAppContext() {
    const routePath = vue3Util.route2routePath(this.router.currentRoute.value);
    return routePath.appContext;
  }
  /**
   * 校验密码
   *
   * @author tony001
   * @date 2024-05-14 17:05:31
   * @protected
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {IData} [opts={}]
   * @return {*}  {boolean}
   */
  validatePwd(oldPwd, newPwd, opts = {}) {
    const { surePwd } = opts;
    if (!oldPwd) {
      ibiz.message.error("\u539F\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
      return false;
    }
    if (!newPwd) {
      ibiz.message.error("\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
      return false;
    }
    if (!surePwd) {
      ibiz.message.error("\u786E\u8BA4\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
      return false;
    }
    if (oldPwd === newPwd) {
      ibiz.message.error("\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E0E\u65E7\u5BC6\u7801\u4E00\u81F4");
      return false;
    }
    if (newPwd !== surePwd) {
      ibiz.message.error("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
      return false;
    }
    return true;
  }
  /**
   * 打开AI聊天
   *
   * @param {IAiChatParam} chartParams
   * @return {*}  {Promise<IChatMessage[]>}
   * @memberof AppUtil
   */
  async openAiChat(chartParams) {
    const {
      data,
      view,
      ctrl,
      params,
      context,
      appDEACModeId,
      appDataEntityId
    } = chartParams;
    const deACMode = await runtime.getDeACMode(
      appDEACModeId,
      appDataEntityId,
      context.srfappid
    );
    if (!deACMode)
      return Promise.resolve([]);
    const chatInstance = await ibiz.aiChatUtil.getAIChat();
    const appDataEntityName = runtime.calcDeCodeNameById(appDataEntityId);
    let topicId = "".concat(appDataEntityId, "@").concat(appDEACModeId, "@");
    topicId += context[appDataEntityName] ? context[appDataEntityName] : "default";
    if (params.srfattachsessiontag) {
      topicId += "__".concat(params.srfattachsessiontag);
      delete params.srfattachsessiontag;
    }
    const sessionid = ibiz.aiChatUtil.getChatSessionId(
      "TOPIC",
      topicId,
      params.srfattachtimestamp !== "false"
    );
    const tempParams = { ...params, ...{ srfactag: deACMode.codeName } };
    const { zIndex } = vue3Util.useUIStore();
    const containerZIndex = zIndex.increment();
    const { containerOptions, topicOptions, chatOptions } = await ibiz.aiChatUtil.getUIActionExAIChatParams(
      context,
      params,
      data,
      deACMode,
      { chatInstance, view, ctrl }
    );
    const resourceOptions = await ibiz.aiChatUtil.getAIResourceOptions(
      context,
      params
    );
    let topicCaption = "[".concat(deACMode.logicName, "]").concat((data == null ? void 0 : data.srfmajortext) || "");
    if (params.srfaitopiccaption) {
      topicCaption = "[".concat(ibiz.appUtil.resolveI18nText(params.srfaitopiccaption), "]").concat((data == null ? void 0 : data.srfmajortext) || "");
    }
    let chatCaption = deACMode.logicName;
    if (params.srfaichatcaption) {
      chatCaption = ibiz.appUtil.resolveI18nText(params.srfaichatcaption);
    }
    return new Promise((resolve) => {
      chatInstance.create({
        mode: "TOPIC",
        resourceOptions,
        containerOptions: {
          zIndex: containerZIndex,
          enableBackFill: false,
          ...containerOptions
        },
        topicOptions: {
          appid: ibiz.env.appId,
          id: topicId,
          caption: topicCaption,
          url: window.location.hash.substring(1),
          type: context.srftopicpath || "default",
          ...topicOptions
        },
        chatOptions: {
          caption: chatCaption,
          context: { ...context },
          params: tempParams,
          appDataEntityId,
          sessionid,
          // 扩展参数
          ...chatOptions,
          // 关闭回调
          closed: (context2, params2, messages) => {
            resolve(messages);
          }
        }
      });
    });
  }
  /**
   * @description 当前路由转换成路由路径对象
   * @param {boolean} [isRouteModal]
   * @returns {*}  {{
   *     appContext?: IParams;
   *     pathNodes: {
   *       viewName: string;
   *       context?: IParams;
   *       params?: IParams;
   *       srfnav?: string;
   *     }[];
   *   }}
   * @memberof AppUtil
   */
  route2routeObject(isRouteModal = false) {
    const routePath = vue3Util.route2routePath(
      this.router.currentRoute.value,
      isRouteModal
    );
    return routePath;
  }
  /**
   * @description 路由路径对象转化为路由路径
   * @param {{
   *     appContext?: IParams;
   *     pathNodes: {
   *       viewName: string;
   *       context?: IParams;
   *       params?: IParams;
   *       srfnav?: string;
   *     }[];
   *   }} routePath
   * @returns {*}  {string}
   * @memberof AppUtil
   */
  routeObject2String(routePath) {
    return vue3Util.routePath2string(routePath);
  }
  /**
   * 解析国际化文本
   * @param text 输入文本
   * @returns 解析后的文本
   */
  resolveI18nText(text) {
    if (text.indexOf("ibiz.i18n.t") !== -1) {
      return runtime.ScriptFactory.execScriptFn({}, text, {
        isAsync: false,
        singleRowReturn: true
      });
    }
    return text;
  }
}

exports.AppUtil = AppUtil;
