'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavgationBaseProvider {
  /**
   * Creates an instance of NavgationBaseProvider.
   * @param {MDControlController} controller
   * @memberof NavgationBaseProvider
   */
  constructor(controller) {
    this.controller = controller;
    /**
     * 导航栈数据
     *
     * @type {string[]}
     * @memberof NavgationBaseProvider
     */
    __publicField(this, "navStack", []);
    /**
     * 主键名称
     *
     * @memberof NavgationBaseProvider
     */
    __publicField(this, "keyName", "srfkey");
    /**
     * 模型
     *
     * @type {IMDControl}
     * @memberof NavgationBaseProvider
     */
    __publicField(this, "model");
    /**
     * 导航视图信息
     *
     * @type {(Ref<INavViewMsg | undefined>)}
     * @memberof NavgationBaseProvider
     */
    __publicField(this, "navViewMsg", vue.ref());
    this.model = controller.model;
    if (controller.state.enableNavView) {
      controller.evt.on("onNavDataChange", (evt) => {
        this.onNavDataChange(evt);
      });
      controller.evt.on("onLoadSuccess", () => {
        this.onNavDataByStack();
      });
    }
  }
  /**
   * 解析参数
   *
   * @param {(INavigatable & { appDataEntityId?: string })} XDataModel
   * @param {IData} data
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {{ context: IContext; params: IParams }}
   * @memberof NavgationBaseProvider
   */
  prepareParams(XDataModel, data, context, params) {
    const {
      navDER,
      navFilter,
      navigateContexts,
      navigateParams,
      appDataEntityId
    } = XDataModel;
    const model = {
      deName: appDataEntityId ? runtime.calcDeCodeNameById(appDataEntityId) : void 0,
      navFilter,
      pickupDEFName: navDER == null ? void 0 : navDER.pickupDEFName,
      navContexts: navigateContexts,
      navParams: navigateParams
    };
    const originParams = {
      context,
      params,
      data
    };
    const { resultContext, resultParams } = runtime.calcNavParams(model, originParams);
    const tempContext = Object.assign(context.clone(), resultContext);
    const tempParams = { ...resultParams };
    return { context: tempContext, params: tempParams };
  }
  /**
   * 通过栈数据导航
   *
   * @memberof NavgationBaseProvider
   */
  onNavDataByStack() {
    const { items } = this.controller.state;
    const navData = this.navStack.map((key) => items.find((item) => item[this.keyName] === key)).find((item) => item !== void 0) || items[0];
    setTimeout(() => {
      if (navData) {
        this.controller.setNavData(navData);
        this.controller.setSelection([navData]);
      } else {
        this.navStack = [];
        this.controller.setSelection([]);
        this.navViewMsg.value = void 0;
      }
    });
  }
  /**
   * 导航数据变化
   *
   * @param {IMDControlEvent['onNavDataChange']['event']} event
   * @memberof NavgationBaseProvider
   */
  onNavDataChange(event) {
    const { navData, context, params } = event;
    this.navStack.unshift(navData[this.keyName]);
    this.navViewMsg.value = this.getNavViewMsg(navData, context, params);
  }
  /**
   * 获取导航视图信息
   *
   * @param {IData} data
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {INavViewMsg}
   * @memberof NavgationBaseProvider
   */
  getNavViewMsg(data, context, params) {
    const viewModelId = this.model.navAppViewId;
    const result = this.prepareParams(this.model, data, context, params);
    return {
      key: data[this.keyName],
      context: result.context,
      params: result.params,
      viewId: viewModelId
    };
  }
}

exports.NavgationBaseProvider = NavgationBaseProvider;
