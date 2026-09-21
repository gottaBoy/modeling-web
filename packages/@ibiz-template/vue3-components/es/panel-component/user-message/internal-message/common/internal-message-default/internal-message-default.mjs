import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './internal-message-default.css';

"use strict";
const stateTexts = {
  READ: "\u5DF2\u9605\u8BFB",
  SENT: "\u5DF2\u53D1\u9001",
  RECEIVED: "\u5DF2\u63A5\u6536",
  REPLIED: "\u5DF2\u56DE\u590D",
  SEND_FAILED: "\u53D1\u9001\u5931\u8D25",
  NOT_SENT: "\u672A\u53D1\u9001",
  DELETED: "\u5DF2\u5220\u9664"
};
const stateType = {
  READ: "",
  SENT: "success",
  RECEIVED: "success",
  REPLIED: "warning",
  SEND_FAILED: "danger",
  NOT_SENT: "info",
  DELETED: "info"
};
const InternalMessageDefault = /* @__PURE__ */ defineComponent({
  name: "IBizInternalMessageDefault",
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
  setup() {
    const ns = useNamespace("internal-message");
    return {
      ns
    };
  },
  render() {
    const {
      title,
      create_time,
      content: msgContent,
      status
    } = this.message;
    const content = createVNode("div", {
      "class": this.ns.e("short-content")
    }, [msgContent]);
    return createVNode(resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "onClose": () => this.$emit("close")
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.b("left")
      }, [createVNode("ion-icon", {
        "name": "list-outline"
      }, null)]), createVNode("div", {
        "class": this.ns.b("center")
      }, [createVNode("div", {
        "class": this.ns.e("caption")
      }, [createVNode(resolveComponent("el-tag"), {
        "class": this.ns.e("status"),
        "type": stateType[status]
      }, {
        default: () => [stateTexts[status]]
      }), title]), content, createVNode("div", {
        "class": this.ns.e("create-time")
      }, [create_time])])]
    });
  }
});

export { InternalMessageDefault };
