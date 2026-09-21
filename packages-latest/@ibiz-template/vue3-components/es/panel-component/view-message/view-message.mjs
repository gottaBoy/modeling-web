import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode, useCtx } from '@ibiz-template/vue3-util';
import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
const ViewMessage = /* @__PURE__ */ defineComponent({
  name: "IBizViewMessage",
  props: {
    /**
     * @description 视图消息组件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 视图消息组件控制器
     */
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("view-message");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const ctx = useCtx();
    const {
      view
    } = ctx;
    return {
      ns,
      c,
      view,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const c = this.view;
    if (c.state.isCreated) {
      const viewMessages = c.state.viewMessages.BODY;
      if (viewMessages == null ? void 0 : viewMessages.length) {
        return createVNode(resolveComponent("view-message"), {
          "class": [this.ns.e("body-message"), this.semanticClass("root")],
          "style": this.semanticStyle("root"),
          "messages": viewMessages,
          "semantic": {
            item: {
              class: this.semanticClass("item"),
              style: this.semanticStyle("item")
            }
          }
        }, null);
      }
    }
    return null;
  }
});

export { ViewMessage };
