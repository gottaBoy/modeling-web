import { NOOP, listenJSEvent, eventPath, recursiveIterate } from '@ibiz-template/core';
import { Srfuf, GridRowState, ControlVO, ScriptFactory } from '@ibiz-template/runtime';
import { orderBy, chunk } from 'lodash-es';
import { ref, computed, watch, nextTick, watchEffect, onUnmounted } from 'vue';
import '../../../util/index.mjs';
import { useFocusByEnter } from '../../../util/keydown-util/keydown-util.mjs';

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
  const tableRef = ref();
  let forbidChange = false;
  let isGridUISort = false;
  let cleanClick = NOOP;
  let cleanEnter = NOOP;
  let cleanTab = NOOP;
  if (c.state.isAutoGrid) {
    if (c.editShowMode === "row") {
      cleanClick = listenJSEvent(window, "click", async (event) => {
        const classList = [];
        eventPath(event).forEach((e) => {
          if (e && e.classList) {
            classList.push(...e.classList);
          }
        });
        if (classList.includes("el-popper") || classList.includes("el-scrollbar") || classList.includes("el-table__row"))
          return;
        const editingRow = c.state.rows.find((item) => item.showRowEdit);
        if (editingRow)
          await c.switchRowEdit(editingRow);
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
            if (editingRow)
              await c.switchRowEdit(editingRow);
          }
        };
        const { cleanup } = useFocusByEnter(tableEl, querySelect, callback);
        cleanEnter = cleanup;
      }
    }, 300);
  }
  const allGridColumns = [];
  recursiveIterate(
    c.model,
    (column) => {
      allGridColumns.push(column);
    },
    { childrenFields: ["degridColumns"] }
  );
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
  const editColumn = computed(() => {
    const columns = [];
    recursiveIterate({ children: c.state.columnStates }, (columnState) => {
      if (!columnState.uaColumn && !columnState.hidden) {
        const model = c.columns[columnState.key].model;
        if (model.enableRowEdit)
          columns.push(model);
      }
    });
    return columns;
  });
  const tabListener = (event) => {
    var _a, _b;
    const tableEl = tableRef.value.$el;
    const currentElement = document.activeElement;
    if (event.key === "Tab" && tableEl.contains(currentElement)) {
      event.preventDefault();
      const classList = [];
      eventPath(event).forEach((e) => {
        if (e && e.classList) {
          classList.push(...e.classList);
        }
      });
      const key = (_a = classList.filter((className) => className.startsWith("id-"))[0]) == null ? void 0 : _a.substring(3);
      const columnName = (_b = classList.filter((className) => className.startsWith("defgridcolumn-"))[0]) == null ? void 0 : _b.substring(14);
      const columnIndex = editColumn.value.findIndex(
        (column) => column.id.toLowerCase() === (columnName == null ? void 0 : columnName.toLowerCase())
      );
      const rowIndex = c.state.rows.findIndex(
        (item) => key && item.data.srfkey === key
      );
      const row = rowIndex !== -1 ? c.state.rows[rowIndex] : void 0;
      const nextRow = rowIndex !== -1 ? c.state.rows[rowIndex + 1] : c.state.rows.find((_row) => _row.data.srfuf === Srfuf.UPDATE);
      if (row) {
        if (nextRow || columnIndex < editColumn.value.length - 1) {
          Object.keys(row.editColStates).forEach((fieldName) => {
            row.editColStates[fieldName].editable = false;
          });
        }
        if (columnIndex < editColumn.value.length - 1) {
          row.editColStates[editColumn.value[columnIndex + 1].id.toLowerCase()].editable = true;
        } else if (nextRow) {
          nextRow.editColStates[editColumn.value[0].id.toLowerCase()].editable = true;
        }
      } else {
        const focusableElements = Array.from(
          tableEl.querySelectorAll(
            'tbody select, tbody textarea, tbody input:not([type="checkbox"])'
          )
        );
        const currentIndex = focusableElements.indexOf(currentElement);
        const nextElement = focusableElements[currentIndex + 1];
        if (nextElement) {
          nextElement.focus();
        } else if (nextRow) {
          nextRow.editColStates[editColumn.value[0].id.toLowerCase()].editable = true;
        }
      }
    }
  };
  watch(
    () => tableRef.value,
    (table) => {
      const { enableRowEdit } = c.model;
      if (table && enableRowEdit && c.editShowMode === "cell") {
        cleanTab = listenJSEvent(window, "keydown", tabListener, {
          capture: true
        });
      }
    }
  );
  function handleCtrlSelect(data) {
    const selection = [...c.state.selectedData];
    const index = selection.findIndex((x) => x.srfkey === data.srfkey);
    if (index !== -1) {
      selection.splice(index, 1);
      c.setSelection(selection);
    } else {
      c.setSelection([...selection, data]);
    }
  }
  let lastSelectedIndex = null;
  function handleShiftSelect(data) {
    var _a;
    (_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges();
    const index = c.findRowStateIndex(data);
    const selection = [...c.state.selectedData];
    const isSelected = selection.includes(data);
    if (lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      if (isSelected) {
        for (let i = start; i <= end; i++) {
          const itemIndex = selection.indexOf(c.state.items[i]);
          if (itemIndex !== -1) {
            selection.splice(itemIndex, 1);
          }
        }
      } else {
        for (let i = start; i <= end; i++) {
          if (!selection.includes(c.state.items[i])) {
            selection.push(c.state.items[i]);
          }
        }
      }
      c.setSelection(selection);
    } else {
      c.setSelection([data]);
    }
    lastSelectedIndex = index;
  }
  async function onRowClickDynamic(data, _column, event) {
    if (data.srfuf === Srfuf.CREATE) {
      if (c.editShowMode === "row" && !data.isGroupRow) {
        const row = c.findRowState(data);
        if (row)
          await c.switchRowEdit(row);
      }
      return;
    }
    if (event.ctrlKey && !c.state.singleSelect)
      return handleCtrlSelect(data);
    if (event.shiftKey && !c.state.singleSelect)
      return handleShiftSelect(data);
    if (c.editShowMode === "row" && c.allowRowEdit) {
      const row = c.findRowState(data);
      if (row) {
        await c.switchRowEdit(row);
      }
    } else {
      await c.onRowClick(data);
    }
  }
  let forbidClick = false;
  async function onRowClick(data, _column, event) {
    var _a;
    if (data.isGroupRow) {
      (_a = tableRef.value) == null ? void 0 : _a.store.loadOrToggle(data);
      return;
    }
    if (!event.shiftKey) {
      const index = c.findRowStateIndex(data);
      const isSelected = c.state.selectedData.includes(data);
      lastSelectedIndex = isSelected ? null : index;
    }
    if (c.state.isAutoGrid) {
      await onRowClickDynamic(data, _column, event);
      return;
    }
    if (data.srfuf === Srfuf.CREATE || forbidClick)
      return;
    if (event.ctrlKey && !c.state.singleSelect)
      return handleCtrlSelect(data);
    if (event.shiftKey && !c.state.singleSelect)
      return handleShiftSelect(data);
    const target = event.target;
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
      await c.onRowClick(data);
    }
    forbidClick = true;
    setTimeout(() => {
      forbidClick = false;
    }, 200);
  }
  function onDbRowClick(data) {
    if (data.srfuf === Srfuf.CREATE || data.isGroupRow)
      return;
    c.onDbRowClick(data);
  }
  function onSelectionChange(selection) {
    if (!forbidChange && !c.state.isLoading)
      c.setSelection(selection);
    if (c.state.selectedData.length === c.state.items.length && c.state.items.length !== 0) {
      c.state.isSelectedAll = true;
    } else {
      c.state.isSelectedAll = false;
    }
  }
  const elSelection = computed(() => {
    const items = [];
    const keys = c.state.selectedData.map((selected) => selected.srfkey);
    if (tableRef.value)
      recursiveIterate(
        { children: tableRef.value.store.states.data.value },
        (item) => {
          if (keys.includes(item.srfkey))
            items.push(item);
        }
      );
    return items;
  });
  watch(
    [
      () => tableRef.value,
      () => c.state.isLoaded,
      () => c.state.selectedData
    ],
    ([table, isLoaded, _newVal]) => {
      if (!isLoaded || !table)
        return;
      forbidChange = true;
      setTimeout(() => {
        if (c.state.singleSelect) {
          table.setCurrentRow(elSelection.value[0]);
        } else {
          table.store.states.selection.value = elSelection.value;
        }
        forbidChange = false;
      });
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
      c.state.items = orderBy(
        c.state.items,
        [(item) => {
          var _a;
          return ((_a = item == null ? void 0 : item[fieldName || ""]) == null ? void 0 : _a.length) || 0;
        }],
        [order1 || "asc"]
      );
      c.state.rows = c.state.items.map((item) => {
        const row = new GridRowState(new ControlVO(item), c);
        return row;
      });
      return;
    }
    c.setSort(fieldName, order1);
    if (c.model.sortMode !== "LOCAL")
      c.load({
        isInitialLoad: c.model.pagingMode === 2 || c.model.pagingMode === 3
      });
  }
  function handleRowClassName({ row }) {
    let activeClassName = "";
    if (c.state.selectedData.length > 0) {
      c.state.selectedData.forEach((data) => {
        if (data === row || data.srfkey === row.srfkey)
          activeClassName = "current-row";
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
    const columnModel = allGridColumns.find((gridColumn) => {
      return gridColumn.codeName === column.property;
    });
    if (columnModel && columnModel.headerSysCss && columnModel.headerSysCss.cssName) {
      return columnModel.headerSysCss.cssName;
    }
    return "";
  }
  watch(
    () => c.state.sortQuery,
    (newVal) => {
      var _a, _b;
      if (newVal) {
        const prop = c.state.sortQuery.split(",")[0];
        const sortDir = c.state.sortQuery.split(",")[1];
        const column = (_a = c.model.degridColumns) == null ? void 0 : _a.find((_column) => {
          var _a2;
          return ((_a2 = _column.codeName) == null ? void 0 : _a2.toLowerCase()) === prop.toLowerCase();
        });
        if (column && sortDir) {
          const order = sortDir === "desc" ? "descending" : "ascending";
          const sortTable = () => {
            if (tableRef.value) {
              nextTick(() => {
                if (newVal !== c.state.sortQuery)
                  return;
                isGridUISort = true;
                tableRef.value.sort(column.codeName, order);
              });
            } else {
              setTimeout(sortTable, 500);
            }
          };
          sortTable();
        }
      } else {
        (_b = tableRef.value) == null ? void 0 : _b.clearSort();
      }
    }
  );
  function onSelectAll(selections) {
    if (selections.length === c.state.items.length) {
      c.state.isSelectedAll = true;
    } else {
      c.state.isSelectedAll = false;
    }
  }
  return {
    tableRef,
    onRowClick,
    onDbRowClick,
    onSelectionChange,
    onSortChange,
    handleRowClassName,
    handleHeaderCellClassName,
    cleanClick,
    cleanEnter,
    cleanTab,
    onSelectAll
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
function useAppGridBase(c, props, tableRef) {
  const initSimpleData = () => {
    if (!props.data)
      return;
    const items = props.data.map((item) => new ControlVO(item));
    c.state.items = items;
    if (c.runMode === "DESIGN") {
      c.state.simpleData = items;
      c.state.total = props.data.length;
      c.state.curPage = 1;
      c.state.items = chunk(c.state.simpleData, c.state.size)[c.state.curPage - 1] || [];
    }
    c.afterLoad({ isInitialLoad: true }, c.state.items);
  };
  const defaultSort = computed(() => {
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
  watch(
    () => props.data,
    () => {
      if (props.isSimple)
        initSimpleData();
    },
    {
      deep: true
    }
  );
  const tableData = computed(() => {
    const state = c.state;
    if (c.state.enableGroup) {
      const grouprowmode = c.controlParams.grouprowmode;
      const result = [];
      state.groups.forEach((item) => {
        if (!item.children.length)
          return;
        if (grouprowmode === "NEWROW") {
          result.push({
            ...item,
            srfkey: item.key,
            tempsrfkey: item.key,
            isGroupRow: true
          });
        } else {
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
        }
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
  const calcGroupColumns = (groupColumn) => {
    const result = { ...groupColumn };
    const columns = [];
    const degridColumns = groupColumn.degridColumns || [];
    degridColumns.forEach((column) => {
      var _a, _b;
      if (column.columnType === "GROUPGRIDCOLUMN") {
        const children = calcGroupColumns(column);
        if (children.degridColumns && children.degridColumns.length) {
          columns.push(children);
        }
      } else {
        const columnState = c.state.columnStates.find(
          (item) => item.key === column.codeName
        );
        if (columnState && !columnState.hidden) {
          const columnModel = ((_a = c.fieldColumns[columnState.key]) == null ? void 0 : _a.model) || ((_b = c.uaColumns[columnState.key]) == null ? void 0 : _b.model);
          if (columnModel) {
            columns.push(columnModel);
          }
        }
      }
    });
    result.degridColumns = columns;
    return result;
  };
  const renderColumns = computed(() => {
    const columns = [];
    if (c.isMultistageHeader) {
      const degridColumns = c.model.degridColumns || [];
      degridColumns.forEach((column) => {
        var _a, _b;
        if (column.columnType === "GROUPGRIDCOLUMN") {
          const groupColumn = calcGroupColumns(column);
          if (groupColumn.degridColumns && groupColumn.degridColumns.length) {
            columns.push(groupColumn);
          }
        } else {
          const columnState = c.state.columnStates.find(
            (item) => item.key === column.codeName
          );
          if (columnState && !columnState.hidden) {
            const columnModel = ((_a = c.fieldColumns[columnState.key]) == null ? void 0 : _a.model) || ((_b = c.uaColumns[columnState.key]) == null ? void 0 : _b.model);
            if (columnModel) {
              columns.push(columnModel);
            }
          }
        }
      });
      return columns;
    }
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
    var _a;
    const spanMethodAttribute = (_a = c.model.controlAttributes) == null ? void 0 : _a.find((item) => {
      return item.attrName === "span-method" && item.attrValue;
    });
    if (spanMethodAttribute) {
      return ScriptFactory.execScriptFn(
        {
          ...c.getEventArgs(),
          metadata: {
            row,
            column,
            rowIndex,
            columnIndex,
            items: tableRef.value.store.states.data.value
          }
        },
        spanMethodAttribute.attrValue,
        { isAsync: false }
      );
    }
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
    if (row.isGroupRow) {
      const total = c.state.singleSelect ? renderColumns.value.length : renderColumns.value.length + 1;
      const index = c.state.singleSelect ? 0 : 1;
      if (columnIndex === index)
        return { rowspan: 1, colspan: total };
      return {
        rowspan: 0,
        colspan: 0
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
  const headerCssVars = ref({});
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
              "setting-height": "".concat(height, "px")
            };
            headerCssVars.value = ns.cssVarBlock(tempCssVars);
            lastGridHeaderHeight = height;
          }
        });
        resizeObserver.observe(gridHeaderDom);
      }
    }
  };
  const stop = watchEffect(() => {
    if (tableRef.value) {
      calcGridHeaderHeight();
    }
  });
  onUnmounted(() => {
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
    const cleanDragStart = listenJSEvent(
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
    const cleanDragEnter = listenJSEvent(
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
    const cleanDragOver = listenJSEvent(
      item,
      "dragover",
      (event) => {
        event.preventDefault();
      }
    );
    const cleanDragEnd = listenJSEvent(item, "dragend", (event) => {
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
  const cleanup = () => {
    cleanups.forEach((cleanupF) => {
      cleanupF();
    });
  };
  const setDragEvent = () => {
    cleanup();
    const grid = tableRef.value.$el;
    if (grid) {
      const rows = grid.getElementsByClassName("el-table__row");
      rows.forEach((item) => {
        setRowDragEvent(item);
      });
    }
  };
  watch(
    [() => tableRef.value, () => c.state.isLoaded],
    (table, isLoaded) => {
      if (!isLoaded || !table) {
        return;
      }
      setDragEvent();
    }
  );
  return {
    cleanup,
    setDragEvent
  };
}

export { useAppGridBase, useAppGridPagination, useGridDraggable, useGridHeaderStyle, useITableEvent };
