'use strict';

var ElementPlus = require('element-plus');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LoadingUtil {
  constructor() {
    /**
     * 当前只在触发的全局加载次数
     *
     * @author chitanda
     * @date 2022-08-17 17:08:44
     * @protected
     */
    __publicField(this, "count", 0);
    /**
     * 当前在触发的重定向加载动画次数
     *
     * @author chitanda
     * @date 2022-10-08 17:10:02
     * @protected
     */
    __publicField(this, "countRedirect", 0);
    /**
     * element plus loading 实例
     *
     * @author chitanda
     * @date 2022-12-29 15:12:26
     * @protected
     */
    __publicField(this, "loading");
  }
  /**
   * 显示全局加载动画
   *
   * @author chitanda
   * @date 2022-12-29 15:12:26
   */
  show() {
    if (this.count === 0) {
      this.loading = ElementPlus.ElLoading.service({ lock: true, fullscreen: true });
    }
    this.count += 1;
  }
  /**
   * 隐藏全局加载动画
   *
   * @author chitanda
   * @date 2022-08-17 17:08:11
   */
  hide() {
    if (this.count > 0) {
      this.count -= 1;
    }
    if (this.count === 0) {
      if (this.loading) {
        this.loading.close();
      }
    }
  }
  /**
   * 显示顶部加载动画
   *
   * @author chitanda
   * @date 2022-10-08 16:10:01
   */
  showRedirect() {
  }
  /**
   * 隐藏顶部加载动画
   *
   * @author chitanda
   * @date 2022-10-08 16:10:09
   */
  hideRedirect() {
  }
}

exports.LoadingUtil = LoadingUtil;
