import { GridRowState, ControlVO } from '@ibiz-template/runtime';
import { chunk } from 'lodash-es';

"use strict";
function usePagination(c) {
  const initGridItems = () => {
    const controller = c;
    if (Array.isArray(controller.state.simpleData)) {
      controller.state.items = chunk(controller.state.simpleData, controller.state.size)[controller.state.curPage - 1] || [];
      controller.state.rows = controller.state.items.map((item) => {
        const row = new GridRowState(new ControlVO(item), controller);
        return row;
      });
    }
  };
  function onPageChange(page) {
    if (!page || page === c.state.curPage) {
      return;
    }
    c.state.curPage = page;
    if (c.runMode === "DESIGN") {
      initGridItems();
      return;
    }
    c.load();
  }
  function onPageSizeChange(size) {
    if (!size || size === c.state.size) {
      return;
    }
    c.state.size = size;
    if (c.runMode === "DESIGN") {
      initGridItems();
      return;
    }
    if (c.state.curPage !== 1) {
      c.state.curPage = 1;
    }
    c.load();
  }
  function onPageRefresh() {
    c.load();
  }
  return { onPageChange, onPageSizeChange, onPageRefresh };
}

export { usePagination };
