'use strict';

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');

"use strict";
function usePagination(c) {
  const initGridItems = () => {
    const controller = c;
    if (Array.isArray(controller.state.simpleData)) {
      controller.state.items = lodashEs.chunk(controller.state.simpleData, controller.state.size)[controller.state.curPage - 1] || [];
      controller.state.rows = controller.state.items.map((item) => {
        const row = new runtime.GridRowState(new runtime.ControlVO(item), controller);
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
  const { semanticClass, semanticStyle } = vue3Util.useSemanticNode(c);
  const pageSemantic = {
    refresh: {
      class: semanticClass("pagination.refresh"),
      style: semanticStyle("pagination.refresh")
    },
    description: {
      class: semanticClass("pagination.description"),
      style: semanticStyle("pagination.description")
    },
    item: {
      class: semanticClass("pagination.item"),
      style: semanticStyle("pagination.item")
    },
    prev: {
      class: semanticClass("pagination.prev"),
      style: semanticStyle("pagination.prev")
    },
    next: {
      class: semanticClass("pagination.next"),
      style: semanticStyle("pagination.next")
    },
    sizes: {
      class: semanticClass("pagination.sizes"),
      style: semanticStyle("pagination.sizes")
    },
    jump: {
      class: semanticClass("pagination.jump"),
      style: semanticStyle("pagination.jump")
    }
  };
  return { pageSemantic, onPageChange, onPageSizeChange, onPageRefresh };
}

exports.usePagination = usePagination;
