import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useCtx } from '@ibiz-template/vue3-util';
import { ViewMsgPosController } from './view-msg-pos.controller.mjs';

"use strict";
const ViewMsgPos = /* @__PURE__ */ defineComponent({
  name: "IBizViewMsgPos",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ViewMsgPosController,
      required: true
    }
  },
  setup() {
    const ns = useNamespace("view-msg-pos");
    const ctx = useCtx();
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
      return createVNode("div", {
        "class": this.ns.b()
      }, [createVNode(resolveComponent("view-message"), {
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

export { ViewMsgPos };
