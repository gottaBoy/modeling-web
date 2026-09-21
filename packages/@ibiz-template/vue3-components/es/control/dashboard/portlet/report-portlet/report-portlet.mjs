import { isVNode, defineComponent, computed, onMounted, onBeforeUnmount, createVNode, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ReportPortletController, ControlType } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ReportPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizReportPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ReportPortletController,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const report = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === ControlType.REPORT_PANEL;
    });
    const linkAction = computed(() => {
      const {
        uiactionGroupDetails = []
      } = props.controller.model.uiactionGroup || {};
      return uiactionGroupDetails.find((x) => x.uiactionId && x.uiactionId.startsWith("bi_report_view"));
    });
    let timerTag;
    onMounted(() => {
      const timer = props.controller.model.timer;
      if (timer && timer > 0) {
        timerTag = setInterval(() => {
          props.controller.refresh();
        }, timer);
      }
    });
    onBeforeUnmount(() => {
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
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "linkAction": this.linkAction,
      "class": classArr
    }, _isSlot(_slot = h(resolveComponent("IBizControlShell"), {
      context,
      params,
      modelData: this.report
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ReportPortlet };
