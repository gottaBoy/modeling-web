'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ListPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizListPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.ListPortletController,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.dashboard);
    const list = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === runtime.ControlType.LIST;
    });
    let timerTag;
    vue.onMounted(() => {
      const timer = props.controller.model.timer;
      if (timer && timer > 0) {
        timerTag = setInterval(() => {
          props.controller.refresh();
        }, timer);
      }
    });
    vue.onBeforeUnmount(() => {
      clearInterval(timerTag);
    });
    return {
      ns,
      list,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    const {
      context,
      params
    } = this.controller;
    return vue.createVNode(vue.resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, _isSlot(_slot = vue.h(vue.resolveComponent("IBizControlShell"), {
      class: this.semanticClass("portlet.list", {
        list: this.controller
      }),
      style: this.semanticStyle("portlet.list", {
        list: this.controller
      }),
      context,
      params,
      modelData: this.list
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.ListPortlet = ListPortlet;
