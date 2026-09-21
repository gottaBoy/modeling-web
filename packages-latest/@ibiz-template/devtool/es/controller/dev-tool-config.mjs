"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DevToolConfig {
  /**
   * 构造函数
   */
  constructor() {
    /**
     * 根容器元素id
     * @author lxm
     * @date 2024-01-19 04:42:42
     * @type {string}
     */
    __publicField(this, "containerId", "devtool");
    /**
     * devtool配置存储的key
     * @author lxm
     * @date 2024-01-19 05:35:38
     * @type {string}
     */
    __publicField(this, "configStorageKey", "");
    /**
     * studio地址
     *
     * @author tony001
     * @date 2025-03-13 13:03:04
     * @type {string}
     */
    __publicField(this, "studioBaseUrl", "");
    /**
     * 触发code
     *
     * @author tony001
     * @date 2025-03-13 13:03:50
     * @type {string}
     */
    __publicField(this, "triggerButtonCode", "F12");
    /**
     * 模型预览宽度
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-20 13:28:20
     */
    __publicField(this, "modelPreviewWidth", 600);
    /**
     * 日志级别
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-20 13:28:20
     */
    __publicField(this, "logLevel", ibiz.env.logLevel);
    /**
     * v9模式
     *
     * @author tony001
     * @date 2025-02-07 13:02:31
     * @type {boolean}
     */
    __publicField(this, "v9Mode", false);
    /**
     * @description 默认打开模式
     * @type {('open' | 'close')}
     * @memberof DevToolConfig
     */
    __publicField(this, "defaultMode", "close");
    this.configStorageKey = "".concat(ibiz.env.appId, "-devtool-config");
  }
}

export { DevToolConfig };
