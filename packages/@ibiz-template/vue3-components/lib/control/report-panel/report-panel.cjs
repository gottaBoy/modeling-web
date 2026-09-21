'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./report-panel.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ReportPanelControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.ReportPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const renderContent = () => {
      const {
        reportType
      } = c.state;
      switch (reportType) {
        case "USER":
          return vue.createVNode(vue.resolveComponent("iBizUserReportPanel"), {
            "controller": c
          }, null);
        case "USER2":
          return vue.createVNode(vue.resolveComponent("iBizUser2ReportPanel"), {
            "controller": c
          }, null);
        case "DESYSBIREPORTS":
        case "SYSBICUBE":
        case "DESYSBICUBES":
        case "ALLSYSBICUBES":
        case "SYSBIREPORT":
        case "SYSBICUBEREPORTS":
        case "ALLSYSBIREPORTS":
          return vue.createVNode(vue.resolveComponent("iBizBIReportPanel"), {
            "controller": c
          }, null);
        default:
          return vue.createVNode("div", null, [ibiz.i18n.t("control.reportPanel.unrealized")]);
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, _isSlot(_slot = this.renderContent()) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.ReportPanelControl = ReportPanelControl;
