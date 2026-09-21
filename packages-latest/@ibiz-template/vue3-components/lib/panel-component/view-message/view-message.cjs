'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
const ViewMessage = /* @__PURE__ */ vue.defineComponent({
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
      type: runtime.PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("view-message");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const ctx = vue3Util.useCtx();
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
        return vue.createVNode(vue.resolveComponent("view-message"), {
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

exports.ViewMessage = ViewMessage;
