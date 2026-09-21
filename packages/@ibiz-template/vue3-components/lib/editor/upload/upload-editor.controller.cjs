'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UploadEditorController extends runtime.EditorController {
  constructor() {
    super(...arguments);
    /**
     * 是否支持拖拽
     */
    __publicField(this, "isDrag", false);
    /**
     * 是否多选
     */
    __publicField(this, "multiple", true);
    /**
     * 接受上传的文件类型
     */
    __publicField(this, "accept", "");
    /**
     * 上传的文件大小
     *
     * @type {number}
     * @memberof UploadEditorController
     */
    __publicField(this, "size", 0);
    /**
     * 上传参数
     */
    __publicField(this, "uploadParams");
    /**
     * 下载参数
     */
    __publicField(this, "exportParams");
    /**
     * 自适应预览
     * 只读状态下且配置了编辑器参数autoPreview ，加载完图片后自动调整大小达到预览态，且禁用图片hover工具栏
     *
     * @type {boolean}
     * @memberof UploadEditorController
     */
    __publicField(this, "autoPreview", false);
  }
  async onInit() {
    var _a;
    await super.onInit();
    if ((_a = this.model.editorType) == null ? void 0 : _a.includes("PICTURE")) {
      this.accept = "image/*";
    }
    if (["FILEUPLOADER_ONE", "PICTURE_ONE", "PICTURE_ONE_RAW"].includes(
      this.model.editorType
    )) {
      this.multiple = false;
    }
    if (this.editorParams) {
      const {
        isDrag,
        multiple,
        accept,
        size,
        uploadParams,
        exportParams,
        autoPreview
      } = this.editorParams;
      if (isDrag) {
        this.isDrag = Boolean(isDrag);
      }
      if (autoPreview) {
        this.autoPreview = autoPreview;
      }
      if (multiple) {
        this.multiple = Boolean(multiple);
      }
      if (accept) {
        this.accept = accept;
      }
      if (size) {
        this.size = Number(size);
      }
      if (uploadParams) {
        try {
          this.uploadParams = JSON.parse(uploadParams);
        } catch (error) {
          throw new core.RuntimeModelError(
            uploadParams,
            ibiz.i18n.t("editor.upload.uploadJsonFormatErr")
          );
        }
      }
      if (exportParams) {
        try {
          this.exportParams = JSON.parse(exportParams);
        } catch (error) {
          throw new core.RuntimeModelError(
            exportParams,
            ibiz.i18n.t("editor.upload.exportJsonFormatErr")
          );
        }
      }
    }
  }
}

exports.UploadEditorController = UploadEditorController;
