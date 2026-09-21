'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
const ViewMessage = /* @__PURE__ */ vue.defineComponent({
  name: "IBizViewMessage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("view-message");
    const c = props.controller;
    const ctx = vue3Util.useCtx();
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
        return vue.createVNode(vue.resolveComponent("view-message"), {
          "class": [this.ns.e("body-message")],
          "messages": viewMessages
        }, null);
      }
    }
    return null;
  }
});

exports.ViewMessage = ViewMessage;
