'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./internal-message-html.css');
require('../../../../util/index.cjs');
var wangEditorUtil = require('../../../../util/wang-editor-util/wang-editor-util.cjs');

"use strict";
const InternalMessageHTML = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("internal-message-html");
    const msgContent = vue.computed(() => {
      return wangEditorUtil.parseHtml(props.message.content);
    });
    return {
      ns,
      msgContent
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "onClose": () => this.$emit("close")
    }, {
      default: () => [vue.createVNode("div", {
        "class": this.ns.e("content"),
        "innerHTML": this.msgContent
      }, null)]
    });
  }
});

exports.InternalMessageHTML = InternalMessageHTML;
