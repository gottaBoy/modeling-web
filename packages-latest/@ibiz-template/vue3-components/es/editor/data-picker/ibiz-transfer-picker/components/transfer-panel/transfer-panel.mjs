import { defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, reactive, computed, toRefs } from 'vue';
import { isEmpty } from 'ramda';
import { useNamespace } from '@ibiz-template/vue3-util';
import { transferPanelEmits, transferPanelProps } from './interface.mjs';
import { usePropsAlias, useCheck } from './transfer-panel-util.mjs';
import { Search } from './icon.mjs';
import './transfer-panel.css';

"use strict";
const TransferPanel = /* @__PURE__ */ defineComponent({
  name: "IBizTransferPanel",
  props: transferPanelProps,
  emits: transferPanelEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("transfer-panel");
    const panelState = reactive({
      checked: [],
      allChecked: false,
      query: "",
      checkChangeByUser: true
    });
    const propsAlias = usePropsAlias(props);
    const {
      filteredData,
      checkedSummary,
      isIndeterminate,
      onInputChange,
      handleAllCheckedChange
    } = useCheck(props, panelState, emit);
    const hasNoMatch = computed(() => !isEmpty(panelState.query) && isEmpty(filteredData.value));
    const hasFooter = computed(() => !(slots.default && isEmpty(slots.default()[0].children)));
    const {
      checked,
      allChecked,
      query
    } = toRefs(panelState);
    return {
      ns,
      query,
      allChecked,
      checkedSummary,
      hasNoMatch,
      hasFooter,
      checked,
      filteredData,
      propsAlias,
      isIndeterminate,
      onInputChange,
      handleAllCheckedChange
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "class": this.ns.b()
    }, [createVNode("p", {
      "class": this.ns.e("header")
    }, [createVNode(resolveComponent("el-checkbox"), {
      "modelValue": this.allChecked,
      "onUpdate:modelValue": ($event) => this.allChecked = $event,
      "disabled": this.readonly,
      "indeterminate": this.isIndeterminate,
      "validateEvent": false,
      "onChange": this.handleAllCheckedChange
    }, {
      default: () => [createVNode("span", {
        "class": this.ns.em("header", "title")
      }, [this.title]), createVNode("span", {
        "class": this.ns.em("header", "count")
      }, [this.checkedSummary])]
    })]), createVNode("div", {
      "class": [this.ns.e("body"), this.ns.is("with-footer", this.hasFooter)]
    }, [this.filterable ? createVNode(resolveComponent("el-input"), {
      "modelValue": this.query,
      "onUpdate:modelValue": ($event) => this.query = $event,
      "readonly": this.readonly,
      "class": this.ns.e("filter"),
      "size": "default",
      "placeholder": this.placeholder,
      "prefixIcon": () => Search(),
      "clearable": true,
      "validateEvent": false,
      "onInput": this.onInputChange
    }, null) : null, withDirectives(createVNode("div", {
      "class": [this.ns.e("content"), this.ns.is("filterable", this.filterable)]
    }, [!this.hasNoMatch && !isEmpty(this.data) ? createVNode(resolveComponent("el-checkbox-group"), {
      "modelValue": this.checked,
      "onUpdate:modelValue": ($event) => this.checked = $event,
      "validateEvent": false,
      "disabled": this.readonly,
      "class": [this.ns.e("list")]
    }, {
      default: () => {
        return this.filteredData.map((item) => {
          return createVNode(resolveComponent("el-checkbox"), {
            "class": this.ns.e("item"),
            "key": item[this.propsAlias.key],
            "label": item[this.propsAlias.key],
            "disabled": !!item[this.propsAlias.disabled],
            "validateEvent": false
          }, {
            default: () => {
              var _a2;
              return [(_a2 = this.optionRender) == null ? void 0 : _a2.call(this, item)];
            }
          });
        });
      }
    }) : createVNode("div", {
      "class": this.ns.e("empty")
    }, [this.$slots.empty ? (_b = (_a = this.$slots).empty) == null ? void 0 : _b.call(_a) : createVNode(resolveComponent("iBizNoData"), {
      "class": this.ns.em("empty", "no-data")
    }, null)])]), [[resolveDirective("loading"), this.enableAcSearch && this.loading]])])]);
  }
});

export { TransferPanel };
