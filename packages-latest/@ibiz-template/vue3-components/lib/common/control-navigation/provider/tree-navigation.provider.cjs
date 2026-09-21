'use strict';

var navigationBase_provider = require('./navigation-base.provider.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TreeNavigationProvider extends navigationBase_provider.NavgationBaseProvider {
  /**
   * Creates an instance of TreeNavigationProvider.
   * @param {MDControlController} controller
   * @memberof TreeNavigationProvider
   */
  constructor(controller) {
    super(controller);
    __publicField(this, "keyName", "_id");
    /**
     * 有导航视图的节点标识
     *
     * @type {string[]}
     * @memberof TreeNavigationProvider
     */
    __publicField(this, "navNodeModelIds", []);
    const { detreeNodes } = this.model;
    detreeNodes == null ? void 0 : detreeNodes.forEach((node) => {
      if (node.navAppViewId) {
        this.navNodeModelIds.push(node.id);
      }
    });
  }
  onNavDataByStack() {
    const { items, rootNodes } = this.controller.state;
    const defaultNav = items.find((node) => {
      if (!this.model.rootVisible && rootNodes.includes(node)) {
        return false;
      }
      return this.navNodeModelIds.includes(node._nodeId);
    });
    const navData = this.navStack.map((key) => items.find((item) => item[this.keyName] === key)).find((item) => item !== void 0) || defaultNav;
    if (navData) {
      this.setNavData(navData);
    } else {
      this.clearNavigation();
    }
  }
  getNavViewMsg(item) {
    const { detreeNodes } = this.model;
    const nodeModel = detreeNodes == null ? void 0 : detreeNodes.find((node) => node.id === item._nodeId);
    const _context = Object.assign(
      this.controller.context.clone(),
      item._context || {}
    );
    const _params = { ...this.controller.params, ...item._params || {} };
    if (nodeModel) {
      const { context, params } = this.prepareParams(
        nodeModel,
        item._deData ? item._deData : item,
        _context,
        _params
      );
      return {
        key: item[this.keyName],
        context,
        params,
        viewId: nodeModel.navAppViewId
      };
    }
    return {
      key: item[this.keyName],
      context: _context,
      params: _params
    };
  }
}

exports.TreeNavigationProvider = TreeNavigationProvider;
