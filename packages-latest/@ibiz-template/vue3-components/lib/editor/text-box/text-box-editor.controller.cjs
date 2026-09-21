'use strict';

var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class TextBoxEditorController extends runtime.CodeListEditorController {
  constructor() {
    super(...arguments);
    /**
     * 精度
     * @author lxm
     * @date 2023-09-26 10:22:47
     * @type {number}
     */
    __publicField(this, "precision");
    /**
     * 应用实体服务
     *
     * @author chitanda
     * @date 2023-10-12 14:10:41
     * @type {IAppDEService}
     */
    __publicField(this, "deService");
    /**
     * 自填模式
     *
     * @author chitanda
     * @date 2023-10-12 10:10:52
     * @type {IAppDEACMode}
     */
    __publicField(this, "deACMode");
    /**
     * 自填模式对应主键属性名称
     *
     * @author chitanda
     * @date 2023-10-12 10:10:58
     * @type {string}
     */
    __publicField(this, "keyName", "srfkey");
    /**
     * 自填模式对应主文本属性名称
     *
     * @author chitanda
     * @date 2023-10-12 10:10:02
     * @type {string}
     */
    __publicField(this, "textName", "srfmajortext");
    /**
     * 自填模式排序模式，默认升序
     *
     * @author chitanda
     * @date 2023-10-12 10:10:29
     * @type {string}
     */
    __publicField(this, "sort", "asc");
    /**
     * 自填数据项集合（已排除了value和text)
     *
     * @author chitanda
     * @date 2023-10-12 10:10:23
     * @type {IDEACModeDataItem[]}
     */
    __publicField(this, "dataItems", []);
    /**
     * AI 聊天自填模式
     *
     * @author chitanda
     * @date 2023-10-12 10:10:37
     * @type {boolean}
     */
    __publicField(this, "chatCompletion", false);
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-24 10:55:50
     */
    __publicField(this, "codeList");
    /**
     * 无值隐藏单位
     *
     * @type {boolean}
     * @memberof TextBoxEditorController
     */
    __publicField(this, "emptyHiddenUnit", true);
  }
  async onInit() {
    await super.onInit();
    this.precision = this.editorParams.precision ? lodashEs.toNumber(this.editorParams.precision) : this.model.precision;
    if (this.model.editorType === "TEXTAREA" || this.model.editorType === "TEXTAREA_10" || this.model.editorType === "MOBTEXTAREA") {
      const model = this.model;
      if (model.appDEACModeId) {
        this.deACMode = await runtime.getDeACMode(
          model.appDEACModeId,
          model.appDataEntityId,
          this.context.srfappid
        );
        if (this.deACMode) {
          if (this.deACMode.actype === "AUTOCOMPLETE") {
            const { minorSortAppDEFieldId, minorSortDir } = this.deACMode;
            if (minorSortAppDEFieldId && minorSortDir) {
              this.sort = "".concat(minorSortAppDEFieldId.toLowerCase(), ",").concat(minorSortDir.toLowerCase());
            }
            if (this.deACMode.textAppDEFieldId) {
              this.textName = this.deACMode.textAppDEFieldId;
            }
            if (this.deACMode.valueAppDEFieldId) {
              this.keyName = this.deACMode.valueAppDEFieldId;
            }
            if (this.deACMode.deacmodeDataItems) {
              this.dataItems = [];
              this.deACMode.deacmodeDataItems.forEach(
                (dataItem) => {
                  if (dataItem.id !== "value" && dataItem.id !== "text") {
                    this.dataItems.push(dataItem);
                  }
                }
              );
            }
          }
          if (this.deACMode.actype === "CHATCOMPLETION" && ibiz.env.enableAI) {
            this.deService = await ibiz.hub.getApp(model.appId).deService.getService(this.context, model.appDataEntityId);
            this.chatCompletion = true;
          }
        }
      }
    }
    if (this.model.predefinedType === "AUTH_USERID" && !this.placeHolder) {
      this.placeHolder = ibiz.i18n.t("app.pleaseEnterAccount");
    } else if (this.model.predefinedType === "AUTH_PASSWORD" && !this.placeHolder) {
      this.placeHolder = ibiz.i18n.t("app.pleaseEnterPassword");
    }
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      this.codeList = app.codeList.getCodeList(this.model.appCodeListId);
    }
    if (this.extraParams) {
      this.emptyHiddenUnit = this.extraParams.emptyHiddenUnit;
    }
  }
}

exports.TextBoxEditorController = TextBoxEditorController;
