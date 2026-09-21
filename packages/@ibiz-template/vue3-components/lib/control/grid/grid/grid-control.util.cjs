'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');
var vue = require('vue');
require('../../../util/index.cjs');
var keydownUtil = require('../../../util/keydown-util/keydown-util.cjs');

"use strict";
function sortMergeData(rowSpanKeys, items) {
  const otherItems = [];
  const firstKey = rowSpanKeys[0] || "";
  const sortedItems = items.filter((item) => {
    if (!item[firstKey]) {
      otherItems.push(item);
    }
    return item[firstKey];
  });
  sortedItems.sort((a, b) => {
    for (const key of rowSpanKeys) {
      if (a[key] !== b[key]) {
        return a[key] > b[key] ? 1 : -1;
      }
    }
    return 0;
  });
  sortedItems.push(...otherItems);
  return sortedItems;
}
function useITableEvent(c) {
  const tableRef = vue.ref();
  let forbidChange = false;
  let isGridUISort = false;
  let isCtrlDown = false;
  let cleanKeyDown = core.NOOP;
  let cleanKeyUp = core.NOOP;
  let cleanClick = core.NOOP;
  let cleanEnter = core.NOOP;
  cleanKeyDown = core.listenJSEvent(window, "keydown", (e) => {
    if (e.code === "ControlLeft" && !c.state.singleSelect) {
      isCtrlDown = true;
    }
  });
  cleanKeyUp = core.listenJSEvent(window, "keyup", (e) => {
    if (e.code === "ControlLeft" && !c.state.singleSelect) {
      isCtrlDown = false;
    }
  });
  if (c.state.isAutoGrid) {
    if (c.editShowMode === "row") {
      cleanClick = core.listenJSEvent(window, "click", async (event) => {
        const classList = [];
        core.eventPath(event).forEach((e) => {
          if (e && e.classList) {
            classList.push(...e.classList);
          }
        });
        if (classList.includes("el-popper") || classList.includes("el-scrollbar") || classList.includes("el-table__row"))
          return;
        const editingRow = c.state.rows.find((item) => item.showRowEdit);
        if (editingRow) {
          await c.switchRowEdit(editingRow);
        }
      });
    }
    const timer = setInterval(() => {
      var _a;
      const tableEl = (_a = tableRef.value) == null ? void 0 : _a.$el;
      if (tableEl) {
        clearInterval(timer);
        const querySelect = [
          "tbody select",
          "tbody textarea",
          'tbody input:not([type="checkbox"])'
        ];
        const callback = async () => {
          if (c.editShowMode === "row") {
            const editingRow = c.state.rows.find((item) => item.showRowEdit);
            if (editingRow) {
              await c.switchRowEdit(editingRow);
            }
          }
        };
        const { cleanup } = keydownUtil.useFocusByEnter(tableEl, querySelect, callback);
        cleanEnter = cleanup;
      }
    }, 300);
  }
  c.evt.on("onToggleRowExpansion", (event) => {
    const { row, expand } = event;
    if (tableRef.value) {
      if (tableRef.value.lazy) {
        const { store } = tableRef.value;
        const { treeData } = tableRef.value.store.states;
        const data = treeData.value[row.srfkey];
        if (data && data.expanded !== expand) {
          store.loadOrToggle(row);
        }
      } else {
        tableRef.value.toggleRowExpansion(row, expand);
      }
    }
  });
  async function onRowClickDynamic(data, _column, _event) {
    if (data.srfuf === runtime.Srfuf.CREATE) {
      if (c.editShowMode === "row") {
        const row = c.findRowState(data);
        if (row) {
          await c.switchRowEdit(row);
        }
      }
      return;
    }
    if (isCtrlDown) {
      const selection = [...c.state.selectedData];
      const index = selection.findIndex((x) => x.srfkey === data.srfkey);
      if (index !== -1) {
        selection.splice(index, 1);
        c.setSelection(selection);
      } else {
        c.setSelection([...selection, data]);
      }
      return;
    }
    if (c.editShowMode === "row" && c.allowRowEdit) {
      const row = c.findRowState(data);
      if (row) {
        await c.switchRowEdit(row);
      }
    } else {
      c.onRowClick(data);
    }
  }
  async function onRowClick(data, _column, _event) {
    if (c.state.isAutoGrid) {
      await onRowClickDynamic(data, _column, _event);
      return;
    }
    if (data.srfuf === runtime.Srfuf.CREATE) {
      return;
    }
    if (isCtrlDown) {
      const selection = [...c.state.selectedData];
      const index = selection.findIndex((x) => x.srfkey === data.srfkey);
      if (index !== -1) {
        selection.splice(index, 1);
        c.setSelection(selection);
      } else {
        c.setSelection([...selection, data]);
      }
      return;
    }
    const target = _event.target;
    const { classList } = target.parentElement || {};
    if (classList && classList.contains("el-table-column--selection")) {
      tableRef.value.toggleRowSelection(data);
      return;
    }
    if (c.editShowMode === "row" && c.model.enableRowEdit) {
      const row = c.findRowState(data);
      if (row && row.showRowEdit !== true) {
        await c.switchRowEdit(row, true);
      }
    } else {
      c.onRowClick(data);
    }
  }
  function onDbRowClick(data) {
    if (data.srfuf === runtime.Srfuf.CREATE) {
      return;
    }
    c.onDbRowClick(data);
  }
  function onSelectionChange(selection) {
    if (!forbidChange) {
      c.setSelection(selection);
    }
  }
  vue.watch(
    [
      () => tableRef.value,
      () => c.state.isLoaded,
      () => c.state.selectedData
    ],
    ([table, isLoaded, newVal]) => {
      if (!isLoaded || !table) {
        return;
      }
      if (c.state.singleSelect) {
        if (newVal[0]) {
          tableRef.value.setCurrentRow(newVal[0], true);
        } else {
          tableRef.value.setCurrentRow();
        }
      } else {
        forbidChange = true;
        tableRef.value.clearSelection();
        newVal.forEach((item) => tableRef.value.toggleRowSelection(item, true));
        forbidChange = false;
      }
    }
  );
  function onSortChange(opts) {
    if (isGridUISort) {
      isGridUISort = false;
      return;
    }
    const { prop, order } = opts;
    const fieldName = c.fieldColumns[prop].model.appDEFieldId;
    let order1;
    if (order === "ascending") {
      order1 = "asc";
    } else if (order === "descending") {
      order1 = "desc";
    }
    const sortQuery = "".concat(fieldName, ",").concat(order1);
    if (sortQuery === c.state.sortQuery) {
      return;
    }
    if (c.runMode === "DESIGN") {
      c.state.items = lodashEs.orderBy(
        c.state.items,
        [(item) => {
          var _a;
          return ((_a = item == null ? void 0 : item[fieldName || ""]) == null ? void 0 : _a.length) || 0;
        }],
        [order1 || "asc"]
      );
      c.state.rows = c.state.items.map((item) => {
        const row = new runtime.GridRowState(new runtime.ControlVO(item), c);
        return row;
      });
      return;
    }
    c.setSort(fieldName, order1);
    c.load({
      isInitialLoad: c.model.pagingMode === 2 || c.model.pagingMode === 3
    });
  }
  function handleRowClassName({ row }) {
    let activeClassName = "";
    if (c.state.selectedData.length > 0) {
      c.state.selectedData.forEach((data) => {
        if (data === row) {
          activeClassName = "current-row";
        }
      });
    }
    const rowState = c.findRowState(row);
    if (rowState == null ? void 0 : rowState.showRowEdit) {
      activeClassName += " editing-row";
    }
    if (row.srfkey) {
      activeClassName += " id-".concat(row.srfkey);
    }
    if (c.enableRowEditOrder) {
      activeClassName += " enable-order";
    }
    return activeClassName;
  }
  function handleHeaderCellClassName({
    _row,
    column,
    _rowIndex,
    _columnIndex
  }) {
    var _a;
    const columnModel = (_a = c.model.degridColumns) == null ? void 0 : _a.find((gridColumn) => {
      return gridColumn.codeName === column.property;
    });
    if (columnModel && columnModel.headerSysCss && columnModel.headerSysCss.cssName) {
      return columnModel.headerSysCss.cssName;
    }
    return "";
  }
  vue.watch(
    () => c.state.sortQuery,
    (newVal) => {
      if (newVal) {
        const prop = c.state.sortQuery.split(",")[0];
        const sortDir = c.state.sortQuery.split(",")[1];
        if (prop && sortDir) {
          const order = sortDir === "desc" ? "descending" : "ascending";
          const sortTable = () => {
            if (tableRef.value) {
              vue.nextTick(() => {
                isGridUISort = true;
                tableRef.value.sort(prop, order);
              });
            } else {
              setTimeout(sortTable, 500);
            }
          };
          sortTable();
        }
      }
    }
  );
  return {
    tableRef,
    onRowClick,
    onDbRowClick,
    onSelectionChange,
    onSortChange,
    handleRowClassName,
    handleHeaderCellClassName,
    cleanKeyDown,
    cleanKeyUp,
    cleanClick,
    cleanEnter
  };
}
function useAppGridPagination(c) {
  function onPageChange(page) {
    if (!page || page === c.state.curPage) {
      return;
    }
    c.state.curPage = page;
    c.load();
  }
  function onPageSizeChange(size) {
    if (!size || size === c.state.size) {
      return;
    }
    c.state.size = size;
    if (c.state.curPage === 1) {
      c.load();
    }
  }
  function onPageRefresh() {
    c.load();
  }
  return { onPageChange, onPageSizeChange, onPageRefresh };
}
function useAppGridBase(c, props) {
  const initSimpleData = () => {
    if (!props.data) {
      return;
    }
    c.state.items = props.data;
    if (c.runMode === "DESIGN") {
      c.state.simpleData = props.data;
      c.state.total = props.data.length;
      c.state.curPage = 1;
      c.state.items = lodashEs.chunk(c.state.simpleData, c.state.size)[c.state.curPage - 1] || [];
    }
    c.state.rows = c.state.items.map((item) => {
      const row = new runtime.GridRowState(new runtime.ControlVO(item), c);
      return row;
    });
    c.calcAggResult(c.state.items);
    c.calcTotalData();
  };
  const defaultSort = vue.computed(() => {
    var _a;
    const fieldColumn = Object.values(c.fieldColumns).find(
      (item) => item.model.appDEFieldId === c.model.minorSortAppDEFieldId
    );
    return {
      prop: fieldColumn == null ? void 0 : fieldColumn.model.codeName,
      order: ((_a = c.model.minorSortDir) == null ? void 0 : _a.toLowerCase()) === "desc" ? "descending" : "ascending"
    };
  });
  c.evt.on("onCreated", async () => {
    if (props.isSimple) {
      initSimpleData();
      c.state.isLoaded = true;
    }
  });
  vue.watch(
    () => props.data,
    () => {
      if (props.isSimple) {
        initSimpleData();
      }
    },
    {
      deep: true
    }
  );
  const tableData = vue.computed(() => {
    const state = c.state;
    if (c.model.enableGroup) {
      const result = [];
      state.groups.forEach((item) => {
        if (!item.children.length) {
          return;
        }
        const children = [...item.children];
        const first = children.shift();
        result.push({
          tempsrfkey: (first == null ? void 0 : first.tempsrfkey) || item.caption,
          srfkey: (first == null ? void 0 : first.srfkey) || item.caption,
          isGroupData: true,
          caption: item.caption,
          first,
          children
        });
      });
      return result;
    }
    const { rowspankeys = [] } = c.controlParams;
    if (rowspankeys.length > 0) {
      return sortMergeData(
        rowspankeys,
        state.rows.map((row) => row.data)
      );
    }
    return state.rows.map((row) => row.data);
  });
  const renderColumns = vue.computed(() => {
    if (c.isMultistageHeader) {
      return c.model.degridColumns || [];
    }
    const columns = [];
    c.state.columnStates.forEach((item) => {
      var _a, _b;
      if (item.hidden) {
        return;
      }
      const columnModel = ((_a = c.fieldColumns[item.key]) == null ? void 0 : _a.model) || ((_b = c.uaColumns[item.key]) == null ? void 0 : _b.model);
      if (columnModel) {
        columns.push(columnModel);
      }
    });
    return columns;
  });
  const summaryMethod = ({
    columns
  }) => {
    return columns.map((item, index) => {
      if (index === 0) {
        return c.aggTitle;
      }
      return c.state.aggResult[item.property];
    });
  };
  const spanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex
  }) => {
    const { property } = column;
    const { rowspankeys = [], colspankeys = [] } = c.controlParams;
    if (rowspankeys.length > 0 && rowspankeys.includes(property)) {
      const allow = columnIndex === 0 || row[property];
      if (rowIndex > 0 && allow && row[property] === tableData.value[rowIndex - 1][property]) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
      let rowspan = 1;
      for (let i = rowIndex + 1; i < tableData.value.length; i++) {
        if (allow && tableData.value[i][property] === row[property]) {
          rowspan += 1;
        } else {
          break;
        }
      }
      return {
        rowspan,
        colspan: 1
      };
    }
    if (colspankeys.length > 0 && colspankeys.includes(property)) {
      const preProperty = renderColumns.value[columnIndex - 1].codeName;
      if (columnIndex > 0 && colspankeys.includes(preProperty) && row[property] === row[preProperty]) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
      let colspan = 1;
      for (let i = columnIndex + 1; i < renderColumns.value.length; i++) {
        const nextProperty = renderColumns.value[i].codeName;
        if (colspankeys.includes(nextProperty) && row[nextProperty] === row[property]) {
          colspan += 1;
        } else {
          break;
        }
      }
      return {
        rowspan: 1,
        colspan
      };
    }
  };
  const headerDragend = (newWidth, oldWidth, column) => {
    const { property } = column;
    const columnC = c.columns[property];
    const columnState = c.state.columnStates.find((item) => {
      return item.key === property;
    });
    if (columnC.isAdaptiveColumn) {
      if (columnState) {
        columnState.adaptive = false;
      }
      columnC.isAdaptiveColumn = false;
      columnC.model.width = newWidth;
      const index = renderColumns.value.findIndex((renderColumn) => {
        const renderColumnC = c.columns[renderColumn.codeName];
        return renderColumnC.isAdaptiveColumn;
      });
      c.hasAdaptiveColumn = index !== -1;
    }
    if (columnState) {
      columnState.columnWidth = newWidth;
      c.saveColumnStates();
    }
  };
  return {
    tableData,
    renderColumns,
    defaultSort,
    summaryMethod,
    spanMethod,
    headerDragend
  };
}
function useGridHeaderStyle(tableRef, ns) {
  let resizeObserver = null;
  let lastGridHeaderHeight = 0;
  const headerCssVars = vue.ref({});
  const calcGridHeaderHeight = () => {
    if (window.ResizeObserver) {
      const gridHeaderDom = tableRef.value.$el.querySelector(
        ".el-table__header-wrapper"
      );
      if (gridHeaderDom) {
        resizeObserver = new ResizeObserver((entries) => {
          const height = entries[0].contentRect.height;
          if (height !== lastGridHeaderHeight) {
            const tempCssVars = {
              "now-header-height": "".concat(height, "px")
            };
            headerCssVars.value = ns.cssVarBlock(tempCssVars);
            lastGridHeaderHeight = height;
          }
        });
        resizeObserver.observe(gridHeaderDom);
      }
    }
  };
  const stop = vue.watchEffect(() => {
    if (tableRef.value) {
      calcGridHeaderHeight();
    }
  });
  vue.onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    stop();
  });
  return {
    headerCssVars
  };
}
function useGridDraggable(tableRef, ns, c) {
  if (!c.enableRowEditOrder) {
    return {};
  }
  let dragIndex = 0;
  let dropIndex = 0;
  let draggingData = null;
  let dropData = null;
  const cleanups = [];
  const calcSrfKeyByClass = (classList) => {
    let result = "";
    classList.forEach((className) => {
      if (className.startsWith("id-")) {
        result = className.replace("id-", "");
      }
    });
    return result;
  };
  const setRowDragEvent = (item) => {
    item.setAttribute("draggable", "true");
    const cleanDragStart = core.listenJSEvent(
      item,
      "dragstart",
      (event) => {
        if (event.target) {
          const draggingDom = event.target;
          event.dataTransfer.effectAllowed = "move";
          const draggingKey = calcSrfKeyByClass(draggingDom.classList);
          dragIndex = c.state.rows.findIndex(
            (row) => row.data.srfkey === draggingKey
          );
          draggingData = c.state.rows[dragIndex];
        }
      }
    );
    const cleanDragEnter = core.listenJSEvent(
      item,
      "dragenter",
      (event) => {
        event.preventDefault();
        const targetDom = event.currentTarget;
        const targetKey = calcSrfKeyByClass(targetDom.classList);
        dropIndex = c.state.rows.findIndex(
          (row) => row.data.srfkey === targetKey
        );
        if ((draggingData == null ? void 0 : draggingData.data.srfkey) === targetKey || dropIndex === -1) {
          return;
        }
        dropData = c.state.rows[dropIndex];
      }
    );
    const cleanDragOver = core.listenJSEvent(
      item,
      "dragover",
      (event) => {
        event.preventDefault();
      }
    );
    const cleanDragEnd = core.listenJSEvent(item, "dragend", (event) => {
      event.preventDefault();
      if (draggingData && dropData) {
        c.onDragChange(
          draggingData,
          dropData,
          dropIndex > dragIndex ? "next" : "prev"
        );
      }
    });
    cleanups.push(cleanDragStart);
    cleanups.push(cleanDragEnter);
    cleanups.push(cleanDragOver);
    cleanups.push(cleanDragEnd);
  };
  vue.watch(
    [() => tableRef.value, () => c.state.isLoaded],
    (table, isLoaded) => {
      if (!isLoaded || !table) {
        return;
      }
      const grid = tableRef.value.$el;
      if (grid) {
        const rows = grid.getElementsByClassName("el-table__row");
        rows.forEach((item) => {
          setRowDragEvent(item);
        });
      }
    }
  );
  return {
    cleanup: () => {
      cleanups.forEach((cleanup) => {
        cleanup();
      });
    }
  };
}

exports.useAppGridBase = useAppGridBase;
exports.useAppGridPagination = useAppGridPagination;
exports.useGridDraggable = useGridDraggable;
exports.useGridHeaderStyle = useGridHeaderStyle;
exports.useITableEvent = useITableEvent;
