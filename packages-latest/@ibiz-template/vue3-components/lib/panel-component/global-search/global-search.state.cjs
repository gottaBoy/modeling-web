'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GlobalSearchState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 当前快速搜索值
     * @exposedoc
     * @type {string}
     * @memberof GlobalSearchState
     */
    __publicField(this, "query", "");
    /**
     * @description 自填模式全局搜索项
     * @type {ISearchItem[]}
     * @exposedoc
     * @memberof GlobalSearchState
     */
    __publicField(this, "items", []);
    /**
     * @description 搜索历史记录
     * @type {string[]}
     * @exposedoc
     * @memberof GlobalSearchState
     */
    __publicField(this, "histories", []);
    /**
     * @description 搜索列表
     * @exposedoc
     * @type {IData[]}
     * @memberof GlobalSearchState
     */
    __publicField(this, "list", []);
    /**
     * @description 是否在加载中
     * @exposedoc
     * @type {boolean}
     * @memberof GlobalSearchState
     */
    __publicField(this, "loading", false);
  }
}

exports.GlobalSearchState = GlobalSearchState;
