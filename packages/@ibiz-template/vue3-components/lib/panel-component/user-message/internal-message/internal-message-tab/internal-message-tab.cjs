'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./internal-message-tab.css');
var ramda = require('ramda');

"use strict";
const InternalMessageTab = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInternalMessageTab",
  props: {
    controller: {
      type: Object,
      required: true
    },
    showPopover: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    hiddenPopover: () => true
  },
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("internal-message-tab");
    const hiddenPopover = () => {
      emit("hiddenPopover");
    };
    const c = props.controller;
    const unreadOnlyTag = "".concat((_a = ibiz.appData) == null ? void 0 : _a.context.srfsystemid, "-unreadOnly");
    const hasNotice = vue.ref(false);
    ibiz.mc.command.internalMessage.on(async (msg) => {
      ibiz.log.debug("mqtt internalMessage: ", msg);
      if (msg.subtype === "INTERNALMESSAGE") {
        hasNotice.value = true;
      }
    });
    vue.watch(() => props.showPopover, (newVal) => {
      if (newVal && hasNotice.value) {
        c.load();
        c.refreshUnreadCount();
        hasNotice.value = false;
      }
    });
    const allItems = vue.ref([]);
    const state = vue.reactive({
      total: 0,
      pageSize: 0,
      unreadOnly: c.unreadOnly
    });
    const updateData = () => {
      allItems.value = ramda.clone(c.messages);
      state.total = c.total;
      state.pageSize = c.size;
    };
    updateData();
    const updateUnreadOnlyChange = (val) => {
      state.unreadOnly = val;
    };
    c.evt.on("dataChange", updateData);
    c.evt.on("unreadOnlyChange", updateUnreadOnlyChange);
    vue.onUnmounted(() => {
      c.evt.off("dataChange", updateData);
      c.evt.off("unreadOnlyChange", updateUnreadOnlyChange);
    });
    const showMore = () => {
      c.loadMore();
    };
    const switchChange = () => {
      c.toggleUnReadOnly();
      localStorage.setItem(unreadOnlyTag, c.unreadOnly.toString());
    };
    const initUnreadOnly = () => {
      const unreadOnlyStr = localStorage.getItem(unreadOnlyTag);
      if (unreadOnlyStr) {
        if (unreadOnlyStr === "true") {
          state.unreadOnly = true;
          c.unreadOnly = true;
        } else {
          state.unreadOnly = false;
          c.unreadOnly = false;
        }
      }
    };
    vue.onMounted(() => {
      initUnreadOnly();
      c.load();
    });
    return {
      ns,
      allItems,
      state,
      hiddenPopover,
      showMore,
      switchChange
    };
  },
  render() {
    const restLength = this.state.total - this.allItems.length;
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [vue.createVNode("div", {
      "class": this.ns.b("content")
    }, [this.allItems.length > 0 && this.allItems.map((msg) => {
      let provider;
      try {
        provider = runtime.getInternalMessageProvider(msg);
      } catch (error) {
        ibiz.log.error(error);
      }
      if (provider) {
        return provider.render({
          class: [this.ns.e("item")],
          message: msg,
          onClose: this.hiddenPopover
        });
      }
      return vue.createVNode("div", {
        "class": this.ns.e("item")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.noSupportType", {
        type: msg.content_type
      })]);
    }), this.allItems.length === 0 && vue.createVNode("div", {
      "class": this.ns.e("nodata")
    }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.notificationYet")]), restLength > 0 && vue.createVNode("div", {
      "class": this.ns.e("load-more"),
      "onClick": this.showMore
    }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.loadMore", {
      length: restLength
    })])]), vue.createVNode("div", {
      "class": this.ns.b("footer")
    }, [vue.createVNode(vue.resolveComponent("el-switch"), {
      "value": this.state.unreadOnly,
      "onChange": this.switchChange,
      "class": this.ns.be("footer", "switch")
    }, null), " ", ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.onlyShowUnread")])]);
  }
});

exports.InternalMessageTab = InternalMessageTab;
