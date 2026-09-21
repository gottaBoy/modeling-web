'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ViewPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizViewPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.ViewPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.dashboard);
    const view = props.modelData.portletAppView;
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
      view,
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
    }, _isSlot(_slot = vue.h(vue.resolveComponent("IBizViewShell"), {
      class: this.semanticClass("portlet.view", {
        view: this.controller
      }),
      style: this.semanticStyle("portlet.view", {
        view: this.controller
      }),
      context,
      params,
      modelData: this.view
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.ViewPortlet = ViewPortlet;
