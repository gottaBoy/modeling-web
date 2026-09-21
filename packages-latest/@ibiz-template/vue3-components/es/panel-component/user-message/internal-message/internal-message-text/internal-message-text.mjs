import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './internal-message-text.css';

"use strict";
const InternalMessageText = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("internal-message-text");
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
    return createVNode(resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "onRead": () => this.$emit("read"),
      "onClose": () => this.$emit("close")
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.e("caption")
      }, [title]), !!msgContent && createVNode("div", {
        "class": this.ns.e("content")
      }, [msgContent]), createVNode("div", {
        "class": this.ns.e("create-time")
      }, [create_time])]
    });
  }
});

export { InternalMessageText };
