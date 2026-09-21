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
    toolbarItems: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    toolbarClick: (_key) => true,
    close: () => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("internal-message-container");
    const isUnread = vue.computed(() => {
      return props.message.status === "RECEIVED";
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
        ibiz.hub.notice.internalMessage.markRead(props.message);
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
        if (isClose) {
          emit("close");
        }
      }
    };
    return {
      ns,
      isUnread,
      isClickable,
      finalToolbarItems,
      onToolbarClick,
      onClick
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
    }, null), this.isClickable && vue.createVNode("ion-icon", {
      "class": this.ns.e("click-tag"),
      "name": "chevron-forward-outline"
    }, null)]);
  }
});

exports.InternalMessageContainer = InternalMessageContainer;
