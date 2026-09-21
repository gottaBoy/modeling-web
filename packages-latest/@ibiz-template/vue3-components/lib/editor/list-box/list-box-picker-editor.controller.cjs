'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ListBoxPickerEditorController extends runtime.EditorController {
  constructor() {
    super(...arguments);
    /**
     * 主键属性名称
     */
    __publicField(this, "keyName", "srfkey");
    /**
     * 主文本属性名称
     */
    __publicField(this, "textName", "srfmajortext");
    /**
     * 数据集codeName
     */
    __publicField(this, "interfaceName", "");
    /**
     * 实体自填模式模型
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:03
     * @type {IAppDEACMode}
     */
    __publicField(this, "deACMode");
    /**
     * 自填列表项适配器
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:25
     * @type {IAcItemProvider}
     */
    __publicField(this, "acItemProvider");
    /**
     * @description 自动选中第一个
     * @memberof ListBoxPickerEditorController
     */
    __publicField(this, "autoSelectFirstOption", false);
  }
  async onInit() {
    var _a;
    super.onInit();
    if ((_a = this.editorParams) == null ? void 0 : _a.autoselectfirstoption) {
      this.autoSelectFirstOption = this.toBoolean(
        this.editorParams.autoselectfirstoption
      );
    }
    if (this.model.editorType === "LISTBOXPICKUP") {
      if (this.model.appDEDataSetId) {
        this.interfaceName = this.model.appDEDataSetId;
      }
      if (this.model.appDataEntityId && this.model.appDEACModeId) {
        this.deACMode = await runtime.getDeACMode(
          this.model.appDEACModeId,
          this.model.appDataEntityId,
          this.context.srfappid
        );
        if (this.deACMode) {
          if (this.deACMode.itemSysPFPluginId) {
            this.acItemProvider = await runtime.getAcItemProvider(this.deACMode);
          }
        }
      }
    }
  }
  /**
   * 加载实体数据集数据
   *
   * @param {string} query 模糊匹配字符串
   * @param {IData} data 表单数据
   * @returns {*}  {Promise<IHttpResponse<IData[]>>}
   * @memberof PickerEditorController
   */
  async getServiceData(data) {
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params
    );
    const tempParams = ramda.mergeDeepLeft(params, { size: 1e3 });
    if (this.interfaceName) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      const res = await app.deService.exec(
        this.model.appDataEntityId,
        this.interfaceName,
        context,
        tempParams
      );
      return res;
    }
    throw new core.RuntimeModelError(
      this.model,
      ibiz.i18n.t("editor.common.entityConfigErr")
    );
  }
}

exports.ListBoxPickerEditorController = ListBoxPickerEditorController;
