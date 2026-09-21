import { isVNode, defineComponent, createVNode, resolveComponent, createTextVNode, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './internal-message-json.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const InternalMessageJSON = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("internal-message-json");
    const jsonContent = computed(() => {
      if (props.message.content && props.message.content_type === "JSON") {
        return JSON.parse(props.message.content);
      }
      return null;
    });
    const redirectUrl = computed(() => {
      var _a;
      if (props.message.enableLink) {
        const url = ibiz.env.isMob ? props.message.mobile_url : props.message.url;
        return url || ((_a = jsonContent.value) == null ? void 0 : _a.redirecturl);
      }
      return void 0;
    });
    const isWFMessage = computed(() => {
      var _a;
      return (_a = jsonContent.value) == null ? void 0 : _a.todoid;
    });
    const toolbarItems = computed(() => {
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
      content = createVNode("div", {
        "class": this.ns.e("content"),
        "innerHTML": this.jsonContent.html
      }, null);
    } else if ((_b = this.jsonContent) == null ? void 0 : _b.todoid) {
      content = createVNode("div", {
        "class": this.ns.e("content")
      }, [createVNode("div", {
        "class": this.ns.e("card")
      }, [createVNode("div", {
        "class": this.ns.em("card", "avatar")
      }, [this.jsonContent.createmanname.substring(0, 2)]), createVNode("div", {
        "class": this.ns.em("card", "content")
      }, [createVNode("div", {
        "class": [this.ns.e("todo"), this.ns.em("todo", "header")]
      }, [createVNode("span", {
        "class": this.ns.em("todo", "person")
      }, [this.jsonContent.createmanname]), createVNode("span", {
        "class": this.ns.em("todo", "action")
      }, [this.jsonContent.todostate === "ACTIVE" ? ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.todo") : ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.done")])]), createVNode("div", {
        "class": [this.ns.e("todo"), this.ns.em("todo", "content")]
      }, [createVNode("span", {
        "class": this.ns.em("todo", "title")
      }, [this.jsonContent.title]), createVNode("span", {
        "class": this.ns.em("todo", "step")
      }, [this.jsonContent.param05]), createVNode(resolveComponent("el-tag"), {
        "class": this.ns.em("todo", "state")
      }, {
        default: () => [this.jsonContent.todostatetext]
      })]), createVNode("div", {
        "class": [this.ns.e("todo"), this.ns.em("todo", "footer")]
      }, [createVNode("span", {
        "class": this.ns.em("todo", "date")
      }, [this.jsonContent.todostate === "ACTIVE" ? this.jsonContent.createdate : this.jsonContent.processdate]), createVNode("span", {
        "class": this.ns.em("todo", "separate")
      }, [createTextVNode("\xB7")]), createVNode("span", {
        "class": this.ns.em("todo", "name")
      }, [this.jsonContent.param04])])])])]);
    } else {
      content = createVNode("div", {
        "class": this.ns.e("content")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageJson.missingHtml")]);
    }
    return createVNode(resolveComponent("iBizInternalMessageContainer"), {
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

export { InternalMessageJSON };
