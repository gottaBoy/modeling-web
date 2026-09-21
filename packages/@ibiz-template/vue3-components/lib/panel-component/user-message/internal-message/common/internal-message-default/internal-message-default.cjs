'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./internal-message-default.css');

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
const InternalMessageDefault = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("internal-message");
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
    const content = vue.createVNode("div", {
      "class": this.ns.e("short-content")
    }, [msgContent]);
    return vue.createVNode(vue.resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "onClose": () => this.$emit("close")
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.b("left")
      }, [vue.createVNode("ion-icon", {
        "name": "list-outline"
      }, null)]), vue.createVNode("div", {
        "class": this.ns.b("center")
      }, [vue.createVNode("div", {
        "class": this.ns.e("caption")
      }, [vue.createVNode(vue.resolveComponent("el-tag"), {
        "class": this.ns.e("status"),
        "type": stateType[status]
      }, {
        default: () => [stateTexts[status]]
      }), title]), content, vue.createVNode("div", {
        "class": this.ns.e("create-time")
      }, [create_time])])]
    });
  }
});

exports.InternalMessageDefault = InternalMessageDefault;
