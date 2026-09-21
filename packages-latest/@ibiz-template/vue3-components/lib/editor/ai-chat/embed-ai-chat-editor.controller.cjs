'use strict';

var runtime = require('@ibiz-template/runtime');
var vue = require('vue');
var qxUtil = require('qx-util');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EmbedAIChatEditorController extends runtime.EditorController {
  constructor() {
    super(...arguments);
    /**
     * @description 聊天框实例
     * @author tony001
     * @date 2026-05-15 15:05:37
     * @type {*}
     * @memberof EmbedAIChatEditorController
     */
    __publicField(this, "chatInstance");
    /**
     * @description 应用实体服务
     * @author tony001
     * @date 2026-05-15 16:05:22
     * @type {IAppDEService}
     * @memberof EmbedAIChatEditorController
     */
    __publicField(this, "deService");
    /**
     * @description 自填模式
     * @author tony001
     * @date 2026-05-15 16:05:30
     * @type {IAppDEACMode}
     * @memberof EmbedAIChatEditorController
     */
    __publicField(this, "deACMode");
    /**
     * @description
     * @type {boolean}
     * @memberof EmbedAIChatEditorController
     */
    __publicField(this, "isSimple", false);
    /**
     * @description 编辑器唯一标识
     * @protected
     * @type {Ref<string>}
     * @memberof EmbedAIChatEditorController
     */
    __publicField(this, "UUID", vue.ref(qxUtil.createUUID()));
  }
  /**
   * @description 初始化
   * @author tony001
   * @date 2026-05-15 16:05:12
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof EmbedAIChatEditorController
   */
  async onInit() {
    await super.onInit();
    const model = this.model;
    if (model.appDEACModeId) {
      this.deACMode = await runtime.getDeACMode(
        model.appDEACModeId,
        model.appDataEntityId,
        this.context.srfappid
      );
      if (this.deACMode) {
        if (this.deACMode.actype === "CHATCOMPLETION" && ibiz.env.enableAI) {
          this.deService = await ibiz.hub.getApp(model.appId).deService.getService(this.context, model.appDataEntityId);
        }
      }
    }
    const module = await import('@ibiz-template-plugin/ai-chat');
    if (module && module.createFlatChat) {
      this.chatInstance = module.createFlatChat();
    } else if (module && module.default && module.default.createFlatChat) {
      this.chatInstance = module.default.createFlatChat();
    }
    const { issimple } = this.editorParams;
    if (issimple)
      this.isSimple = issimple === "true";
  }
  /**
   * @description 重绘
   * @memberof EmbedAIChatEditorController
   */
  redraw() {
    this.UUID.value = qxUtil.createUUID();
  }
}

exports.EmbedAIChatEditorController = EmbedAIChatEditorController;
