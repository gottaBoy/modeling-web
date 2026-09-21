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
     * 是否开启压缩文件类解压,若开启unzip后，识别unzipfileext中后缀的上传时额外附加unzip=true参数，与unzipfileext参数搭配使用
     */
    __publicField(this, "unzip", false);
    /**
     * 压缩文件类解压文件类型，当上传文件的后缀名包含该属性值时，若开启unzip，上传时会额外附加unzip=true参数，启用后端解压功能。格式为逗号分隔的文件后缀字符串，默认值：'.zip,.rar,.7z'，与unzip参数搭配使用
     */
    __publicField(this, "unzipfileext", ".zip,.rar,.7z");
    /**
     * 上传文件模式，DEFAULT表示文件上传、FOLDER表示文件夹上传、ALL表示文件和文件夹都支持上传，默认值为DEFAULT
     */
    __publicField(this, "uploadmode", "DEFAULT");
    /**
     * 是否显示文件列表,默认显示
     */
    __publicField(this, "showfilelist", true);
    /**
     * 隐藏文件忽略正则，文件夹上传时基于根目录相对路径匹配，匹配到的文件将被忽略不上传，默认空字符串，传空字符串则不过滤
     */
    __publicField(this, "hiddenFileRegex", "");
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
     * 上传文件信息的映射规则字符串，格式为"源键:目标键;源键2:目标键2"
     */
    __publicField(this, "infoMap", "");
    /**
     * 自适应预览
     * 只读状态下且配置了编辑器参数autoPreview ，加载完图片后自动调整大小达到预览态，且禁用图片hover工具栏
     *
     * @type {boolean}
     * @memberof UploadEditorController
     */
    __publicField(this, "autoPreview", false);
    /**
     * 是否启用无权限
     *
     * @type {boolean}
     * @memberof UploadEditorController
     */
    __publicField(this, "enableNoAccess", false);
    /**
     * 根据配置的映射关系转换对象属性
     * 将源对象的指定属性，按照映射规则映射到新对象的目标属性
     *
     * @param {IData} [_data={}] - 源数据对象，包含需要被映射的原始属性
     * @param {string} [infoMap=''] - 映射规则字符串，格式为"源键:目标键;源键2:目标键2"
     * @param {boolean} [isEmit=false] - 是否为抛值时处理，抛值时将源键替换为目标键
     * @returns {IData} 转换后的新对象，仅包含映射规则中定义的属性
     *
     * @example
     * // isEmit=false
     * // 源对象：{ filesize:'10000', fileext:'.gif', folder:'file' };
     * // 映射规则：'filesize:size;fileext:ext;folder:folder';
     * // 转换结果: { size:'10000', ext:'.gif', folder:'file' }
     *
     * // isEmit=true
     * // 源对象：{ filesize:'10000', fileext:'.gif', folder:'file' };
     * // 映射规则：'filesize:size;fileext:ext;folder:folder';
     * // 转换结果: { size:undefined, ext:undefined, folder:'file' }
     */
    __publicField(this, "transformInfoMap", (_data = {}, infoMap = "", isEmit = false) => {
      const result = {};
      const mappings = infoMap.split(";");
      mappings.forEach((mapping) => {
        let [sourceKey, targetKey] = mapping.split(":");
        if (isEmit)
          sourceKey = targetKey;
        if (sourceKey && targetKey) {
          Object.assign(result, { [targetKey]: _data[sourceKey] });
        }
      });
      return result;
    });
  }
  async onInit() {
    var _a;
    await super.onInit();
    this.infoMap = ibiz.config.uploadEditor.infoMap;
    if ((_a = this.model.editorType) == null ? void 0 : _a.includes("PICTURE")) {
      this.accept = "image/*";
    }
    if ([
      "FILEUPLOADER_ONE",
      "PICTURE_ONE",
      "PICTURE_ONE_RAW",
      "MOBSINGLEFILEUPLOAD",
      "MOBPICTURE_RAW"
    ].includes(this.model.editorType)) {
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
        autoPreview,
        isdrag,
        uploadparams,
        exportparams,
        autopreview,
        infomap,
        enablenoaccess,
        unzip,
        unzipfileext,
        uploadmode,
        showfilelist,
        hiddenfileregex
      } = this.editorParams;
      if (isDrag) {
        this.isDrag = Boolean(isDrag);
      }
      if (isdrag) {
        this.isDrag = Boolean(isdrag);
      }
      if (autoPreview) {
        this.autoPreview = autoPreview;
      }
      if (autopreview) {
        this.autoPreview = autopreview;
      }
      if (multiple) {
        this.multiple = multiple === "true";
      }
      if (accept) {
        this.accept = accept;
      }
      if (unzip) {
        this.unzip = unzip === "true";
      }
      if (unzipfileext) {
        this.unzipfileext = unzipfileext;
      }
      if (uploadmode) {
        this.uploadmode = uploadmode;
      }
      if (showfilelist) {
        this.showfilelist = showfilelist === "true";
      }
      if (hiddenfileregex) {
        this.hiddenFileRegex = hiddenfileregex;
      }
      if (size) {
        this.size = Number(size);
      }
      if (infomap) {
        this.infoMap = infomap;
      }
      if (enablenoaccess) {
        this.enableNoAccess = enablenoaccess === "true";
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
      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          throw new core.RuntimeModelError(
            uploadparams,
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
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          throw new core.RuntimeModelError(
            exportparams,
            ibiz.i18n.t("editor.upload.exportJsonFormatErr")
          );
        }
      }
    }
  }
}

exports.UploadEditorController = UploadEditorController;
