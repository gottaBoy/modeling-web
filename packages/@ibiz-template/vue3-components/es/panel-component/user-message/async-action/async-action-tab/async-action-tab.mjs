import { defineComponent, ref, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getAsyncActionProvider } from '@ibiz-template/runtime';
import './async-action-tab.css';
import { clone } from '@ibiz-template/core';

"use strict";
const AsyncActionTab = /* @__PURE__ */ defineComponent({
  name: "IBizAsyncActionTab",
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
    const ns = useNamespace("async-action-tab");
    const c = props.controller;
    const allItems = ref([]);
    const updateData = () => {
      allItems.value = clone(c.actions);
    };
    updateData();
    c.evt.on("dataChange", updateData);
    const hiddenPopover = () => {
      emit("hiddenPopover");
    };
    return {
      ns,
      allItems,
      hiddenPopover
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [this.allItems.length > 0 && this.allItems.map((msg) => {
      let provider;
      try {
        provider = getAsyncActionProvider(msg);
      } catch (error) {
        ibiz.log.error(error);
      }
      if (provider) {
        return provider.render({
          class: this.ns.e("item"),
          action: msg,
          onClose: this.hiddenPopover
        });
      }
      return createVNode("div", {
        "class": this.ns.e("item")
      }, [ibiz.i18n.t("panelComponent.userMessage.asyncActionTab.noSupportType", {
        type: msg.actiontype
      })]);
    }), this.allItems.length === 0 && createVNode("div", {
      "class": this.ns.e("nodata")
    }, [ibiz.i18n.t("panelComponent.userMessage.asyncActionTab.noAsyncAction")])]);
  }
});

export { AsyncActionTab };
