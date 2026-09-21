'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
require('../../../../util/index.cjs');
require('./internal-message-group.css');
var wangEditorUtil = require('../../../../util/wang-editor-util/wang-editor-util.cjs');

"use strict";
const InternalMessagGroup = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInternalMessageGroup",
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
    close: (_msg) => true,
    read: (_msg) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("internal-message-group");
    const isExpand = vue.ref(false);
    const onExpandChange = () => {
      isExpand.value = !isExpand.value;
    };
    const html = vue.computed(() => {
      const {
        content_type,
        content
      } = props.message;
      if (content_type === "JSON")
        return content ? JSON.parse(content).html : content;
      if (content === "HTML")
        return wangEditorUtil.parseHtml(content);
      return content;
    });
    const onClose = (msg) => {
      emit("close", msg);
    };
    const onRead = (msg) => {
      emit("read", msg);
    };
    const onClick = async (event) => {
      if (props.provider.onClick) {
        const isClose = await props.provider.onClick(props.message, event);
        if (isClose)
          onClose();
      }
    };
    return {
      ns,
      html,
      isExpand,
      onRead,
      onClose,
      onClick,
      onExpandChange
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [vue.createVNode("div", {
      "innerHTML": this.html,
      "onClick": this.onClick,
      "class": this.ns.em("content", "html")
    }, null), vue.createVNode("div", {
      "class": this.ns.e("action")
    }, [vue.createVNode("ion-icon", {
      "class": this.ns.em("action", "item"),
      "title": core.showTitle(this.isExpand ? ibiz.i18n.t("panelComponent.userMessage.internalMessageGroup.collapse") : ibiz.i18n.t("panelComponent.userMessage.internalMessageGroup.expand")),
      "name": this.isExpand ? "chevron-down-outline" : "chevron-forward-outline",
      "onClick": this.onExpandChange
    }, null), vue.createVNode(vue.resolveComponent("iBizBadge"), {
      "class": this.ns.e("badge"),
      "value": (_a = this.message.children) == null ? void 0 : _a.length
    }, null), vue.createVNode(vue.resolveComponent("iBizIcon"), {
      "baseDir": "iconfont",
      "icon": {
        imagePath: "svg/read.svg"
      },
      "class": [this.ns.em("action", "item"), this.ns.em("action", "read")],
      "title": core.showTitle(ibiz.i18n.t("panelComponent.userMessage.internalMessageContainer.markAsRead")),
      "onClick": () => this.onRead(this.message)
    }, null)])]), this.isExpand && vue.createVNode("div", {
      "class": this.ns.e("children")
    }, [(_b = this.message.children) == null ? void 0 : _b.map((msg) => {
      let provider;
      try {
        provider = runtime.getInternalMessageProvider(msg);
      } catch (error) {
        ibiz.log.error(error);
      }
      if (provider)
        return provider.render({
          message: msg,
          class: this.ns.em("children", "item"),
          onClose: () => this.onClose(msg),
          onRead: () => this.onRead(msg)
        });
      return vue.createVNode("div", {
        "class": this.ns.em("children", "item")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.noSupportType", {
        type: msg.content_type
      })]);
    })])]);
  }
});

exports.InternalMessagGroup = InternalMessagGroup;
