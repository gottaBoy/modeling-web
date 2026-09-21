'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
require('./internal-message-container.css');

"use strict";
const InternalMessageContainer = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInternalMessageContainer",
  props: {
    message: {
      type: Object,
      required: true
    },
    provider: {
      type: Object,
      required: true
    },
    clickable: {
      type: Boolean,
      default: void 0
    },
    isUnread: {
      type: Boolean,
      default: true
    },
    toolbarItems: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    toolbarClick: (_key) => true,
    close: () => true,
    read: () => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("internal-message-container");
    const isUnread = vue.computed(() => {
      return props.isUnread && props.message.status === "RECEIVED";
    });
    const finalToolbarItems = vue.computed(() => {
      const toolbarItems = [...props.toolbarItems];
      if (isUnread.value) {
        toolbarItems.push({
          key: "read",
          icon: "checkmark-done-outline",
          tooltip: ibiz.i18n.t("panelComponent.userMessage.internalMessageContainer.markAsRead")
        });
      }
      return toolbarItems;
    });
    const onToolbarClick = (event, key) => {
      event.stopPropagation();
      if (key === "read") {
        emit("read");
      } else {
        emit("toolbarClick", key);
      }
    };
    const isClickable = vue.computed(() => {
      if (props.clickable === void 0) {
        return ibiz.env.isMob ? !!props.message.mobile_url : !!props.message.url;
      }
      return props.clickable;
    });
    const onClick = async (event) => {
      if (isClickable.value && props.provider.onClick) {
        const isClose = await props.provider.onClick(props.message, event);
        if (isClose)
          emit("close");
      }
      emit("read");
    };
    return {
      ns,
      isUnread,
      isClickable,
      finalToolbarItems,
      onClick,
      onToolbarClick
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.isClickable ? this.ns.m("clickable") : "", this.isUnread ? this.ns.m("unread") : ""],
      "onClick": this.onClick
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a), vue.createVNode("div", {
      "class": this.ns.b("toolbar")
    }, [this.finalToolbarItems.map((item) => {
      return vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": this.ns.be("toolbar", "button"),
        "icon": {
          imagePath: "svg/read.svg"
        },
        "baseDir": "iconfont",
        "title": core.showTitle(item.tooltip),
        "onClick": (e) => this.onToolbarClick(e, item.key)
      }, null);
    })]), vue.createVNode("div", {
      "class": this.ns.e("unread-tag")
    }, null), this.isClickable && vue.createVNode("svg", {
      "class": this.ns.e("click-tag"),
      "viewBox": "0 0 1024 1024",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "p-id": "1618",
      "width": "14",
      "height": "14",
      "fill": "currentColor"
    }, [vue.createVNode("path", {
      "d": "M256 258.133333c0-21.333333 14.933333-38.4 34.133333-42.666666H765.866667c23.466667 0 42.666667 19.2 42.666666 42.666666L810.666667 725.333333c0 10.666667-4.266667 21.333333-12.8 29.866667-8.533333 8.533333-19.2 12.8-29.866667 12.8-10.666667 0-21.333333-4.266667-29.866667-12.8-8.533333-8.533333-12.8-19.2-12.8-29.866667V360.533333L288 795.733333c-17.066667 17.066667-42.666667 17.066667-59.733333 0-17.066667-17.066667-17.066667-42.666667 0-59.733333l435.2-435.2H298.666667c-21.333333 0-38.4-14.933333-42.666667-34.133333v-8.533334z",
      "p-id": "1619"
    }, null)])]);
  }
});

exports.InternalMessageContainer = InternalMessageContainer;
