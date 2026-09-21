'use strict';

var vue = require('vue');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var _interface = require('./interface.cjs');
var transferPanelUtil = require('./transfer-panel-util.cjs');
var icon = require('./icon.cjs');
require('./transfer-panel.css');

"use strict";
const TransferPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTransferPanel",
  props: _interface.transferPanelProps,
  emits: _interface.transferPanelEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("transfer-panel");
    const panelState = vue.reactive({
      checked: [],
      allChecked: false,
      query: "",
      checkChangeByUser: true
    });
    const propsAlias = transferPanelUtil.usePropsAlias(props);
    const {
      filteredData,
      checkedSummary,
      isIndeterminate,
      onInputChange,
      handleAllCheckedChange
    } = transferPanelUtil.useCheck(props, panelState, emit);
    const hasNoMatch = vue.computed(() => !ramda.isEmpty(panelState.query) && ramda.isEmpty(filteredData.value));
    const hasFooter = vue.computed(() => !(slots.default && ramda.isEmpty(slots.default()[0].children)));
    const {
      checked,
      allChecked,
      query
    } = vue.toRefs(panelState);
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("p", {
      "class": this.ns.e("header")
    }, [vue.createVNode(vue.resolveComponent("el-checkbox"), {
      "modelValue": this.allChecked,
      "onUpdate:modelValue": ($event) => this.allChecked = $event,
      "disabled": this.readonly,
      "indeterminate": this.isIndeterminate,
      "validateEvent": false,
      "onChange": this.handleAllCheckedChange
    }, {
      default: () => [vue.createVNode("span", {
        "class": this.ns.em("header", "title")
      }, [this.title]), vue.createVNode("span", {
        "class": this.ns.em("header", "count")
      }, [this.checkedSummary])]
    })]), vue.createVNode("div", {
      "class": [this.ns.e("body"), this.ns.is("with-footer", this.hasFooter)]
    }, [this.filterable ? vue.createVNode(vue.resolveComponent("el-input"), {
      "modelValue": this.query,
      "onUpdate:modelValue": ($event) => this.query = $event,
      "readonly": this.readonly,
      "class": this.ns.e("filter"),
      "size": "default",
      "placeholder": this.placeholder,
      "prefixIcon": () => icon.Search(),
      "clearable": true,
      "validateEvent": false,
      "onInput": this.onInputChange
    }, null) : null, vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.e("content"), this.ns.is("filterable", this.filterable)]
    }, [!this.hasNoMatch && !ramda.isEmpty(this.data) ? vue.createVNode(vue.resolveComponent("el-checkbox-group"), {
      "modelValue": this.checked,
      "onUpdate:modelValue": ($event) => this.checked = $event,
      "validateEvent": false,
      "disabled": this.readonly,
      "class": [this.ns.e("list")]
    }, {
      default: () => {
        return this.filteredData.map((item) => {
          return vue.createVNode(vue.resolveComponent("el-checkbox"), {
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
    }) : vue.createVNode("div", {
      "class": this.ns.e("empty")
    }, [this.$slots.empty ? (_b = (_a = this.$slots).empty) == null ? void 0 : _b.call(_a) : vue.createVNode(vue.resolveComponent("iBizNoData"), {
      "class": this.ns.em("empty", "no-data")
    }, null)])]), [[vue.resolveDirective("loading"), this.enableAcSearch && this.loading]])])]);
  }
});

exports.TransferPanel = TransferPanel;
