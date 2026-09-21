import { defineComponent, createVNode, resolveComponent, ref, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { getInternalMessageProvider } from '@ibiz-template/runtime';
import '../../../../util/index.mjs';
import './internal-message-group.css';
import { parseHtml } from '../../../../util/wang-editor-util/wang-editor-util.mjs';

"use strict";
const InternalMessagGroup = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("internal-message-group");
    const isExpand = ref(false);
    const onExpandChange = () => {
      isExpand.value = !isExpand.value;
    };
    const html = computed(() => {
      const {
        content_type,
        content
      } = props.message;
      if (content_type === "JSON")
        return content ? JSON.parse(content).html : content;
      if (content === "HTML")
        return parseHtml(content);
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("content")
    }, [createVNode("div", {
      "innerHTML": this.html,
      "onClick": this.onClick,
      "class": this.ns.em("content", "html")
    }, null), createVNode("div", {
      "class": this.ns.e("action")
    }, [createVNode("ion-icon", {
      "class": this.ns.em("action", "item"),
      "title": showTitle(this.isExpand ? ibiz.i18n.t("panelComponent.userMessage.internalMessageGroup.collapse") : ibiz.i18n.t("panelComponent.userMessage.internalMessageGroup.expand")),
      "name": this.isExpand ? "chevron-down-outline" : "chevron-forward-outline",
      "onClick": this.onExpandChange
    }, null), createVNode(resolveComponent("iBizBadge"), {
      "class": this.ns.e("badge"),
      "value": (_a = this.message.children) == null ? void 0 : _a.length
    }, null), createVNode(resolveComponent("iBizIcon"), {
      "baseDir": "iconfont",
      "icon": {
        imagePath: "svg/read.svg"
      },
      "class": [this.ns.em("action", "item"), this.ns.em("action", "read")],
      "title": showTitle(ibiz.i18n.t("panelComponent.userMessage.internalMessageContainer.markAsRead")),
      "onClick": () => this.onRead(this.message)
    }, null)])]), this.isExpand && createVNode("div", {
      "class": this.ns.e("children")
    }, [(_b = this.message.children) == null ? void 0 : _b.map((msg) => {
      let provider;
      try {
        provider = getInternalMessageProvider(msg);
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
      return createVNode("div", {
        "class": this.ns.em("children", "item")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.noSupportType", {
        type: msg.content_type
      })]);
    })])]);
  }
});

export { InternalMessagGroup };
