import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useCtx } from '@ibiz-template/vue3-util';
import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
const ViewMessage = /* @__PURE__ */ defineComponent({
  name: "IBizViewMessage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("view-message");
    const c = props.controller;
    const ctx = useCtx();
    const {
      view
    } = ctx;
    return {
      ns,
      c,
      view
    };
  },
  render() {
    const c = this.view;
    if (c.state.isCreated) {
      const viewMessages = c.state.viewMessages.BODY;
      if (viewMessages == null ? void 0 : viewMessages.length) {
        return createVNode(resolveComponent("view-message"), {
          "class": [this.ns.e("body-message")],
          "messages": viewMessages
        }, null);
      }
    }
    return null;
  }
});

export { ViewMessage };
