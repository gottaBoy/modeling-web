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
    /**
     * @description 报表模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 不默认加载数据
     * @default false
     */
    noLoadDefault: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const c = vue3Util.useControlController((...args) => new runtime.ReportPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const renderContent = () => {
      var _a;
      switch ((_a = c.model.appDEReport) == null ? void 0 : _a.reportType) {
        case "USER":
          return vue.createVNode(vue.resolveComponent("iBizUserReportPanel"), {
            "controller": c,
            "class": semanticClass("content"),
            "style": semanticStyle("content")
          }, null);
        case "USER2":
          return vue.createVNode(vue.resolveComponent("iBizUser2ReportPanel"), {
            "controller": c,
            "class": semanticClass("content"),
            "style": semanticStyle("content")
          }, null);
        case "SYSBIREPORT":
        case "DESYSBIREPORTS":
        case "SYSBICUBE":
        case "DESYSBICUBES":
        case "ALLSYSBICUBES":
        case "SYSBICUBEREPORTS":
        case "ALLSYSBIREPORTS":
          if (c.isBIReportDesign)
            return vue.createVNode(vue.resolveComponent("iBizBIReportPanel"), {
              "controller": c,
              "class": semanticClass("content"),
              "style": semanticStyle("content")
            }, null);
          return vue.createVNode(vue.resolveComponent("iBizBIReport"), {
            "controller": c,
            "class": semanticClass("content"),
            "style": semanticStyle("content")
          }, null);
        default:
          return vue.createVNode("div", null, [ibiz.i18n.t("control.reportPanel.unrealized")]);
      }
    };
    return {
      c,
      ns,
      semanticClass,
      semanticStyle,
      renderContent
    };
  },
  render() {
    let _slot;
    if (!this.c.state.isCreated)
      return;
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, _isSlot(_slot = this.renderContent()) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.ReportPanelControl = ReportPanelControl;
