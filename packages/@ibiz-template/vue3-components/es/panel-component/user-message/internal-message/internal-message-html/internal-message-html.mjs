import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './internal-message-html.css';
import '../../../../util/index.mjs';
import { parseHtml } from '../../../../util/wang-editor-util/wang-editor-util.mjs';

"use strict";
const InternalMessageHTML = /* @__PURE__ */ defineComponent({
  name: "IBizInternalMessageHTML",
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
    close: () => true
  },
  setup(props) {
    const ns = useNamespace("internal-message-html");
    const msgContent = computed(() => {
      return parseHtml(props.message.content);
    });
    return {
      ns,
      msgContent
    };
  },
  render() {
    return createVNode(resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "onClose": () => this.$emit("close")
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.e("content"),
        "innerHTML": this.msgContent
      }, null)]
    });
  }
});

export { InternalMessageHTML };
