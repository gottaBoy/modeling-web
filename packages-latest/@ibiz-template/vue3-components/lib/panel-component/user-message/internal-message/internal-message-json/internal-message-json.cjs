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
    close: () => true,
    read: () => true
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
      if (props.message.enableLink) {
        const url = ibiz.env.isMob ? props.message.mobile_url : props.message.url;
        return url || ((_a = jsonContent.value) == null ? void 0 : _a.redirecturl);
      }
      return void 0;
    });
    const isWFMessage = vue.computed(() => {
      var _a;
      return (_a = jsonContent.value) == null ? void 0 : _a.todoid;
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
      redirectUrl,
      isWFMessage,
      jsonContent,
      toolbarItems,
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
        "class": this.ns.e("card")
      }, [vue.createVNode("div", {
        "class": this.ns.em("card", "avatar")
      }, [this.jsonContent.createmanname.substring(0, 2)]), vue.createVNode("div", {
        "class": this.ns.em("card", "content")
      }, [vue.createVNode("div", {
        "class": [this.ns.e("todo"), this.ns.em("todo", "header")]
      }, [vue.createVNode("span", {
        "class": this.ns.em("todo", "person")
      }, [this.jsonContent.createmanname]), vue.createVNode("span", {
        "class": this.ns.em("todo", "action")
      }, [this.jsonContent.todostate === "ACTIVE" ? ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.todo") : ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.done")])]), vue.createVNode("div", {
        "class": [this.ns.e("todo"), this.ns.em("todo", "content")]
      }, [vue.createVNode("span", {
        "class": this.ns.em("todo", "title")
      }, [this.jsonContent.title]), vue.createVNode("span", {
        "class": this.ns.em("todo", "step")
      }, [this.jsonContent.param05]), vue.createVNode(vue.resolveComponent("el-tag"), {
        "class": this.ns.em("todo", "state")
      }, {
        default: () => [this.jsonContent.todostatetext]
      })]), vue.createVNode("div", {
        "class": [this.ns.e("todo"), this.ns.em("todo", "footer")]
      }, [vue.createVNode("span", {
        "class": this.ns.em("todo", "date")
      }, [this.jsonContent.todostate === "ACTIVE" ? this.jsonContent.createdate : this.jsonContent.processdate]), vue.createVNode("span", {
        "class": this.ns.em("todo", "separate")
      }, [vue.createTextVNode("\xB7")]), vue.createVNode("span", {
        "class": this.ns.em("todo", "name")
      }, [this.jsonContent.param04])])])])]);
    } else {
      content = vue.createVNode("div", {
        "class": this.ns.e("content")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.missingHtml")]);
    }
    return vue.createVNode(vue.resolveComponent("iBizInternalMessageContainer"), {
      "class": [this.ns.b()],
      "message": this.message,
      "provider": this.provider,
      "clickable": !!this.redirectUrl || !!this.isWFMessage && !!this.message.enableLink,
      "isUnread": !!this.message.enableLink,
      "toolbarItems": this.toolbarItems,
      "onToolbarClick": this.onToolbarClick,
      "onRead": () => this.$emit("read"),
      "onClose": () => this.$emit("close")
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

exports.InternalMessageJSON = InternalMessageJSON;
