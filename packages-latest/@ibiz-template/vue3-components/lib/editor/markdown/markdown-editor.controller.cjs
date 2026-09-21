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
class MarkDownEditorController extends runtime.EditorController {
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
    /**
     * 编辑器实例
     *
     * @type {IData}
     * @memberof MarkDownEditorController
     */
    __publicField(this, "mdeditor", null);
    /**
     * 选区位置缓存
     *
     * @type {(IData | null)}
     * @memberof MarkDownEditorController
     */
    __publicField(this, "selectionAreaPosition", null);
    /**
     * 选区方向  true表示正向，从左到右；false表示反向，从右到左
     *
     * @type {boolean}
     * @memberof MarkDownEditorController
     */
    __publicField(this, "selectionDirection", true);
    /**
     * 当前编辑器使用主题
     *
     * @type {string}
     * @memberof MarkDownEditorController
     */
    __publicField(this, "currentEditorTheme", "light");
    /**
     * AI行内聊天框高度
     *
     * @type {number}
     * @memberof MarkDownEditorController
     */
    __publicField(this, "inlineAiChatHeight");
    /**
     * @description 附加界面行为
     * @type {IData[]}
     * @memberof MarkDownEditorController
     */
    __publicField(this, "extraActions", []);
  }
  async onInit() {
    await super.onInit();
    if (!this.style.height) {
      this.style.height = "600px";
    }
    if (this.editorParams) {
      const { uploadparams, exportparams, inlineaichatheight } = this.editorParams;
      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          throw new core.RuntimeModelError(
            uploadparams,
            ibiz.i18n.t("editor.markdown.uploadJsonFormatErr")
          );
        }
      }
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          throw new core.RuntimeModelError(
            exportparams,
            ibiz.i18n.t("editor.markdown.exportJsonFormatErr")
          );
        }
      }
      if (inlineaichatheight) {
        this.inlineAiChatHeight = Number(inlineaichatheight);
      }
    }
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
        if (this.deACMode.actype === "CHATCOMPLETION") {
          this.deService = await ibiz.hub.getApp(model.appId).deService.getService(this.context, model.appDataEntityId);
          this.chatCompletion = true;
        }
        const { deuiactionGroup } = this.deACMode;
        const uiactionGroupDetails = (deuiactionGroup == null ? void 0 : deuiactionGroup.uiactionGroupDetails) || [];
        if (uiactionGroupDetails.length > 0) {
          this.extraActions = uiactionGroupDetails.filter(
            (item) => {
              var _a;
              return (_a = item.uiactionId) == null ? void 0 : _a.startsWith("header_extra");
            }
          );
        }
      }
    }
  }
  /**
   * 设置编辑器实例
   *
   * @param {IData} mdeditor
   * @memberof MarkDownEditorController
   */
  setMDEditor(mdeditor) {
    this.mdeditor = mdeditor;
  }
  /**
   * 设置保存当前选区位置
   *
   * @param {IData} start
   * @param {IData} end
   * @memberof MarkDownEditorController
   */
  setCursorPos(start, end) {
    this.selectionAreaPosition = { start, end };
  }
  /**
   * 设置当前编辑器的主题
   *
   * @param {string} theme
   * @memberof MarkDownEditorController
   */
  setCurrentEditorTheme(theme) {
    this.currentEditorTheme = theme;
  }
  /**
   * 设置当前选区方向
   *
   * @param {boolean} direction
   * @memberof MarkDownEditorController
   */
  setSelectionDirection(direction) {
    this.selectionDirection = direction;
  }
  /**
   * 获取当前主题
   *
   * @return {*}  {('light' | 'dark')}
   * @memberof MarkDownEditorController
   */
  getCurrentTheme() {
    return this.currentEditorTheme === "dark" ? "dark" : "light";
  }
  /**
   * 获取选中文本
   *
   * @return {*}  {string}
   * @memberof MarkDownEditorController
   */
  getSelectionText() {
    var _a;
    return (_a = this.mdeditor) == null ? void 0 : _a.editor.editor.getSelection();
  }
  /**
   * 获取内联AI编辑器主题
   *
   * @return {*}  {('light' | 'dark')}
   * @memberof MarkDownEditorController
   */
  getInLineAiEditorTheme() {
    return this.getCurrentTheme();
  }
  /**
   * 判断选区方向
   *
   * @param {IData} posA
   * @param {IData} posB
   * @return {*}  {boolean}
   * @memberof MarkDownEditorController
   */
  isPositionBefore(posA, posB) {
    if (posA.line < posB.line)
      return true;
    if (posA.line > posB.line)
      return false;
    return posA.ch < posB.ch;
  }
  /**
   * 插入文本
   *
   * @param {string} text
   * @memberof MarkDownEditorController
   */
  insertText(text) {
    var _a, _b, _c;
    if (this.selectionAreaPosition) {
      const { start, end } = this.selectionAreaPosition;
      const contentToInsert = "\n".concat(text, "\n");
      const hasSelection = !(start.line === end.line && start.ch === end.ch);
      if (!hasSelection) {
        (_a = this.mdeditor) == null ? void 0 : _a.editor.editor.replaceSelection(contentToInsert);
        return;
      }
      let insetPos;
      if (this.selectionDirection) {
        insetPos = end;
      } else {
        insetPos = start;
      }
      (_b = this.mdeditor) == null ? void 0 : _b.editor.editor.setCursor(insetPos);
      (_c = this.mdeditor) == null ? void 0 : _c.editor.editor.replaceSelection(contentToInsert);
      if (this.selectionDirection === false) {
        const index = (contentToInsert.match(/\n/g) || []).length;
        this.selectionAreaPosition.start.line += index;
        this.selectionAreaPosition.end.line += index;
        this.selectionAreaPosition.end.ch -= this.selectionAreaPosition.start.ch;
        this.selectionAreaPosition.start.ch = 0;
      }
      this.restoreSelection();
    }
  }
  /**
   * 替换选中文本
   *
   * @param {string} text
   * @memberof MarkDownEditorController
   */
  replaceSelectionText(text) {
    var _a;
    (_a = this.mdeditor) == null ? void 0 : _a.editor.editor.replaceSelection(text);
  }
  /**
   * 恢复选区
   *
   * @memberof MarkDownEditorController
   */
  restoreSelection() {
    var _a, _b, _c;
    (_c = this.mdeditor) == null ? void 0 : _c.editor.editor.setSelection(
      (_a = this.selectionAreaPosition) == null ? void 0 : _a.start,
      (_b = this.selectionAreaPosition) == null ? void 0 : _b.end
    );
  }
  /**
   * 获取内联AI参数
   *
   * @return {*}  {IData}
   * @memberof MarkDownEditorController
   */
  getInLineAiChatOptions() {
    var _a, _b, _c, _d, _e;
    const editorRect = (_a = this.mdeditor) == null ? void 0 : _a.wrapperDom.getBoundingClientRect();
    if (!((_b = this.mdeditor) == null ? void 0 : _b.bubble.visible)) {
      (_c = this.mdeditor) == null ? void 0 : _c.bubble.showBubble();
    }
    const bubbleRect = (_d = this.mdeditor) == null ? void 0 : _d.bubble.bubbleDom.getBoundingClientRect();
    return {
      // 编辑器的左侧距离 + 10px
      left: editorRect.left + 10,
      // 浮动工具栏的顶部距离位置
      top: bubbleRect.top,
      // 编辑器的宽度 - 右侧工具栏的宽度(38px) - 左侧边距（10px）- 右侧边距（10px）
      width: editorRect.width - 58,
      editorElement: (_e = this.mdeditor) == null ? void 0 : _e.wrapperDom,
      editorTheme: this.getCurrentTheme(),
      height: this.inlineAiChatHeight
    };
  }
  /**
   * 返回内联AI编辑器元素
   *
   * @return {*}  {Element}
   * @memberof MarkDownEditorController
   */
  getInLineAiEditorElement() {
    var _a;
    return (_a = this.mdeditor) == null ? void 0 : _a.wrapperDom;
  }
  /**
   *  执行内联AIUI操作
   *
   * @param {string} _uiAction
   * @param {string} _appId
   * @return {*}  {Promise<void>}
   * @memberof MarkDownEditorController
   */
  async doInLineAIUIAction(uiActionId, appId) {
    const eventArgs = this.ctrl.getEventArgs();
    eventArgs.params = ramda.clone(eventArgs.params);
    eventArgs.params.editor = this;
    if (this.editorParams.srfaiappendcurdata && this.editorParams.srfaiappendcurdata === "true") {
      eventArgs.context.srfaiappendcurdata = true;
    }
    await runtime.UIActionUtil.exec(
      uiActionId,
      {
        ...eventArgs
      },
      appId
    );
  }
  /**
   * @description 执行自定义界面行为
   * @param {string} uiActionId
   * @param {string} appId
   * @returns {*}  {Promise<IData[]>}
   * @memberof MarkDownEditorController
   */
  async doCustomUIAction(uiActionId, appId) {
    const eventArgs = this.ctrl.getEventArgs();
    eventArgs.params = ramda.clone(eventArgs.params);
    const result = await runtime.UIActionUtil.exec(
      uiActionId,
      {
        ...eventArgs
      },
      appId
    );
    const data = result.data || [];
    return data;
  }
}

exports.MarkDownEditorController = MarkDownEditorController;
