'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var viewMsgPos_controller = require('./view-msg-pos.controller.cjs');

"use strict";
const ViewMsgPos = /* @__PURE__ */ vue.defineComponent({
  name: "IBizViewMsgPos",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: viewMsgPos_controller.ViewMsgPosController,
      required: true
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("view-msg-pos");
    const ctx = vue3Util.useCtx();
    const view = ctx.view;
    return {
      ns,
      view
    };
  },
  render() {
    const c = this.controller;
    if (!this.view.state.isCreated) {
      return;
    }
    const position = c.rawItemParams.position || "BODY";
    const scroll = c.rawItemParams.scroll === "true";
    const viewMessages = this.view.state.viewMessages[position];
    if (viewMessages == null ? void 0 : viewMessages.length) {
      return vue.createVNode("div", {
        "class": this.ns.b()
      }, [vue.createVNode(vue.resolveComponent("view-message"), {
        "messages": viewMessages,
        "scroll": scroll,
        "context": c.panel.context,
        "params": c.panel.params,
        "controller": c.panel.view.viewMsgController
      }, null)]);
    }
    return null;
  }
});

exports.ViewMsgPos = ViewMsgPos;
