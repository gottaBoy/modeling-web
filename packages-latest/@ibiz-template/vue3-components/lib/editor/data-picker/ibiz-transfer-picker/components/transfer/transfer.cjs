'use strict';

var vue = require('vue');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var transferUtil = require('./transfer-util.cjs');
var _interface = require('./interface.cjs');
var transferPanel = require('../transfer-panel/transfer-panel.cjs');
var icon = require('./icon.cjs');
require('./transfer.css');

"use strict";
const TransferSelect = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTransfer",
  props: _interface.transferProps,
  emits: _interface.transferEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("transfer");
    const checkedState = vue.reactive({
      leftChecked: [],
      rightChecked: []
    });
    const propsAlias = transferUtil.usePropsAlias(props);
    const {
      sourceData,
      targetData
    } = transferUtil.useComputedData(props);
    const {
      onSourceCheckedChange,
      onTargetCheckedChange
    } = transferUtil.useCheckedChange(checkedState, emit);
    const {
      addToLeft,
      addToRight
    } = transferUtil.useMove(props, checkedState, emit);
    const leftPanel = vue.ref();
    const rightPanel = vue.ref();
    const clearQuery = (which) => {
      switch (which) {
        case "left":
          leftPanel.value.query = "";
          break;
        case "right":
          rightPanel.value.query = "";
          break;
        default:
          break;
      }
    };
    const onLeftAcSearch = (query) => {
      emit("leftAcSearch", query);
    };
    const hasButtonTexts = vue.computed(() => props.buttonTexts.length === 2);
    const leftPanelTitle = vue.computed(() => props.titles[0] || "\u53EF\u9009\u5217\u8868");
    const rightPanelTitle = vue.computed(() => props.titles[1] || "\u5DF2\u9009\u5217\u8868");
    const panelFilterPlaceholder = vue.computed(() => props.filterPlaceholder || "\u8BF7\u8F93\u5165");
    const optionRender = vue.computed(() => (option) => {
      var _a;
      if (props.renderContent)
        return props.renderContent(vue.h, option);
      const defaultSlotVNodes = (((_a = slots.default) == null ? void 0 : _a.call(slots, {
        option
      })) || []).filter((node) => node.type !== Comment);
      if (defaultSlotVNodes.length) {
        return defaultSlotVNodes;
      }
      return vue.h("span", option[propsAlias.value.label] || option[propsAlias.value.key]);
    });
    return {
      ns,
      leftPanel,
      sourceData,
      rightPanel,
      targetData,
      optionRender,
      checkedState,
      hasButtonTexts,
      leftPanelTitle,
      rightPanelTitle,
      panelFilterPlaceholder,
      addToLeft,
      addToRight,
      clearQuery,
      onLeftAcSearch,
      onSourceCheckedChange,
      onTargetCheckedChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(transferPanel.TransferPanel, {
      "ref": "leftPanel",
      "data": this.sourceData,
      "readonly": this.readonly,
      "optionRender": this.optionRender,
      "placeholder": this.panelFilterPlaceholder,
      "title": this.leftPanelTitle,
      "filterable": this.filterable,
      "format": this.format,
      "enableAcSearch": this.enableRemoteSearch,
      "loading": this.loading,
      "filterMethod": this.filterMethod,
      "defaultChecked": this.leftDefaultChecked,
      "onAcSearch": this.onLeftAcSearch,
      "props": this.props,
      "onCheckedChange": this.onSourceCheckedChange
    }, null), vue.createVNode("div", {
      "class": this.ns.e("buttons")
    }, [vue.createVNode(vue.resolveComponent("el-button"), {
      "class": [this.ns.e("button"), this.ns.is("with-texts", this.hasButtonTexts)],
      "type": "primary",
      "disabled": !!ramda.isEmpty(this.checkedState.rightChecked) || this.readonly,
      "onClick": this.addToLeft
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("el-icon"), null, {
        default: () => icon.arrowLeft()
      }), this.buttonTexts[0] !== void 0 ? vue.createVNode("span", null, [this.buttonTexts[0]]) : null]
    }), vue.createVNode(vue.resolveComponent("el-button"), {
      "class": [this.ns.e("button"), this.ns.is("with-texts", this.hasButtonTexts)],
      "type": "primary",
      "disabled": !!ramda.isEmpty(this.checkedState.leftChecked) || this.readonly,
      "onClick": this.addToRight
    }, {
      default: () => [this.buttonTexts[1] !== void 0 ? vue.createVNode("span", null, [this.buttonTexts[1]]) : null, vue.createVNode(vue.resolveComponent("el-icon"), null, {
        default: () => icon.arrowRight()
      })]
    })]), vue.createVNode(transferPanel.TransferPanel, {
      "ref": "rightPanel",
      "data": this.targetData,
      "readonly": this.readonly,
      "optionRender": this.optionRender,
      "placeholder": this.panelFilterPlaceholder,
      "filterable": this.filterable,
      "format": this.format,
      "filterMethod": this.filterMethod,
      "title": this.rightPanelTitle,
      "defaultChecked": this.rightDefaultChecked,
      "props": this.props,
      "onCheckedChange": this.onTargetCheckedChange
    }, null)]);
  }
});

exports.TransferSelect = TransferSelect;
