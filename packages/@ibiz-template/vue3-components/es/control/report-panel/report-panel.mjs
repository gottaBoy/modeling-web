import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { ReportPanelController } from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './report-panel.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ReportPanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizReportPanelControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    noLoadDefault: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const c = useControlController((...args) => new ReportPanelController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const renderContent = () => {
      const {
        reportType
      } = c.state;
      switch (reportType) {
        case "USER":
          return createVNode(resolveComponent("iBizUserReportPanel"), {
            "controller": c
          }, null);
        case "USER2":
          return createVNode(resolveComponent("iBizUser2ReportPanel"), {
            "controller": c
          }, null);
        case "DESYSBIREPORTS":
        case "SYSBICUBE":
        case "DESYSBICUBES":
        case "ALLSYSBICUBES":
        case "SYSBIREPORT":
        case "SYSBICUBEREPORTS":
        case "ALLSYSBIREPORTS":
          return createVNode(resolveComponent("iBizBIReportPanel"), {
            "controller": c
          }, null);
        default:
          return createVNode("div", null, [ibiz.i18n.t("control.reportPanel.unrealized")]);
      }
    };
    return {
      c,
      ns,
      renderContent
    };
  },
  render() {
    let _slot;
    if (!this.c.state.isCreated) {
      return;
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, _isSlot(_slot = this.renderContent()) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ReportPanelControl };
