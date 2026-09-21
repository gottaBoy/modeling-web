import { ref, reactive, createVNode, resolveComponent } from 'vue';
import { computePosition } from '@floating-ui/dom';
import { RuntimeError } from '@ibiz-template/core';

"use strict";
function useRowEditPopover(tableRef, c) {
  let popInstance;
  const showPop = ref(false);
  const editingRow = ref();
  const popStyle = reactive({});
  const findTrEl = (row) => {
    if (!tableRef.value) {
      throw new RuntimeError(ibiz.i18n.t("control.common.citeErrMessage"));
    }
    const tableEl = tableRef.value.$el;
    let selector = ".el-table__row";
    if (row.data.srfkey) {
      selector += '[class*="id-'.concat(row.data.srfkey, '"]');
    }
    const trEl = tableEl.querySelector(selector);
    if (!trEl) {
      throw new RuntimeError(ibiz.i18n.t("control.common.noDomErrMessage"));
    }
    return trEl;
  };
  const showRowEditPop = async (row) => {
    const trEl = findTrEl(row);
    if (!popInstance) {
      throw new RuntimeError(ibiz.i18n.t("control.common.noPopErrMessage"));
    }
    const popEl = popInstance.$el;
    const {
      x,
      y
    } = await computePosition(trEl, popEl, {
      placement: "bottom"
    });
    Object.assign(popStyle, {
      top: "".concat(y, "px"),
      left: "".concat(x, "px")
    });
    editingRow.value = row;
    showPop.value = true;
  };
  const onConfirm = async () => {
    if (editingRow.value) {
      c.switchRowEdit(editingRow.value, false, true);
    }
  };
  const onCancel = async () => {
    if (editingRow.value) {
      c.switchRowEdit(editingRow.value, false, false);
    }
  };
  const renderPopover = () => {
    const showPlaceholder = showPop.value && c.state.rows[c.state.rows.length - 1].showRowEdit;
    return [createVNode("div", {
      "class": "row-edit-popover__placeholder",
      "style": {
        display: showPlaceholder ? "block" : "none"
      }
    }, null), createVNode(resolveComponent("iBizRowEditPopover"), {
      "ref": (ins) => {
        popInstance = ins;
      },
      "style": popStyle,
      "show": showPop.value,
      "onConfirm": onConfirm,
      "onCancel": onCancel
    }, null)];
  };
  c.evt.on("onRowEditChange", (event) => {
    if (event.row.showRowEdit && !c.state.isAutoGrid) {
      setTimeout(() => {
        showRowEditPop(event.row);
      }, 0);
    } else {
      editingRow.value = void 0;
      showPop.value = false;
      Object.assign(popStyle, {
        top: void 0,
        left: void 0
      });
    }
  });
  return {
    renderPopover
  };
}

export { useRowEditPopover };
