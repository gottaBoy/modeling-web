import { PanelContainerState } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelContainerGroupState extends PanelContainerState {
  constructor() {
    super(...arguments);
    /**
     * 界面行为组状态
     *
     * @type {(IButtonContainerState | null)}
     * @memberof PanelContainerGroupState
     */
    __publicField(this, "actionGroupState", null);
  }
}

export { PanelContainerGroupState };
