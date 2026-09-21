import { defineComponent, createVNode, resolveComponent, reactive, ref, computed, h } from 'vue';
import { isEmpty } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import { usePropsAlias, useComputedData, useCheckedChange, useMove } from './transfer-util.mjs';
import { transferProps, transferEmits } from './interface.mjs';
import { TransferPanel } from '../transfer-panel/transfer-panel.mjs';
import { arrowLeft, arrowRight } from './icon.mjs';
import './transfer.css';

"use strict";
const TransferSelect = /* @__PURE__ */ defineComponent({
  name: "IBizTransfer",
  props: transferProps,
  emits: transferEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("transfer");
    const checkedState = reactive({
      leftChecked: [],
      rightChecked: []
    });
    const propsAlias = usePropsAlias(props);
    const {
      sourceData,
      targetData
    } = useComputedData(props);
    const {
      onSourceCheckedChange,
      onTargetCheckedChange
    } = useCheckedChange(checkedState, emit);
    const {
      addToLeft,
      addToRight
    } = useMove(props, checkedState, emit);
    const leftPanel = ref();
    const rightPanel = ref();
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
    const hasButtonTexts = computed(() => props.buttonTexts.length === 2);
    const leftPanelTitle = computed(() => props.titles[0] || "\u53EF\u9009\u5217\u8868");
    const rightPanelTitle = computed(() => props.titles[1] || "\u5DF2\u9009\u5217\u8868");
    const panelFilterPlaceholder = computed(() => props.filterPlaceholder || "\u8BF7\u8F93\u5165");
    const optionRender = computed(() => (option) => {
      var _a;
      if (props.renderContent)
        return props.renderContent(h, option);
      const defaultSlotVNodes = (((_a = slots.default) == null ? void 0 : _a.call(slots, {
        option
      })) || []).filter((node) => node.type !== Comment);
      if (defaultSlotVNodes.length) {
        return defaultSlotVNodes;
      }
      return h("span", option[propsAlias.value.label] || option[propsAlias.value.key]);
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode(TransferPanel, {
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
    }, null), createVNode("div", {
      "class": this.ns.e("buttons")
    }, [createVNode(resolveComponent("el-button"), {
      "class": [this.ns.e("button"), this.ns.is("with-texts", this.hasButtonTexts)],
      "type": "primary",
      "disabled": !!isEmpty(this.checkedState.rightChecked) || this.readonly,
      "onClick": this.addToLeft
    }, {
      default: () => [createVNode(resolveComponent("el-icon"), null, {
        default: () => arrowLeft()
      }), this.buttonTexts[0] !== void 0 ? createVNode("span", null, [this.buttonTexts[0]]) : null]
    }), createVNode(resolveComponent("el-button"), {
      "class": [this.ns.e("button"), this.ns.is("with-texts", this.hasButtonTexts)],
      "type": "primary",
      "disabled": !!isEmpty(this.checkedState.leftChecked) || this.readonly,
      "onClick": this.addToRight
    }, {
      default: () => [this.buttonTexts[1] !== void 0 ? createVNode("span", null, [this.buttonTexts[1]]) : null, createVNode(resolveComponent("el-icon"), null, {
        default: () => arrowRight()
      })]
    })]), createVNode(TransferPanel, {
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

export { TransferSelect };
