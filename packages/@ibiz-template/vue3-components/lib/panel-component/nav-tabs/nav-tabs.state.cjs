'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavTabsState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 当前路由key
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-20 16:23:42
     */
    __publicField(this, "currentKey", "");
    /**
     * 分页标签项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-20 16:23:26
     */
    __publicField(this, "tabItems", []);
    /**
     * 当前激活tab
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-20 16:23:17
     */
    __publicField(this, "activeTab", "");
  }
}

exports.NavTabsState = NavTabsState;
