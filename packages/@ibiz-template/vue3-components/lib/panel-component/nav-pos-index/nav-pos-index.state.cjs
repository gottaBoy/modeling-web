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
     * 当前导航视图标识
     * @author lxm
     * @date 2023-05-25 06:24:48
     * @type {string}
     */
    __publicField(this, "currentKey", "");
    /**
     * 缓存的视图标识
     * @author lxm
     * @date 2023-05-25 06:25:21
     * @type {string[]}
     */
    __publicField(this, "cacheKeys", ["RouterShell"]);
    /**
     * 导航视图详细信息
     * @author lxm
     * @date 2023-05-25 07:07:05
     * @type {INavViewMsg[]}
     */
    __publicField(this, "navViewMsgs", {});
    /**
     * 导航的视图的操作顺序
     * @author lxm
     * @date 2023-05-25 06:25:34
     * @type {string[]}
     */
    __publicField(this, "operateSort", []);
  }
}

exports.NavPosIndexState = NavPosIndexState;
