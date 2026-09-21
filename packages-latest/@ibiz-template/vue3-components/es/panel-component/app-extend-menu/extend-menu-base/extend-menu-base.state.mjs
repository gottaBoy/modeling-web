import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ExtendMenuBase extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 所有菜单项
     * @type {IAppMenuItem[]}
     * @memberof ExtendMenuBase
     */
    __publicField(this, "items", []);
    /**
     * @description 菜单项状态
     * @type {{ [p: string]: { visible: boolean; permitted: boolean } }}
     * @memberof ExtendMenuBase
     */
    __publicField(this, "menuItemsState", {});
  }
}

export { ExtendMenuBase };
