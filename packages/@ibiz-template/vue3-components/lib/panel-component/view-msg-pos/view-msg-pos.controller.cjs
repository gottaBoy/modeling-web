'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ViewMsgPosController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * 直接内容项参数
     *
     * @author zhanghengfeng
     * @date 2024-04-08 19:04:15
     * @type {IData}
     */
    __publicField(this, "rawItemParams", {});
  }
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
  }
  /**
   * 处理直接内容项参数
   *
   * @author zhanghengfeng
   * @date 2024-04-08 19:04:59
   * @protected
   */
  handleRawItemParams() {
    var _a;
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (Array.isArray(rawItemParams)) {
      rawItemParams.forEach((item) => {
        const key = item.key;
        const value = item.value;
        if (key && value) {
          this.rawItemParams[key.toLowerCase()] = value;
        }
      });
    }
  }
}

exports.ViewMsgPosController = ViewMsgPosController;
