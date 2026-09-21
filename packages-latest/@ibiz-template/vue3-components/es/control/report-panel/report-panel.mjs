import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { ReportPanelController } from '@ibiz-template/runtime';
import { useControlController, useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './report-panel.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ReportPanelControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new ReportPanelController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const renderContent = () => {
      var _a;
      switch ((_a = c.model.appDEReport) == null ? void 0 : _a.reportType) {
        case "USER":
          return createVNode(resolveComponent("iBizUserReportPanel"), {
            "controller": c,
            "class": semanticClass("content"),
            "style": semanticStyle("content")
          }, null);
        case "USER2":
          return createVNode(resolveComponent("iBizUser2ReportPanel"), {
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
            return createVNode(resolveComponent("iBizBIReportPanel"), {
              "controller": c,
              "class": semanticClass("content"),
              "style": semanticStyle("content")
            }, null);
          return createVNode(resolveComponent("iBizBIReport"), {
            "controller": c,
            "class": semanticClass("content"),
            "style": semanticStyle("content")
          }, null);
        default:
          return createVNode("div", null, [ibiz.i18n.t("control.reportPanel.unrealized")]);
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
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, _isSlot(_slot = this.renderContent()) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ReportPanelControl };
