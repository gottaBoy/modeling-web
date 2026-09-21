import { defineComponent, createVNode, resolveComponent, h, ref, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { GridRowState, GridFieldEditColumnController } from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import { RuntimeError } from '@ibiz-template/core';
import { useRowEdit } from './row-edit.mjs';
import { useAllEdit } from '../grid-field-edit-column/all-edit.mjs';

"use strict";
const AutoGridFieldEditColumn = /* @__PURE__ */ defineComponent({
  name: "IBizAutoGridFieldEditColumn",
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
    const rowDataChange = async (val, name, ignore = false) => {
      ibiz.log.debug("".concat(c.fieldName, "\u503C\u53D8\u66F4"), val);
      await c.setRowValue(props.row, val, name, ignore);
    };
    const useByShowMode = () => {
      switch (c.grid.editShowMode) {
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
      editorProps
    } = useByShowMode();
    const infoText = ref(void 0);
    const onInfoTextChange = (text) => {
      infoText.value = text;
    };
    const tooltip = computed(() => {
      if (!editorProps.readonly) {
        return void 0;
      }
      if (isNil(infoText.value)) {
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
    return createVNode(resolveComponent("iBizGridEditItem"), {
      ref: "componentRef",
      required: !this.c.editItem.allowEmpty,
      error: this.row.errors[this.c.fieldName],
      overflowMode: this.c.grid.overflowMode,
      class: [this.ns.b(), this.ns.m("auto"), this.ns.m(this.c.grid.overflowMode), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName],
      ...this.gridEditItemProps
    }, {
      default: () => [this.c.editorProvider && h(resolveComponent(this.c.editorProvider.gridEditor), {
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

export { AutoGridFieldEditColumn, AutoGridFieldEditColumn as default };
