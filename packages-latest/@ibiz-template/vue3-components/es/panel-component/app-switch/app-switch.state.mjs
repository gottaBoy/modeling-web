import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AppSwitchState extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 激活微应用标识
     * @exposedoc
     * @type {string}
     * @memberof AppSwitchState
     */
    __publicField(this, "activeMicroAppId", "");
    /**
     * @description 微应用列表数据
     * @exposedoc
     * @type {IApiMicroApp[]}
     * @memberof AppSwitchState
     */
    __publicField(this, "items", []);
  }
}

export { AppSwitchState };
