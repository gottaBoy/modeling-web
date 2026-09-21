import { RuntimeModelError } from '@ibiz-template/core';
import { EditorController, getDeACMode } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MarkDownEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * 上传参数
     */
    __publicField(this, "uploadParams");
    /**
     * 下载参数
     */
    __publicField(this, "exportParams");
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
  }
  async onInit() {
    await super.onInit();
    if (!this.style.height) {
      this.style.height = "600px";
    }
    if (this.editorParams) {
      const { uploadparams, exportparams } = this.editorParams;
      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          throw new RuntimeModelError(
            uploadparams,
            ibiz.i18n.t("editor.markdown.uploadJsonFormatErr")
          );
        }
      }
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          throw new RuntimeModelError(
            exportparams,
            ibiz.i18n.t("editor.markdown.exportJsonFormatErr")
          );
        }
      }
    }
    const model = this.model;
    if (model.appDEACModeId) {
      this.deACMode = await getDeACMode(
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
        if (this.deACMode.actype === "CHATCOMPLETION") {
          this.deService = await ibiz.hub.getApp(model.appId).deService.getService(this.context, model.appDataEntityId);
          this.chatCompletion = true;
        }
      }
    }
  }
}

export { MarkDownEditorController };
