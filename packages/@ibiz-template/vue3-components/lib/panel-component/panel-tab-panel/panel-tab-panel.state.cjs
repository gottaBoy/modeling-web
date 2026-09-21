'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelTabPanelState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 当前激活分页
     *
     * @author tony001
     * @date 2024-05-12 14:05:36
     * @type {string}
     */
    __publicField(this, "activeTab", "");
  }
}

exports.PanelTabPanelState = PanelTabPanelState;
