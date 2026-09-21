'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ChartPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizChartPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.ChartPortletController,
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
    const chart = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === runtime.ControlType.CHART;
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
      chart,
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
      context,
      params,
      modelData: this.chart,
      class: this.semanticClass("portlet.chart", {
        chart: this.controller
      }),
      style: this.semanticStyle("portlet.chart", {
        chart: this.controller
      })
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.ChartPortlet = ChartPortlet;
