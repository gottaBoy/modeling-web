import { defineComponent, computed, ref, createVNode, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { RuntimeError } from '@ibiz-template/core';
import { TreeGridExNodeColumnController, TreeGridExRowState } from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import { useCellEdit } from './cell-edit.mjs';
import { useRowEdit } from './row-edit.mjs';
import { useAllEdit } from './all-edit.mjs';
import './tree-grid-ex-edit-column.css';

"use strict";
const TreeGridExEditColumn = /* @__PURE__ */ defineComponent({
  name: "IBizTreeGridExEditColumn",
  props: {
    controller: {
      type: TreeGridExNodeColumnController,
      required: true
    },
    row: {
      type: TreeGridExRowState,
      required: true
    }
  },
  setup(props) {
    const fieldValue = computed(() => {
      return props.row.data[props.controller.name];
    });
    const ns = useNamespace("tree-grid-ex-edit-column");
    const componentRef = ref();
    const c = props.controller;
    const rowDataChange = async (val, name, ignore = false) => {
      ibiz.log.debug("".concat(c.name, "\u503C\u53D8\u66F4"), val);
      await c.setRowValue(props.row, val, name, ignore);
    };
    const useByShowMode = () => {
      switch (c.treeGrid.editShowMode) {
        case "cell":
          return useCellEdit(props, componentRef);
        case "row":
          return useRowEdit(props, componentRef);
        case "all":
          return useAllEdit(props, componentRef);
        default:
          throw new RuntimeError(ibiz.i18n.t("control.common.noSupportItem", {
            name: c.treeGrid.editShowMode
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
      editorProps
    };
  },
  render() {
    return createVNode(resolveComponent("iBizGridEditItem"), {
      ref: "componentRef",
      required: !this.controller.nodeEditItem.allowEmpty,
      overflowMode: this.controller.treeGrid.overflowMode,
      class: [this.ns, this.ns.m(this.controller.treeGrid.overflowMode)],
      ...this.gridEditItemProps
    }, {
      default: () => [this.controller.editorProvider && h(resolveComponent(this.controller.editorProvider.gridEditor), {
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

export { TreeGridExEditColumn, TreeGridExEditColumn as default };
