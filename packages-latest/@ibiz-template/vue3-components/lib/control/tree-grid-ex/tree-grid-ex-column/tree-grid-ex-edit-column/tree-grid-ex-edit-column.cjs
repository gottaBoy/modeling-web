'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var cellEdit = require('./cell-edit.cjs');
var rowEdit = require('./row-edit.cjs');
var allEdit = require('./all-edit.cjs');
require('./tree-grid-ex-edit-column.css');

"use strict";
const TreeGridExEditColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeGridExEditColumn",
  props: {
    controller: {
      type: runtime.TreeGridExNodeColumnController,
      required: true
    },
    row: {
      type: runtime.TreeGridExRowState,
      required: true
    }
  },
  setup(props) {
    const fieldValue = vue.computed(() => {
      return props.row.data[props.controller.name];
    });
    const ns = vue3Util.useNamespace("tree-grid-ex-edit-column");
    const componentRef = vue.ref();
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.treeGrid);
    const c = props.controller;
    const rowDataChange = async (val, name, ignore = false) => {
      ibiz.log.debug("".concat(c.name, "\u503C\u53D8\u66F4"), val);
      await c.setRowValue(props.row, val, name, ignore);
    };
    const useByShowMode = () => {
      switch (c.treeGrid.editShowMode) {
        case "cell":
          return cellEdit.useCellEdit(props, componentRef);
        case "row":
          return rowEdit.useRowEdit(props, componentRef);
        case "all":
          return allEdit.useAllEdit(props, componentRef);
        default:
          throw new core.RuntimeError(ibiz.i18n.t("control.common.noSupportItem", {
            name: c.treeGrid.editShowMode
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
        return c.formatValue(fieldValue.value);
      }
      return infoText.value;
    });
    return {
      ns,
      fieldValue,
      componentRef,
      tooltip,
      rowDataChange,
      onInfoTextChange,
      gridEditItemProps,
      editorProps,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    return vue.createVNode(vue.resolveComponent("iBizGridEditItem"), {
      ref: "componentRef",
      required: !this.controller.nodeEditItem.allowEmpty,
      overflowMode: this.controller.treeGrid.overflowMode,
      class: [this.ns, this.ns.m(this.controller.treeGrid.overflowMode), this.semanticClass("editcolumn", {
        column: this.controller
      })],
      style: this.semanticStyle("editcolumn", {
        column: this.controller
      }),
      ...this.gridEditItemProps
    }, {
      default: () => [this.controller.editorProvider && vue.h(vue.resolveComponent(this.controller.editorProvider.gridEditor), {
        class: this.ns.e("editor"),
        value: this.fieldValue,
        data: this.row.data,
        controller: this.controller.editor,
        overflowMode: this.controller.treeGrid.overflowMode,
        onChange: this.rowDataChange,
        onInfoTextChange: this.onInfoTextChange,
        title: this.tooltip,
        ...this.editorProps
      })]
    });
  }
});

exports.TreeGridExEditColumn = TreeGridExEditColumn;
exports.default = TreeGridExEditColumn;
