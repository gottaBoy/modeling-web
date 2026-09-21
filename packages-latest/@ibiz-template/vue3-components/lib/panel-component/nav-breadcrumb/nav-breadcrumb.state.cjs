'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavBreadcrumbState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 面包屑数据
     * @exposedoc
     * @type {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbState
     */
    __publicField(this, "breadcrumbItems", []);
    /**
     * @description 菜单标识
     * @type {string}
     * @memberof NavBreadcrumbState
     */
    __publicField(this, "menuTag", "");
  }
}

exports.NavBreadcrumbState = NavBreadcrumbState;
