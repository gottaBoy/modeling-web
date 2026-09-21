import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelButtonState extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @exposedoc
     * @description 是否加载中
     * @type {boolean}
     * @memberof PanelButtonState
     */
    __publicField(this, "loading", false);
    /**
     * @description 界面行为状态
     * @type {UIActionButtonState}
     * @memberof PanelButtonState
     */
    __publicField(this, "uiActionState");
  }
}

export { PanelButtonState };
