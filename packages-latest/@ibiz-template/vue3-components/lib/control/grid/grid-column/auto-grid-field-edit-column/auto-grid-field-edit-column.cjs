'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var core = require('@ibiz-template/core');
var rowEdit = require('./row-edit.cjs');
var allEdit = require('../grid-field-edit-column/all-edit.cjs');

"use strict";
const AutoGridFieldEditColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAutoGridFieldEditColumn",
  props: {
    controller: {
      type: runtime.GridFieldEditColumnController,
      required: true
    },
    row: {
      type: runtime.GridRowState,
      required: true
    },
    attrs: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("grid-field-edit-column");
    const componentRef = vue.ref();
    const c = props.controller;
    const rowDataChange = async (val, name, ignore = false) => {
      ibiz.log.debug("".concat(c.fieldName, "\u503C\u53D8\u66F4"), val);
      await c.setRowValue(props.row, val, name, ignore);
    };
    const useByShowMode = () => {
      switch (c.grid.editShowMode) {
        case "row":
          return rowEdit.useRowEdit(props, componentRef);
        case "all":
          return allEdit.useAllEdit(props, componentRef);
        default:
          throw new core.RuntimeError(ibiz.i18n.t("control.common.noSupportItem", {
            name: c.grid.editShowMode
          }));
      }
    };
    const {
      gridEditItemProps,
      editorProps
    } = useByShowMode();
    const infoText = vue.ref(void 0);
    const onInfoTextChange = (text) => {
      infoText.value = text;
    };
    const tooltip = vue.computed(() => {
      if (!editorProps.readonly) {
        return void 0;
      }
      if (ramda.isNil(infoText.value)) {
        const val = props.row.data[c.fieldName];
        return c.formatValue(val);
      }
      return infoText.value;
    });
    return {
      c,
      ns,
      componentRef,
      tooltip,
      rowDataChange,
      onInfoTextChange,
      gridEditItemProps,
      editorProps
    };
  },
  render() {
    var _a;
    const val = this.row.data[this.c.fieldName];
    return vue.createVNode(vue.resolveComponent("iBizGridEditItem"), {
      ref: "componentRef",
      required: !this.c.editItem.allowEmpty,
      error: this.row.errors[this.c.fieldName],
      overflowMode: this.c.grid.overflowMode,
      class: [this.ns.b(), this.ns.m("auto"), this.ns.m(this.c.grid.overflowMode), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName],
      ...this.gridEditItemProps
    }, {
      default: () => [this.c.editorProvider && vue.h(vue.resolveComponent(this.c.editorProvider.gridEditor), {
        class: this.ns.e("editor"),
        value: val,
        data: this.row.data,
        controller: this.c.editor,
        overflowMode: this.c.grid.overflowMode,
        onChange: this.rowDataChange,
        onInfoTextChange: this.onInfoTextChange,
        title: this.tooltip,
        ...this.editorProps,
        ...this.attrs
      })]
    });
  }
});

exports.AutoGridFieldEditColumn = AutoGridFieldEditColumn;
exports.default = AutoGridFieldEditColumn;
