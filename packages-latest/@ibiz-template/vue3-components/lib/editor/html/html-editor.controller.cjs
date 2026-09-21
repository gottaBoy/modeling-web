'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var editor = require('@wangeditor/editor');
var ramda = require('ramda');
require('./wang-editor/index.cjs');
var extraModule = require('./wang-editor/module/extra-module.cjs');
var aiModule = require('./wang-editor/module/ai-module.cjs');
var inlineAiModule = require('./wang-editor/module/inline-ai-module.cjs');
var emoji = require('./wang-editor/element/emoji.cjs');
var emojiModule = require('./wang-editor/module/emoji-module.cjs');
var plugin = require('./wang-editor/plugin/plugin.cjs');
var emoji$1 = require('./wang-editor/component/emoji/emoji.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HtmlEditorController extends runtime.EditorController {
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
    __publicField(this, "cleanup", core.NOOP);
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
    /**
     * AI行内聊天框高度
     *
     * @type {number}
     * @memberof HtmlEditorController
     */
    __publicField(this, "inlineAiChatHeight");
    /**
     * @description 附加界面行为
     * @type {IData[]}
     * @memberof HtmlEditorController
     */
    __publicField(this, "extraActions", []);
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
      const {
        uploadParams,
        exportParams,
        uploadparams,
        exportparams,
        inlineaichatheight
      } = this.editorParams;
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
      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          ibiz.log.error(
            "\u7F16\u8F91\u5668[".concat(ibiz.log.error(
              error
            ), "]\u7F16\u8F91\u5668\u53C2\u6570 uploadparams \u975E json \u683C\u5F0F")
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
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          ibiz.log.error(
            "\u7F16\u8F91\u5668[".concat(ibiz.log.error(
              error
            ), "]\u7F16\u8F91\u5668\u53C2\u6570 exportparams \u975E json \u683C\u5F0F")
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
        if (this.extraActions.length > 0) {
          this.addExtraRegister();
        }
      }
    }
  }
  /**
   * @description 注册额外行为菜单项
   * @private
   * @memberof HtmlEditorController
   */
  addExtraRegister() {
    this.extraActions.forEach((item) => {
      const { uiactionId } = item;
      const tag = uiactionId.split("@")[0];
      if (!window["".concat(tag, "Register")]) {
        const extraMenu = {
          key: tag,
          factory() {
            return new extraModule.ExtraButtonMenu(item);
          }
        };
        editor.Boot.registerMenu(extraMenu);
        window["".concat(tag, "Register")] = true;
      }
    });
  }
  /**
   * 自定义注册
   *
   * @private
   * @memberof HtmlEditorController
   */
  customRegister() {
    if (!window.aichartRegister && ibiz.env.enableAI) {
      editor.Boot.registerMenu(aiModule.AIMenu);
      editor.Boot.registerMenu(inlineAiModule.InLineAIMenu);
      window.aichartRegister = true;
    }
    if (!window.customElements.get("emoji-elem")) {
      window.customElements.define("emoji-elem", emoji.EmojiElem);
    }
    if (!window.emojiIsRegiter) {
      editor.Boot.registerModule(emojiModule.EmojiModule);
      window.emojiIsRegiter = true;
    }
    if (!window.wangEditorPlugin) {
      editor.Boot.registerPlugin(plugin.Plugin);
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
    this.cleanup = core.listenJSEvent(container, "keydown", (event) => {
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
          return vue.h(emoji$1.Emoji, {
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
    if (this.cleanup !== core.NOOP) {
      this.cleanup();
    }
    if (this.overlay) {
      this.overlay.dismiss();
    }
  }
  /**
   * 获取选中文本
   * @returns 选中文本
   */
  getSelectionText() {
    if (this.wangEditor) {
      return this.wangEditor.getSelectionText();
    }
    return "";
  }
  /**
   * 插入文本
   * @param text 文本
   */
  insertText(text) {
    if (this.wangEditor) {
      const newParagraph = {
        type: "paragraph",
        children: [{ text }]
      };
      const selection = this.wangEditor.selection;
      if (selection) {
        const collapsedSelection = {
          anchor: selection.anchor,
          focus: selection.anchor
        };
        if (selection.anchor.path !== selection.focus.path || selection.anchor.offset !== selection.focus.offset) {
          collapsedSelection.anchor = selection.focus;
          collapsedSelection.focus = selection.focus;
        }
        this.wangEditor.select(collapsedSelection);
      }
      this.wangEditor.insertNode(newParagraph);
      this.wangEditor.move(1);
    }
  }
  /**
   * 替换选中文本
   * @param text 文本
   */
  replaceSelectionText(text) {
    if (this.wangEditor) {
      if (this.wangEditor.selection) {
        this.wangEditor.deleteFragment();
        this.wangEditor.insertText(text);
      } else {
        this.wangEditor.insertText(text);
      }
    }
  }
  /**
   * 恢复选区
   */
  restoreSelection() {
    if (this.wangEditor) {
      this.wangEditor.restoreSelection();
    }
  }
  /**
   * 获取内联AI编辑器元素
   */
  getInLineAiEditorElement() {
    if (!this.wangEditor) {
      throw new core.RuntimeError(ibiz.i18n.t("editor.html.editorNotInit"));
    }
    return this.wangEditor.getEditableContainer();
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
    if (!this.wangEditor) {
      throw new core.RuntimeError(ibiz.i18n.t("editor.html.editorNotInit"));
    }
    const selectionPosition = this.wangEditor.getSelectionPosition();
    if (!selectionPosition || !selectionPosition.left || !selectionPosition.top)
      throw new core.RuntimeError(ibiz.i18n.t("editor.html.getSelectPositionFail"));
    const editorBoundingClientRect = this.wangEditor.getEditableContainer().getBoundingClientRect();
    return {
      // 编辑器的左侧距离 + 默认padding
      left: editorBoundingClientRect.x + 10,
      // 编辑器的上方距离+选区距离编辑器上方距离
      top: editorBoundingClientRect.y + Number(selectionPosition.top.replace("px", "")),
      // 编辑器的宽度 - 左右padding
      width: editorBoundingClientRect.width - 20,
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
   * @memberof HtmlEditorController
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

exports.HtmlEditorController = HtmlEditorController;
