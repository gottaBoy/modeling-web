'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./internal-message-json.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const InternalMessageJSON = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInternalMessageJSON",
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
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("internal-message-json");
    const jsonContent = vue.computed(() => {
      if (props.message.content && props.message.content_type === "JSON") {
        return JSON.parse(props.message.content);
      }
      return null;
    });
    const redirectUrl = vue.computed(() => {
      var _a;
      const url = ibiz.env.isMob ? props.message.mobile_url : props.message.url;
      return url || ((_a = jsonContent.value) == null ? void 0 : _a.redirecturl);
    });
    const toolbarItems = vue.computed(() => {
      if (!redirectUrl.value) {
        return void 0;
      }
      return [{
        icon: "link-outline",
        key: "openRedirectView",
        tooltip: ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.jumpToView")
      }];
    });
    const onToolbarClick = (key) => {
      if (key === "openRedirectView") {
        props.provider.openRedirectView(props.message, redirectUrl.value);
        emit("close");
      }
    };
    return {
      ns,
      jsonContent,
      toolbarItems,
      redirectUrl,
      onToolbarClick
    };
  },
  render() {
    var _a, _b;
    let content = null;
    if ((_a = this.jsonContent) == null ? void 0 : _a.html) {
      content = vue.createVNode("div", {
        "class": this.ns.e("content"),
        "innerHTML": this.jsonContent.html
      }, null);
    } else if ((_b = this.jsonContent) == null ? void 0 : _b.todoid) {
      content = vue.createVNode("div", {
        "class": this.ns.e("content")
      }, [vue.createVNode("div", {
        "class": this.ns.b("todo")
      }, [vue.createVNode("div", {
        "class": this.ns.e("header")
      }, [vue.createVNode("div", {
        "class": this.ns.e("title")
      }, ["".concat(this.jsonContent.title).concat(this.jsonContent.param05)]), vue.createVNode("div", {
        "class": this.ns.e("state")
      }, [vue.createVNode(vue.resolveComponent("el-tag"), null, {
        default: () => [this.jsonContent.todostatetext]
      })])]), vue.createVNode("div", {
        "class": this.ns.e("content")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.todoContent", {
        createmanname: this.jsonContent.createmanname,
        processdate: this.jsonContent.processdate
      })])])]);
    } else {
      content = vue.createVNode("div", {
        "class": this.ns.e("content")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.missingHtml")]);
    }
    return vue.createVNode(vue.resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "clickable": !!this.redirectUrl,
      "toolbarItems": this.toolbarItems,
      "onToolbarClick": this.onToolbarClick,
      "onClose": () => this.$emit("close")
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

exports.InternalMessageJSON = InternalMessageJSON;
