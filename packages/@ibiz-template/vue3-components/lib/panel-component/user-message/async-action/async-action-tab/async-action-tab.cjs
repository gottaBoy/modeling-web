'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./async-action-tab.css');
var core = require('@ibiz-template/core');

"use strict";
const AsyncActionTab = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("async-action-tab");
    const c = props.controller;
    const allItems = vue.ref([]);
    const updateData = () => {
      allItems.value = core.clone(c.actions);
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
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [this.allItems.length > 0 && this.allItems.map((msg) => {
      let provider;
      try {
        provider = runtime.getAsyncActionProvider(msg);
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
      return vue.createVNode("div", {
        "class": this.ns.e("item")
      }, [ibiz.i18n.t("panelComponent.userMessage.asyncActionTab.noSupportType", {
        type: msg.actiontype
      })]);
    }), this.allItems.length === 0 && vue.createVNode("div", {
      "class": this.ns.e("nodata")
    }, [ibiz.i18n.t("panelComponent.userMessage.asyncActionTab.noAsyncAction")])]);
  }
});

exports.AsyncActionTab = AsyncActionTab;
