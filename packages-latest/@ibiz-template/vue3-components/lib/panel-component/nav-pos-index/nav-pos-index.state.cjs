'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavPosIndexState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @exposedoc
     * @description 当前导航视图标识
     * @type {string}
     * @memberof NavPosIndexState
     */
    __publicField(this, "currentKey", "");
    /**
     * @exposedoc
     * @description 缓存的视图标识
     * @type {string[]}
     * @memberof NavPosIndexState
     */
    __publicField(this, "cacheKeys", ["RouterShell"]);
    /**
     * @exposedoc
     * @description 导航视图详细信息
     * @type {{ [p: string]: INavViewMsg }}
     * @memberof NavPosIndexState
     */
    __publicField(this, "navViewMsgs", {});
    /**
     * @exposedoc
     * @description 导航的视图的操作记录
     * @type {string[]}
     * @memberof NavPosIndexState
     */
    __publicField(this, "operateSort", []);
  }
}

exports.NavPosIndexState = NavPosIndexState;
