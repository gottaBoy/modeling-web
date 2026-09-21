import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelAppTitleState extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 应用标题
     * @exposedoc
     * @type {string}
     * @memberof PanelAppTitleState
     */
    __publicField(this, "caption", "");
    /**
     * @description 应用标题(收缩时)
     *
     * @type {string}
     * @memberof PanelAppTitleState
     */
    __publicField(this, "caption2", "");
    /**
     * @description 应用子标题
     * @exposedoc
     * @type {string}
     * @memberof PanelAppTitleState
     */
    __publicField(this, "subCaption", "");
    /**
     * @description 应用子标题(收缩时)
     * @exposedoc
     * @type {string}
     * @memberof PanelAppTitleState
     */
    __publicField(this, "subCaption2", "");
    /**
     * @description 应用 logo 图片地址
     * @exposedoc
     * @type {string}
     * @memberof PanelAppTitleState
     */
    __publicField(this, "icon", "");
    /**
     * @description 应用 logo 图片2地址(收缩时)
     * @exposedoc
     * @type {string}
     */
    __publicField(this, "icon2", "");
    /**
     * @description 是否为 svg 图标
     * @type {boolean}
     */
    __publicField(this, "isSvg", false);
  }
}

export { PanelAppTitleState };
