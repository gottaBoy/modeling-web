'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ReportPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizReportPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.ReportPortletController,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const report = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === runtime.ControlType.REPORT_PANEL;
    });
    const linkAction = vue.computed(() => {
      const {
        uiactionGroupDetails = []
      } = props.controller.model.uiactionGroup || {};
      return uiactionGroupDetails.find((x) => x.uiactionId && x.uiactionId.startsWith("bi_report_view"));
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
      report,
      linkAction
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
      "linkAction": this.linkAction,
      "class": classArr
    }, _isSlot(_slot = vue.h(vue.resolveComponent("IBizControlShell"), {
      context,
      params,
      modelData: this.report
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.ReportPortlet = ReportPortlet;
