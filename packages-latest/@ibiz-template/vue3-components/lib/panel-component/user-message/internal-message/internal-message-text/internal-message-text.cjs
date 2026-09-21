'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./internal-message-text.css');

"use strict";
const InternalMessageText = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInternalMessageText",
  props: {
    message: {
      type: Object,
      required: true
    },
    provider: {
      type: Object,
      required: true
    }
  },
  emits: {
    close: () => true,
    read: () => true
  },
  setup() {
    const ns = vue3Util.useNamespace("internal-message-text");
    return {
      ns
    };
  },
  render() {
    const {
      title,
      create_time,
      content: msgContent
    } = this.message;
    return vue.createVNode(vue.resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "onRead": () => this.$emit("read"),
      "onClose": () => this.$emit("close")
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.e("caption")
      }, [title]), !!msgContent && vue.createVNode("div", {
        "class": this.ns.e("content")
      }, [msgContent]), vue.createVNode("div", {
        "class": this.ns.e("create-time")
      }, [create_time])]
    });
  }
});

exports.InternalMessageText = InternalMessageText;
