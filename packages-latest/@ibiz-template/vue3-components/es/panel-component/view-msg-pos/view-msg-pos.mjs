import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode, useCtx } from '@ibiz-template/vue3-util';
import { ViewMsgPosController } from './view-msg-pos.controller.mjs';

"use strict";
const ViewMsgPos = /* @__PURE__ */ defineComponent({
  name: "IBizViewMsgPos",
  props: {
    /**
     * @description 视图消息占位控件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 视图消息占位控件控制器
     */
    controller: {
      type: ViewMsgPosController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("view-msg-pos");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const ctx = useCtx();
    const view = ctx.view;
    return {
      ns,
      view,
      semanticClass,
      semanticStyle
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
        "class": [this.ns.b(), this.semanticClass("root")],
        "style": this.semanticStyle("root")
      }, [createVNode(resolveComponent("view-message"), {
        "messages": viewMessages,
        "scroll": scroll,
        "context": c.panel.context,
        "params": c.panel.params,
        "controller": c.panel.view.viewMsgController,
        "semantic": {
          item: {
            class: this.semanticClass("item"),
            style: this.semanticStyle("item")
          }
        }
      }, null)]);
    }
    return null;
  }
});

export { ViewMsgPos };
