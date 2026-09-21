import { ViewEngineBase, OpenAppViewCommand, ViewCallTag } from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class IndexViewEngine extends ViewEngineBase {
  constructor() {
    super(...arguments);
    /**
     * @description 路由对象
     * @type {RouteLocationNormalizedLoaded}
     * @memberof IndexViewEngine
     */
    __publicField(this, "route", useRoute());
  }
  get appmenu() {
    return this.view.getController("appmenu");
  }
  /**
   * 启用折叠
   * @author lxm
   * @date 2023-10-18 12:09:36
   * @readonly
   * @type {boolean}
   */
  get enableCollapse() {
    return this.view.model.mainMenuAlign === "LEFT" || this.view.model.mainMenuAlign === void 0;
  }
  initViewState() {
    super.initViewState();
    this.view.state.isCollapse = false;
  }
  async onCreated() {
    await super.onCreated();
    this.view.childNames.push("appmenu");
    if (!this.view.slotProps.appmenu) {
      this.view.slotProps.appmenu = {};
    }
    this.view.slotProps.appmenu.collapse = this.view.state.isCollapse;
    ibiz.util.hiddenAppLoading();
  }
  async onMounted() {
    await super.onMounted();
    if (!this.isExistAndInLayout("appmenu") && !this.route.params.view2) {
      const { model, context, params } = this.view;
      const { defAppViewId } = model;
      if (defAppViewId) {
        ibiz.commands.execute(
          OpenAppViewCommand.TAG,
          defAppViewId,
          context,
          params
        );
      }
    }
    if (window.innerWidth <= 1200) {
      this.toggleCollapse();
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  async call(key, _args) {
    if (key === ViewCallTag.TOGGLE_COLLAPSE) {
      this.toggleCollapse();
      return null;
    }
  }
  /**
   * 切换首页视图的折叠
   * @author lxm
   * @date 2023-10-17 05:31:37
   * @protected
   */
  toggleCollapse() {
    var _a;
    if (!this.enableCollapse) {
      ibiz.log.error("\u975E\u5DE6\u4FA7\u83DC\u5355\u6A21\u5F0F\u6298\u53E0\u529F\u80FD\u4E0D\u542F\u7528");
      return;
    }
    this.view.state.isCollapse = !this.view.state.isCollapse;
    this.view.slotProps.appmenu.collapse = this.view.state.isCollapse;
    const leftContainer = (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.container_scroll_left;
    if (leftContainer) {
      if (this.view.state.isCollapse) {
        leftContainer.state.layout.width = "56px";
      } else {
        leftContainer.state.layout.width = "".concat(leftContainer.model.width, "px");
      }
    }
  }
  calcViewHeaderVisible() {
    return true;
  }
}

export { IndexViewEngine };
