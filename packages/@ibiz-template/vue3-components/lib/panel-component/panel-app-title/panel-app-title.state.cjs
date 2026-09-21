'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelAppTitleState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 应用标题
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    __publicField(this, "caption", "");
    /**
     * 应用标题(收缩时)
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    __publicField(this, "caption2", "");
    /**
     * 应用子标题
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    __publicField(this, "subCaption", "");
    /**
     * 应用子标题(收缩时)
     *
     * @author chitanda
     * @date 2023-07-20 17:07:22
     * @type {string}
     */
    __publicField(this, "subCaption2", "");
    /**
     * 应用 logo 图片地址
     *
     * @author chitanda
     * @date 2023-07-20 17:07:11
     * @type {string}
     */
    __publicField(this, "icon", "");
    /**
     * 应用 logo 图片2地址(收缩时)
     *
     * @author chitanda
     * @date 2023-07-20 17:07:11
     * @type {string}
     */
    __publicField(this, "icon2", "");
    /**
     * 是否为 svg 图标
     *
     * @author chitanda
     * @date 2023-07-20 17:07:26
     * @type {boolean}
     */
    __publicField(this, "isSvg", false);
  }
}

exports.PanelAppTitleState = PanelAppTitleState;
