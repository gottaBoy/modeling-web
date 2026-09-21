'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavTabsState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 当前路由key
     * @exposedoc
     */
    __publicField(this, "currentKey", "");
    /**
     * @description 分页标签项
     * @exposedoc
     */
    __publicField(this, "tabItems", []);
    /**
     * @description 当前激活tab
     * @exposedoc
     */
    __publicField(this, "activeTab", "");
  }
}

exports.NavTabsState = NavTabsState;
