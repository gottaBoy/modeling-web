'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SplitContainerState extends runtime.PanelContainerState {
  constructor() {
    super(...arguments);
    /**
     * @description 分割值
     * @exposedoc
     * @type {(number | string)}
     */
    __publicField(this, "splitValue", 0.5);
    /**
     * @description 是否隐藏拖拽触发器，即不允许拖拽
     * @exposedoc
     * @type {boolean}
     */
    __publicField(this, "isHiddenTrigger", false);
  }
}

exports.SplitContainerState = SplitContainerState;
