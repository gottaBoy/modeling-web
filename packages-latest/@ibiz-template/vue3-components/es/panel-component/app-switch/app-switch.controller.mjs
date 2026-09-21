import { notNilEmpty } from 'qx-util';
import { PanelItemController, UtilService } from '@ibiz-template/runtime';
import { route2routePath, routePath2string } from '@ibiz-template/vue3-util';
import { AppSwitchState } from './app-switch.state.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AppSwitchController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 自定义补充参数
     * @protected
     * @type {IData}
     * @memberof AppSwitchController
     */
    __publicField(this, "rawItemParams", {});
    /**
     * @description 应用功能组件服务
     * @protected
     * @type {(UtilService | undefined)}
     * @memberof AppSwitchController
     */
    __publicField(this, "util");
    /**
     * @description 数据来源
     * @type {('UTIL' | 'REFAPP')} 功能组件服务 | 引用子应用集
     * @memberof AppSwitchController
     */
    __publicField(this, "sourceType", "REFAPP");
  }
  /**
   * @description 获取当前视图
   * @readonly
   * @type {IViewController}
   * @memberof AppSwitchController
   */
  get view() {
    return this.panel.view;
  }
  /**
   * @description 上下文对象
   * @readonly
   * @type {IContext}
   * @memberof AppSwitchController
   */
  get context() {
    return this.panel.context;
  }
  /**
   * @description 创建状态对象
   * @protected
   * @returns {*}  {AppSwitchState}
   * @memberof AppSwitchController
   */
  createState() {
    var _a;
    return new AppSwitchState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description  初始化
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof AppSwitchController
   */
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.state.visible = this.view.model.appSwitchMode === 1;
    if (!this.state.visible)
      return;
    this.state.items = await this.loadAllApps();
    this.initActiveMicroAppId();
  }
  /**
   * @description 处理自定义补充参数
   * @protected
   * @memberof AppSwitchController
   */
  handleRawItemParams() {
    var _a;
    let params = {};
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (notNilEmpty(rawItemParams)) {
      params = rawItemParams.reduce((param, item) => {
        param[item.key.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
    this.sourceType = this.rawItemParams.sourcetype || "REFAPP";
  }
  /**
   * @description 加载所有应用
   * @exposedoc
   * @public
   * @returns {*}  {Promise<IApiMicroApp[]>}
   * @memberof AppSwitchController
   */
  async loadAllApps() {
    if (this.sourceType === "UTIL") {
      return this.loadAppsWithUtil();
    }
    return this.loadAppsWithRefApp();
  }
  /**
   * @description 初始化当前激活的应用标识
   * @protected
   * @memberof AppSwitchController
   */
  initActiveMicroAppId() {
    if (this.view && this.state.items.length > 0) {
      const activeMicroApp = this.state.items.find(
        (item) => {
          var _a;
          return item.indexViewName === ((_a = this.view.model.codeName) == null ? void 0 : _a.toLowerCase());
        }
      );
      if (activeMicroApp) {
        this.setActiveMicroAppId(activeMicroApp.id);
      }
    }
  }
  /**
   * @description 设置当前激活的应用标识
   * @exposedoc
   * @param {string} key
   * @memberof AppSwitchController
   */
  setActiveMicroAppId(key) {
    ibiz.hub.activeMicroAppId = key;
    this.state.activeMicroAppId = key;
  }
  /**
   * @description 加载应用(功能组件方式)
   * @protected
   * @returns {*}  {Promise<IApiMicroApp[]>}
   * @memberof AppSwitchController
   */
  async loadAppsWithUtil() {
    const result = [];
    if (!this.util) {
      const app = ibiz.hub.getApp(ibiz.env.appId);
      const hubAppUtil = app.getAppUtil("HUBAPP", "CUSTOM");
      if (!hubAppUtil) {
        return result;
      }
      this.util = new UtilService(hubAppUtil);
    }
    const data = await this.util.load("", this.context, this.panel.params);
    if (!data || data.length === 0) {
      return result;
    }
    const defaultAppModel = ibiz.hub.getAppSourceModel(ibiz.env.appId);
    const allPSSubAppRefs = defaultAppModel.getAllPSSubAppRefs;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id !== ibiz.env.appId && !/^[0-9a-zA-Z]+__[0-9a-zA-Z]+__[0-9a-zA-Z]+$/.test(data[i].id)) {
        const targetSubAppRef = allPSSubAppRefs.find((subAppRef) => {
          return subAppRef.id.endsWith(data[i].id);
        });
        if (targetSubAppRef) {
          data[i].id = targetSubAppRef.id;
        }
      }
      result.push({
        // 应用标识@首页视图标识
        id: "".concat(data[i].id, "@").concat(data[i].indexViewName.toLowerCase()),
        dataId: data[i].dataId,
        caption: data[i].caption,
        indexViewName: data[i].indexViewName.toLowerCase(),
        order: data[i].order
      });
    }
    return result.sort((a, b) => a.order - b.order);
  }
  /**
   * @description 加载应用(引用应用集方式)
   * @protected
   * @returns {*}  {Promise<IApiMicroApp[]>}
   * @memberof AppSwitchController
   */
  async loadAppsWithRefApp() {
    var _a, _b, _c, _d;
    const result = [];
    const defaultApp = ibiz.hub.getApp();
    if (!defaultApp) {
      return result;
    }
    const defaultAppModel = ibiz.hub.getAppSourceModel(defaultApp.appId);
    if (!defaultAppModel || !defaultAppModel.cache) {
      return result;
    }
    const allAppIndexViews = (_b = (_a = defaultAppModel.cache) == null ? void 0 : _a.getPSAppViews) == null ? void 0 : _b.filter(
      (appView) => {
        return appView.viewType === "APPINDEXVIEW" && appView.appSwitchMode === 1;
      }
    );
    if (allAppIndexViews && allAppIndexViews.length > 0) {
      for (let i = 0; i < allAppIndexViews.length; i++) {
        const appIndexView = allAppIndexViews[i];
        result.push({
          // 应用标识@首页视图标识
          id: "".concat(appIndexView.appId, "@").concat(appIndexView.codeName.toLowerCase()),
          caption: appIndexView.title || appIndexView.caption,
          indexViewName: appIndexView.codeName.toLowerCase(),
          order: 100 * (i + 1)
        });
      }
    }
    const allSubAppRefs = defaultAppModel.getAllPSSubAppRefs;
    if (!allSubAppRefs || allSubAppRefs.length === 0) {
      return result;
    }
    for (let i = 0; i < allSubAppRefs.length; i++) {
      const subAppRef = allSubAppRefs[i];
      if (subAppRef.appMode && subAppRef.appMode === "CLOUDHUBSUBAPP") {
        const subApp = await ibiz.hub.getAppAsync(subAppRef.id);
        const subAppModel = ibiz.hub.getAppSourceModel(subApp.appId);
        const allSubAppIndexViews = (_d = (_c = subAppModel.cache) == null ? void 0 : _c.getPSAppViews) == null ? void 0 : _d.filter(
          (appView) => {
            return appView.viewType === "APPINDEXVIEW" && appView.appSwitchMode === 1;
          }
        );
        if (allSubAppIndexViews && allSubAppIndexViews.length > 0) {
          for (let j = 0; j < allSubAppIndexViews.length; j++) {
            const subAppIndexView = allSubAppIndexViews[j];
            result.push({
              // 应用标识@首页视图标识
              id: "".concat(subAppIndexView.appId, "@").concat(subAppIndexView.codeName.toLowerCase()),
              caption: subAppIndexView.title || subAppIndexView.caption,
              indexViewName: subAppIndexView.codeName.toLowerCase(),
              order: 100 * (result.length + 1)
            });
          }
        }
      }
    }
    return result.sort((a, b) => a.order - b.order);
  }
  /**
   * @description 切换应用
   * @exposedoc
   * @param {string} key
   * @param {Router} router
   * @returns {*}  {Promise<void>}
   * @memberof AppSwitchController
   */
  async switchMicroApp(key, router) {
    if (key === this.state.activeMicroAppId) {
      return;
    }
    let tempKey = key;
    if (key.indexOf("@") !== -1) {
      tempKey = key.split("@")[0];
    }
    if (tempKey !== ibiz.env.appId) {
      await ibiz.hub.getAppAsync(tempKey);
    }
    const targetAppModel = ibiz.hub.getAppSourceModel(tempKey);
    const defaultApp = ibiz.hub.getApp();
    if (defaultApp.model.appId === tempKey && window.Environment.AppTitle) {
      ibiz.env.AppTitle = window.Environment.AppTitle;
    } else if (targetAppModel.getDefaultPSAppIndexView) {
      const view = targetAppModel.getDefaultPSAppIndexView;
      if (targetAppModel.caption) {
        ibiz.env.AppTitle = targetAppModel.caption;
      } else {
        const views = targetAppModel.cache.getPSAppViews;
        const indexView = views.find(
          (viewItem) => viewItem.dynaModelFilePath === view.path
        );
        if (indexView) {
          ibiz.env.AppTitle = indexView.caption;
        }
      }
    }
    this.setActiveMicroAppId(key);
    const currentIndex = this.state.items.findIndex((item) => item.id === key);
    const routePath = route2routePath(router.currentRoute.value);
    routePath.pathNodes = routePath.pathNodes.slice(0, 1);
    routePath.pathNodes[0].viewName = this.state.items[currentIndex].indexViewName;
    const url = routePath2string(routePath);
    router.push(url);
  }
}

export { AppSwitchController };
