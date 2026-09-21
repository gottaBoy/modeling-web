import { isVNode, defineComponent, renderSlot, h, resolveComponent, withDirectives, createVNode, resolveDirective, ref, nextTick, computed } from 'vue';
import { renderTooltip, useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { RuntimeError } from '@ibiz-template/core';
import { GridRowState, GridFieldEditColumnController } from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import { useCellEdit } from './cell-edit.mjs';
import { useRowEdit } from './row-edit.mjs';
import { useAllEdit } from './all-edit.mjs';
import './grid-field-edit-column.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GridFieldEditColumn = /* @__PURE__ */ defineComponent({
  name: "IBizGridFieldEditColumn",
  props: {
    controller: {
      type: GridFieldEditColumnController,
      required: true
    },
    row: {
      type: GridRowState,
      required: true
    },
    attrs: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const ns = useNamespace("grid-field-edit-column");
    const componentRef = ref();
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.grid);
    const useByShowMode = () => {
      switch (c.grid.editShowMode) {
        case "cell":
          return useCellEdit(props, componentRef);
        case "row":
          return useRowEdit(props, componentRef);
        case "all":
          return useAllEdit(props, componentRef);
        default:
          throw new RuntimeError(ibiz.i18n.t("control.common.noSupportItem", {
            name: c.grid.editShowMode
          }));
      }
    };
    const {
      gridEditItemProps,
      editorProps,
      editable
    } = useByShowMode();
    const rowDataChange = async (val, name, ignore = false) => {
      ibiz.log.debug("".concat(c.fieldName, "\u503C\u53D8\u66F4"), val);
      const {
        isEscOut
      } = gridEditItemProps;
      if (isEscOut) {
        gridEditItemProps.isEscOut = false;
        const rowData = props.row.data;
        const oldValue = rowData[c.fieldName];
        rowData[c.fieldName] = null;
        nextTick(() => {
          rowData[c.fieldName] = oldValue;
        });
        return;
      }
      await c.setRowValue(props.row, val, name, ignore);
    };
    const infoText = ref(void 0);
    const onInfoTextChange = (text) => {
      infoText.value = text;
    };
    const showTitle = computed(() => {
      const {
        controlRenders = [],
        id
      } = c.model;
      return !controlRenders.some((renderItem) => renderItem.id === "".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip") || renderItem.id === "".concat(id == null ? void 0 : id.toLowerCase(), "_edit_tooltip"));
    });
    const tooltip = computed(() => {
      if (!editorProps.readonly || !showTitle.value)
        return void 0;
      if (isNil(infoText.value)) {
        const val = props.row.data[c.fieldName];
        return c.formatValue(val);
      }
      return infoText.value;
    });
    const tooltipId = computed(() => {
      const {
        id
      } = c.model;
      return editable.value ? "".concat(id == null ? void 0 : id.toLowerCase(), "_edit_tooltip") : "".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip");
    });
    return {
      c,
      ns,
      tooltip,
      tooltipId,
      showTitle,
      editorProps,
      componentRef,
      gridEditItemProps,
      rowDataChange,
      onInfoTextChange,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a;
    const val = this.row.data[this.c.fieldName];
    let content = null;
    const editorSlot = "".concat(this.controller.model.codeName, "_editor");
    if (this.$slots[editorSlot]) {
      content = renderSlot(this.$slots, editorSlot, {
        class: this.ns.e("editor"),
        value: val,
        data: this.row.data,
        showTitle: this.showTitle,
        controller: this.c.editor,
        overflowMode: this.c.grid.overflowMode,
        onChange: this.rowDataChange,
        onInfoTextChange: this.onInfoTextChange,
        title: this.tooltip,
        ...this.editorProps,
        ...this.attrs
      });
    } else if (this.c.editorProvider) {
      content = h(resolveComponent(this.c.editorProvider.gridEditor), {
        class: this.ns.e("editor"),
        value: val,
        data: this.row.data,
        controller: this.c.editor,
        showTitle: this.showTitle,
        overflowMode: this.c.grid.overflowMode,
        onChange: this.rowDataChange,
        onInfoTextChange: this.onInfoTextChange,
        title: this.tooltip,
        ...this.editorProps,
        ...this.attrs
      });
    }
    return withDirectives(createVNode(resolveComponent("iBizGridEditItem"), {
      ref: "componentRef",
      required: !this.c.editItem.allowEmpty,
      error: this.row.errors[this.c.fieldName],
      overflowMode: this.c.grid.overflowMode,
      class: [this.ns, this.ns.m(this.c.grid.overflowMode), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName, this.semanticClass("editcolumn", {
        column: this.controller
      })],
      style: this.semanticStyle("editcolumn", {
        column: this.controller
      }),
      ...this.gridEditItemProps
    }, _isSlot(content) ? content : {
      default: () => [content]
    }), [[resolveDirective("tooltip"), renderTooltip(this.row.data, this.c.model, this.c.grid, this.tooltipId)]]);
  }
});

export { GridFieldEditColumn, GridFieldEditColumn as default };
