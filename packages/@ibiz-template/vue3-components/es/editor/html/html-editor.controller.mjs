import { h } from 'vue';
import { EditorController, getDeACMode } from '@ibiz-template/runtime';
import { NOOP, listenJSEvent } from '@ibiz-template/core';
import { Boot } from '@wangeditor/editor';
import './wang-editor/index.mjs';
import { AIMenu } from './wang-editor/module/ai-module.mjs';
import { EmojiElem } from './wang-editor/element/emoji.mjs';
import { EmojiModule } from './wang-editor/module/emoji-module.mjs';
import { Plugin } from './wang-editor/plugin/plugin.mjs';
import { Emoji } from './wang-editor/component/emoji/emoji.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HtmlEditorController extends EditorController {
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
     * @type {IAppDEService}
     * @memberof HtmlEditorController
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
     * AI 聊天自填模式
     *
     * @author chitanda
     * @date 2023-10-12 10:10:37
     * @type {boolean}
     */
    __publicField(this, "chatCompletion", false);
    /**
     * wangEditor 实例
     *
     * @private
     * @type {IDomEditor}
     * @memberof HtmlEditorController
     */
    __publicField(this, "wangEditor");
    /**
     * 气泡容器
     *
     * @type {(IOverlayPopoverContainer | null)}
     * @memberof HtmlEditorController
     */
    __publicField(this, "overlay", null);
    /**
     * 清除回调
     *
     * @private
     * @memberof HtmlEditorController
     */
    __publicField(this, "cleanup", NOOP);
    /**
     * 预定义阻止捕获事件code
     *
     * @private
     * @type {number[]}
     * @memberof HtmlEditorController
     */
    __publicField(this, "presetPreventEvents", [13, 38, 40]);
    /**
     * 预定义阻止冒泡事件code
     *
     * @private
     * @type {number[]}
     * @memberof HtmlEditorController
     */
    __publicField(this, "presetPreventPropEvents", [27]);
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof HtmlEditorController
   */
  async onInit() {
    await super.onInit();
    this.customRegister();
    if (this.editorParams) {
      const { uploadParams, exportParams } = this.editorParams;
      if (uploadParams) {
        try {
          this.uploadParams = JSON.parse(uploadParams);
        } catch (error) {
          ibiz.log.error(
            "\u7F16\u8F91\u5668[".concat(ibiz.log.error(
              error
            ), "]\u7F16\u8F91\u5668\u53C2\u6570 uploadParams \u975E json \u683C\u5F0F")
          );
        }
      }
      if (exportParams) {
        try {
          this.exportParams = JSON.parse(exportParams);
        } catch (error) {
          ibiz.log.error(
            "\u7F16\u8F91\u5668[".concat(ibiz.log.error(
              error
            ), "]\u7F16\u8F91\u5668\u53C2\u6570 exportParams \u975E json \u683C\u5F0F")
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
        if (this.deACMode.actype === "CHATCOMPLETION") {
          this.deService = await ibiz.hub.getApp(model.appId).deService.getService(this.context, model.appDataEntityId);
          this.chatCompletion = true;
        }
      }
    }
  }
  /**
   * 自定义注册
   *
   * @private
   * @memberof HtmlEditorController
   */
  customRegister() {
    if (!window.aichartRegister) {
      Boot.registerMenu(AIMenu);
      window.aichartRegister = true;
    }
    if (!window.customElements.get("emoji-elem")) {
      window.customElements.define("emoji-elem", EmojiElem);
    }
    if (!window.emojiIsRegiter) {
      Boot.registerModule(EmojiModule);
      window.emojiIsRegiter = true;
    }
    if (!window.wangEditorPlugin) {
      Boot.registerPlugin(Plugin);
      window.wangEditorPlugin = true;
    }
  }
  /**
   * wangEditor 创建完成
   *
   * @private
   * @param {IDomEditor} editor
   * @memberof HtmlEditorController
   */
  onCreated(editor) {
    this.wangEditor = editor;
    this.listenEvent();
  }
  /**
   * 监听事件
   *
   * @private
   * @memberof HtmlEditorController
   */
  listenEvent() {
    const container = this.wangEditor.getEditableContainer();
    this.wangEditor.on("openEmojiSelect", () => this.openEmojiSelect());
    this.cleanup = listenJSEvent(container, "keydown", (event) => {
      var _a;
      if (this.overlay && this.presetPreventEvents.includes(event.keyCode)) {
        event.preventDefault();
      }
      if (this.overlay && this.presetPreventPropEvents.includes(event.keyCode)) {
        event.stopPropagation();
        (_a = this.overlay) == null ? void 0 : _a.dismiss();
      }
    });
  }
  /**
   * 打开表情选择
   *
   * @memberof HtmlEditorController
   */
  async openEmojiSelect() {
    const domSelection = document.getSelection();
    const { focusNode } = domSelection;
    if (focusNode) {
      this.overlay = ibiz.overlay.createPopover(
        (modal) => {
          return h(Emoji, {
            modal
          });
        },
        void 0,
        {
          width: "auto",
          noArrow: true,
          autoClose: true,
          placement: "bottom-start"
        }
      );
      await this.overlay.present(focusNode.parentNode);
      this.overlay.onWillDismiss().then((result) => {
        var _a;
        const _result = result;
        const item = (_a = _result.data) == null ? void 0 : _a[0];
        if (_result.ok && item) {
          this.addEmojiNode(item);
        }
        this.overlay = null;
      });
    }
  }
  /**
   * 添加表情
   *
   * @param {string} data
   * @memberof HtmlEditorController
   */
  addEmojiNode(data) {
    const emojiNode = {
      data,
      type: "emoji",
      children: [{ text: "" }]
    };
    this.wangEditor.restoreSelection();
    this.wangEditor.insertNode(emojiNode);
    this.wangEditor.move(1);
  }
  /**
   * 销毁
   *
   * @private
   * @memberof HtmlEditorController
   */
  onDestroyed() {
    if (this.cleanup !== NOOP) {
      this.cleanup();
    }
    if (this.overlay) {
      this.overlay.dismiss();
    }
  }
}

export { HtmlEditorController };
