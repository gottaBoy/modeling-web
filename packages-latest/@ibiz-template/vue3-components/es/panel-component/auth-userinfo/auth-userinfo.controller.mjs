import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AuthUserinfoController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 自定义补充参数
     * @exposedoc
     * @type {IData}
     * @memberof AuthUserinfoController
     */
    __publicField(this, "rawItemParams", {});
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof AuthUserinfoController
   */
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
  }
  /**
   * @description 处理自定义补充参数 [{key:'name',value:'data'}] => {name:'data'}
   * @protected
   * @memberof AuthUserinfoController
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

export { AuthUserinfoController };
