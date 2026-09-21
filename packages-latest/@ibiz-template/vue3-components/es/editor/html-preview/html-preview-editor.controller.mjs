import { RuntimeError } from '@ibiz-template/core';
import { EditorController, getDeACMode, UIActionUtil } from '@ibiz-template/runtime';
import { clone } from 'ramda';
import { getSelectionPosition } from './ibiz-html-preview/ibiz-html-preview-util.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HtmlPreviewEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * 应用实体服务
     *
     * @type {IAppDEService}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "deService");
    /**
     * @description 自填模式
     * @type {IAppDEACMode}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "deACMode");
    /**
     * @description AI 聊天自填模式
     * @type {boolean}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "chatCompletion", false);
    /**
     * @description 行内AI 聊天自填模式
     * @type {boolean}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "inLineChatCompletion", false);
    /**
     * @description 启用预览模式
     * @type {boolean}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "enablePreview", false);
    /**
     * @description 是否允许全屏
     * @type {boolean}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "enableFullscreen", true);
    /**
     * @description 是否启用xss过滤
     * @type {boolean}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "enableXss", false);
    /**
     * @description 编辑框元素
     * @type {(HTMLElement | null)}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "editorContainer", null);
    /**
     * @description 选中文本
     * @type {string}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "selectedText", "");
    /**
     * @description 最后一次选中区域
     * @type {(Range | null)}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "lastRange", null);
    /**
     * AI行内聊天框高度
     *
     * @type {number}
     * @memberof HtmlPreviewEditorController
     */
    __publicField(this, "inlineAiChatHeight");
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof HtmlPreviewEditorController
   */
  async onInit() {
    await super.onInit();
    const { enablepreview, enablefullscreen, enablexss, inlineaichatheight } = this.editorParams;
    if (enablepreview) {
      this.enablePreview = this.toBoolean(enablepreview);
    }
    if (enablefullscreen) {
      this.enableFullscreen = this.toBoolean(enablefullscreen);
    }
    if (enablexss) {
      this.enableXss = this.toBoolean(enablexss);
    }
    if (inlineaichatheight) {
      this.inlineAiChatHeight = Number(inlineaichatheight);
    }
    const model = this.model;
    if (model.appDEACModeId) {
      this.deACMode = await getDeACMode(
        model.appDEACModeId,
        model.appDataEntityId,
        this.context.srfappid
      );
      if (this.deACMode) {
        if (this.deACMode.actype === "CHATCOMPLETION") {
          this.deService = await ibiz.hub.getApp(model.appId).deService.getService(this.context, model.appDataEntityId);
          this.chatCompletion = true;
          const { deuiactionGroup } = this.deACMode;
          const uiactionGroupDetails = (deuiactionGroup == null ? void 0 : deuiactionGroup.uiactionGroupDetails) || [];
          const items = uiactionGroupDetails.flatMap((item) => {
            var _a, _b, _c, _d, _e;
            const isInlineAction = item.detailType === "DEUIACTION" && ((_a = item.uiactionId) == null ? void 0 : _a.startsWith("inline"));
            if (isInlineAction) {
              return [item];
            }
            if (item.detailType === "DEUIACTIONGROUP" && ((_c = (_b = item.refUIActionGroup) == null ? void 0 : _b.id) == null ? void 0 : _c.startsWith("inline"))) {
              return (_e = (_d = item.refUIActionGroup.uiactionGroupDetails) == null ? void 0 : _d.filter(
                (detail) => {
                  var _a2;
                  return detail.detailType === "DEUIACTION" && ((_a2 = detail.uiactionId) == null ? void 0 : _a2.startsWith("inline"));
                }
              )) != null ? _e : [];
            }
            return [];
          });
          this.inLineChatCompletion = items.length > 0;
        }
      }
    }
  }
  /**
   * 获取选中文本
   * @returns 选中文本
   */
  getSelectionText() {
    return this.selectedText;
  }
  /**
   * 插入文本
   * @param text 文本
   */
  insertText(text) {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || selection.isCollapsed) {
      return;
    }
    const range = selection.getRangeAt(0);
    const textNode = document.createTextNode(text);
    range.setStart(range.startContainer, range.startOffset);
    range.insertNode(textNode);
    const newRange = document.createRange();
    newRange.setStartAfter(textNode);
    selection.collapse(textNode, textNode.length);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
  /**
   * 替换选中文本
   * @param text 文本
   */
  replaceSelectionText(text) {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return;
    }
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  /**
   * 恢复选区
   */
  restoreSelection() {
    if (this.lastRange) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(this.lastRange);
      }
    }
  }
  /**
   * 获取内联AI编辑器元素
   */
  getInLineAiEditorElement() {
    if (!this.editorContainer) {
      throw new RuntimeError(ibiz.i18n.t("editor.html.editorNotInit"));
    }
    return this.editorContainer;
  }
  /**
   * 获取内联AI编辑器主题
   */
  getInLineAiEditorTheme() {
    const appTheme = ibiz.util.theme.getTheme();
    if (appTheme.indexOf("dark") !== -1) {
      return "dark";
    }
    return "light";
  }
  /**
   * 获取内联AI参数
   */
  getInLineAiChatOptions() {
    if (!this.editorContainer) {
      throw new RuntimeError(ibiz.i18n.t("editor.html.editorNotInit"));
    }
    const selectionPosition = getSelectionPosition(this.editorContainer);
    if (!selectionPosition || selectionPosition.left == null || selectionPosition.top == null)
      throw new RuntimeError(ibiz.i18n.t("editor.html.getSelectPositionFail"));
    const editorBoundingClientRect = this.editorContainer.getBoundingClientRect();
    return {
      // 编辑器的左侧距离 + 默认padding
      left: editorBoundingClientRect.x + 12,
      // 编辑器的上方距离+选区距离编辑器上方距离
      top: editorBoundingClientRect.y + selectionPosition.top,
      // 编辑器的宽度 - 左右padding
      width: editorBoundingClientRect.width - 24,
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

export { HtmlPreviewEditorController };
