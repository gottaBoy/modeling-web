'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelButtonState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 加载中
     * @author lxm
     * @date 2023-07-21 10:11:21
     * @type {boolean}
     */
    __publicField(this, "loading", false);
    /**
     * 界面行为状态
     * @author lxm
     * @date 2023-07-21 03:34:27
     * @type {UIActionButtonState}
     */
    __publicField(this, "uiActionState");
  }
}

exports.PanelButtonState = PanelButtonState;
