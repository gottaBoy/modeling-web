import { defineComponent, createVNode, resolveComponent, ref, watch, reactive, onUnmounted, onMounted } from 'vue';
import dayjs from 'dayjs';
import { clone } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getInternalMessageProvider } from '@ibiz-template/runtime';
import './internal-message-tab.css';

"use strict";
const InternalMessageTab = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("internal-message-tab");
    const hiddenPopover = () => {
      emit("hiddenPopover");
    };
    const onMarkRead = async (message, filter) => {
      var _a2;
      if ((_a2 = message.children) == null ? void 0 : _a2.length) {
        await Promise.all(message.children.filter((child) => child.id !== (filter == null ? void 0 : filter.id)).map((child) => ibiz.hub.notice.internalMessage.markRead(child)));
      } else {
        await ibiz.hub.notice.internalMessage.markRead(message);
      }
    };
    const onGroupClose = async (message, filter) => {
      hiddenPopover();
      await onMarkRead(message, filter);
    };
    const c = props.controller;
    const unreadOnlyTag = "".concat((_a = ibiz.appData) == null ? void 0 : _a.context.srfsystemid, "-unreadOnly");
    const hasNotice = ref(false);
    ibiz.mc.command.internalMessage.on(async (msg) => {
      ibiz.log.debug("mqtt internalMessage: ", msg);
      if (msg.subtype === "INTERNALMESSAGE") {
        hasNotice.value = true;
      }
    });
    watch(() => props.showPopover, (newVal) => {
      if (newVal && hasNotice.value) {
        c.load();
        c.refreshUnreadCount();
        hasNotice.value = false;
      }
    });
    const allItems = ref([]);
    const messages = ref([]);
    const state = reactive({
      total: 0,
      pageSize: 0,
      unreadOnly: c.unreadOnly
    });
    const handleMessageGroup = () => {
      const grouped = {};
      const ungrouped = [];
      allItems.value.forEach((item) => {
        const url = ibiz.env.isMob ? item.mobile_url : item.url;
        const key = "".concat(item.message_type).concat(url);
        const shouldGroup = key && item.status === "RECEIVED" && item.message_type !== "TodoNotify";
        if (shouldGroup) {
          if (!grouped[key])
            grouped[key] = [];
          grouped[key].push({
            ...item
          });
        } else {
          ungrouped.push({
            ...item
          });
        }
      });
      const finalResult = [...ungrouped];
      Object.values(grouped).forEach((group) => {
        if (group.length === 1) {
          finalResult.push({
            ...group[0]
          });
        } else {
          const parent = {
            ...group[0]
          };
          parent.children = group.map((item) => ({
            ...item
          }));
          finalResult.push(parent);
        }
      });
      finalResult.sort((a, b) => {
        return dayjs(a.update_time).isAfter(b.update_time) ? -1 : 1;
      });
      const todoNotifySeen = /* @__PURE__ */ new Set();
      finalResult.filter((msg) => msg.message_type === "TodoNotify" && msg.content_type === "JSON").forEach((msg) => {
        try {
          const data = JSON.parse(msg.content);
          const key = "".concat(data.bizkey, "_").concat(data.param02);
          if (data.todoid && !todoNotifySeen.has(key)) {
            msg.enableLink = true;
            todoNotifySeen.add(key);
          }
        } catch (error) {
          ibiz.log.error(error);
        }
      });
      messages.value = finalResult;
    };
    const updateData = () => {
      state.total = c.total;
      state.pageSize = c.size;
      allItems.value = clone(c.messages);
      handleMessageGroup();
    };
    updateData();
    const updateUnreadOnlyChange = (val) => {
      state.unreadOnly = val;
    };
    c.evt.on("dataChange", updateData);
    c.evt.on("unreadOnlyChange", updateUnreadOnlyChange);
    onUnmounted(() => {
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
    onMounted(() => {
      initUnreadOnly();
      c.load();
    });
    return {
      ns,
      state,
      allItems,
      messages,
      showMore,
      onMarkRead,
      onGroupClose,
      switchChange,
      hiddenPopover
    };
  },
  render() {
    const restLength = this.state.total - this.allItems.length;
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [createVNode("div", {
      "class": this.ns.b("content")
    }, [this.allItems.length > 0 && this.messages.map((msg) => {
      var _a;
      let provider;
      try {
        provider = getInternalMessageProvider(msg);
      } catch (error) {
        ibiz.log.error(error);
      }
      if (provider)
        return ((_a = msg.children) == null ? void 0 : _a.length) ? createVNode(resolveComponent("iBizInternalMessageGroup"), {
          "message": msg,
          "provider": provider,
          "class": this.ns.e("group"),
          "onRead": this.onMarkRead,
          "onClose": (filter) => this.onGroupClose(msg, filter)
        }, null) : provider.render({
          message: msg,
          class: this.ns.e("item"),
          onClose: this.hiddenPopover,
          onRead: () => this.onMarkRead(msg)
        });
      return createVNode("div", {
        "class": this.ns.e("item")
      }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.noSupportType", {
        type: msg.content_type
      })]);
    }), this.allItems.length === 0 && createVNode("div", {
      "class": this.ns.e("nodata")
    }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.notificationYet")]), restLength > 0 && createVNode("div", {
      "class": this.ns.e("load-more"),
      "onClick": this.showMore
    }, [ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.loadMore", {
      length: restLength
    })])]), createVNode("div", {
      "class": this.ns.b("footer")
    }, [createVNode(resolveComponent("el-switch"), {
      "value": this.state.unreadOnly,
      "onChange": this.switchChange,
      "class": this.ns.be("footer", "switch")
    }, null), ibiz.i18n.t("panelComponent.userMessage.internalMessageTab.onlyShowUnread")])]);
  }
});

export { InternalMessageTab };
