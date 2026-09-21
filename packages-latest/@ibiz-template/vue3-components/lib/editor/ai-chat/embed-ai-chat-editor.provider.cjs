'use strict';

var embedAiChatEditor_controller = require('./embed-ai-chat-editor.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EmbedAIChatEditorProvider {
  constructor() {
    __publicField(this, "formEditor", "IBizEmbedAIChat");
    __publicField(this, "gridEditor", "IBizEmbedAIChat");
  }
  async createController(editorModel, parentController) {
    const c = new embedAiChatEditor_controller.EmbedAIChatEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}

exports.EmbedAIChatEditorProvider = EmbedAIChatEditorProvider;
