import { RuntimeError } from '@ibiz-template/core';
import { EditorController, getDeACMode, UIActionUtil } from '@ibiz-template/runtime';
import { clone } from 'ramda';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CodeEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * 自填模式
     *
     * @type {IAppDEACMode}
     * @memberof CodeEditorController
     */
    __publicField(this, "deACMode");
    /**
     * editor 实例
     *
     * @private
     * @type {Monaco.editor.IStandaloneCodeEditor}
     * @memberof HtmlEditorController
     */
    __publicField(this, "editor");
    /**
     * monaco 实例
     *
     * @private
     * @type {IMonaco}
     * @memberof CodeEditorController
     */
    __publicField(this, "monaco");
    /**
     * editor 当前选区
     *
     * @type {monaco.Selection}
     * @memberof CodeEditorController
     */
    __publicField(this, "currentSelection");
    /**
     * AI 聊天自填模式
     *
     * @type {boolean}
     * @memberof CodeEditorController
     */
    __publicField(this, "chatCompletion", false);
    /**
     * AI行内聊天框高度
     *
     * @type {number}
     * @memberof CodeEditorController
     */
    __publicField(this, "inlineAiChatHeight");
    /**
     * @description 隐藏行号
     * @type {boolean}
     * @memberof CodeEditorController
     */
    __publicField(this, "hideLineNumbers", false);
    /**
     * @description 隐藏总览区
     * @type {boolean}
     * @memberof CodeEditorController
     */
    __publicField(this, "hideMinimap", false);
    /**
     * @description ai对话框标题
     * @type {string}
     * @memberof CodeEditorController
     */
    __publicField(this, "aiChatCaption", "");
    /**
     * @description 函数体
     * @type {string}
     * @memberof CodeEditorController
     */
    __publicField(this, "functionBody", "");
  }
  /**
   * 语言类型
   * @author lxm
   * @date 2023-07-21 04:52:16
   * @readonly
   */
  get language() {
    return this.editorParams.codeType || this.editorParams.language || "typescript";
  }
  /**
   * 主题
   * @author lxm
   * @date 2023-07-21 04:53:37
   * @readonly
   */
  get theme() {
    return this.editorParams.theme || "vs-dark";
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof CodeEditorController
   */
  async onInit() {
    await super.onInit();
    if (this.editorParams) {
      const {
        inlineaichatheight,
        hidelinenumbers,
        hideminimap,
        srfaichatcaption,
        functionbody
      } = this.editorParams;
      if (inlineaichatheight)
        this.inlineAiChatHeight = Number(inlineaichatheight);
      if (hidelinenumbers)
        this.hideLineNumbers = this.toBoolean(hidelinenumbers);
      if (hideminimap)
        this.hideMinimap = this.toBoolean(hideminimap);
      if (srfaichatcaption) {
        this.aiChatCaption = ibiz.appUtil.resolveI18nText(srfaichatcaption);
      }
      if (functionbody) {
        this.functionBody = functionbody;
      }
    }
    const { appDEACModeId, appDataEntityId } = this.model;
    if (appDEACModeId)
      this.deACMode = await getDeACMode(
        appDEACModeId,
        appDataEntityId,
        this.context.srfappid
      );
    if (this.deACMode) {
      if (this.deACMode.actype === "CHATCOMPLETION") {
        this.chatCompletion = true;
      }
    }
  }
  /**
   * editor 创建完成
   *
   * @private
   * @param {Monaco.editor.IStandaloneCodeEditor} editor
   */
  onCreated(editor, monaco) {
    this.editor = editor;
    this.monaco = monaco;
  }
  /**
   * 获取选中文本
   * @return {*}  {string} 选中文本
   */
  getSelectionText() {
    var _a, _b, _c;
    const selection = (_a = this.editor) == null ? void 0 : _a.getSelection();
    let selectedText;
    if (selection) {
      selectedText = (_c = (_b = this.editor) == null ? void 0 : _b.getModel()) == null ? void 0 : _c.getValueInRange(selection);
    }
    return selectedText || "";
  }
  /**
   * 插入文本
   * @param {string} text 文本
   */
  insertText(text) {
    var _a, _b, _c, _d;
    if (!this.editor || !this.monaco) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.editorNotInit"));
    }
    const selections = this.editor.getSelections();
    if (!selections || selections.length === 0)
      return;
    const activeSelection = selections[selections.length - 1];
    const insertLine = activeSelection.positionLineNumber;
    const insertColumn = activeSelection.positionColumn;
    const formattedText = "\n".concat(text, "\n");
    (_a = this.editor) == null ? void 0 : _a.executeEdits("", [
      {
        range: new this.monaco.Range(
          insertLine,
          insertColumn,
          insertLine,
          insertColumn
          // 光标位置纯插入，不替换任何内容
        ),
        text: formattedText
      }
    ]);
    const linesInText = formattedText.split("\n");
    const linesAdded = linesInText.length - 1;
    const lastLineOfInsert = insertLine + linesAdded - 1;
    const lastLineContent = linesInText[linesInText.length - 2] || "";
    const newColumn = lastLineContent.length + 1;
    const newPosition = new this.monaco.Position(lastLineOfInsert, newColumn);
    (_b = this.editor) == null ? void 0 : _b.setPosition(newPosition);
    (_c = this.editor) == null ? void 0 : _c.revealPositionInCenter(newPosition);
    (_d = this.editor) == null ? void 0 : _d.focus();
  }
  /**
   * 替换选中文本
   * @param {string} text
   */
  replaceSelectionText(text) {
    var _a;
    const selection = (_a = this.editor) == null ? void 0 : _a.getSelection();
    if (!selection || selection.isEmpty() || !this.monaco || !this.editor) {
      return;
    }
    const startPosition = selection.getStartPosition();
    this.editor.executeEdits("", [
      {
        range: selection,
        text
      }
    ]);
    const textLines = text.split("\n");
    const lineCount = textLines.length;
    const lastLineChars = textLines[lineCount - 1].length;
    let finalLineNumber;
    let finalColumn;
    if (lineCount === 1) {
      finalLineNumber = startPosition.lineNumber;
      finalColumn = startPosition.column + lastLineChars;
    } else {
      finalLineNumber = startPosition.lineNumber + (lineCount - 1);
      finalColumn = 1 + lastLineChars;
    }
    const newSelection = new this.monaco.Range(
      finalLineNumber,
      finalColumn,
      finalLineNumber,
      finalColumn
    );
    this.editor.createDecorationsCollection().clear();
    this.editor.setSelection(newSelection);
    this.editor.focus();
  }
  /**
   * 恢复选取
   */
  restoreSelection() {
    var _a;
    (_a = this.editor) == null ? void 0 : _a.focus();
  }
  /**
   * 获取内联AI编辑器元素
   */
  getInLineAiEditorElement() {
    if (!this.editor) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.editorNotInit"));
    }
    return this.editor.getDomNode();
  }
  /**
   * 获取内联AI编辑器主题
   */
  getInLineAiEditorTheme() {
    var _a, _b, _c;
    const currentTheme = (_c = (_b = (_a = this.editor) == null ? void 0 : _a._themeService) == null ? void 0 : _b._theme) == null ? void 0 : _c.themeName;
    switch (currentTheme) {
      case "vs-dark":
        return "dark";
      case "vs":
      default:
        return "light";
    }
  }
  /**
   * 获取内联AI聊天参数
   */
  getInLineAiChatOptions() {
    var _a, _b, _c, _d, _e, _f;
    if (!this.editor || !this.monaco) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.editorNotInit"));
    }
    const contentArea = (_b = (_a = this.editor) == null ? void 0 : _a.getDomNode()) == null ? void 0 : _b.querySelector(".editor-scrollable");
    if (!contentArea) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.noEditorArea"));
    }
    const position = (_c = this.currentSelection) == null ? void 0 : _c.getStartPosition();
    if (!position) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.noSelStart"));
    }
    const coordinates = (_d = this.editor) == null ? void 0 : _d.getScrolledVisiblePosition(position);
    const editorRect = (_f = (_e = this.editor) == null ? void 0 : _e.getDomNode()) == null ? void 0 : _f.getBoundingClientRect();
    if (!editorRect) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.noEditorRect"));
    }
    if (!coordinates) {
      throw new RuntimeError(ibiz.i18n.t("editor.code.noSelCoords"));
    }
    const rect = contentArea.getBoundingClientRect();
    const layoutInfo = this.editor.getLayoutInfo();
    return {
      // 编辑器编辑区左侧距离
      left: rect.left,
      // 编辑器上方距离 + 选区距离编辑器上方距离 + 行高度
      top: editorRect.top + coordinates.top + coordinates.height,
      // 编辑器编辑区宽度 - 代码预览区宽度 - 代码预览区标尺宽度
      width: rect.width - layoutInfo.minimap.minimapWidth - layoutInfo.overviewRuler.width,
      editorElement: this.getInLineAiEditorElement(),
      editorTheme: this.getInLineAiEditorTheme(),
      height: this.inlineAiChatHeight
    };
  }
  /**
   * 执行内联AIUI操作
   * @param uiActionId
   * @param appId
   */
  async doInLineAIUIAction(uiActionId, appId) {
    const eventArgs = this.ctrl.getEventArgs();
    eventArgs.params = clone(eventArgs.params);
    eventArgs.params.editor = this;
    if (this.editorParams.srfaiappendcurdata && this.editorParams.srfaiappendcurdata === "true") {
      eventArgs.context.srfaiappendcurdata = true;
    }
    await UIActionUtil.exec(
      uiActionId,
      {
        ...eventArgs
      },
      appId
    );
  }
}

export { CodeEditorController };
