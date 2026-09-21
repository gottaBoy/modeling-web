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
     * @description 面包屑导航项
     * @type {BreadcrumbMsg[]}
     * @memberof NavBreadcrumbState
     */
    __publicField(this, "breadcrumbItems", []);
  }
}

exports.NavBreadcrumbState = NavBreadcrumbState;
