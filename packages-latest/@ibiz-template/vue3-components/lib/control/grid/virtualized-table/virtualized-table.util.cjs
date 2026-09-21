'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');

"use strict";
function useVirtualizedTable(c, props) {
  const initSimpleData = () => {
    if (!props.data)
      return;
    c.state.items = props.data;
    c.state.rows = c.state.items.map((item) => {
      const row = new runtime.GridRowState(new runtime.ControlVO(item), c);
      return row;
    });
    c.calcAggResult(c.state.items);
    c.calcTotalData();
  };
  c.evt.on("onCreated", async () => {
    if (c.state.isSimple)
      initSimpleData();
  });
  vue.watch(
    () => props.data,
    () => {
      if (c.state.isSimple)
        initSimpleData();
    },
    {
      deep: true
    }
  );
  const tableRef = vue.ref();
  const tableData = vue.computed(() => {
    return c.state.rows.map((row) => row.data);
  });
  const sortValue = vue.computed(() => {
    var _a;
    const [
      prop = c.model.minorSortAppDEFieldId,
      order = (_a = c.model.minorSortDir) == null ? void 0 : _a.toLowerCase()
    ] = c.state.sortQuery.split(",");
    return {
      prop,
      order
    };
  });
  const columnModel = vue.computed(() => {
    const { columnStates, singleSelect } = c.state;
    const columns = [];
    if (!singleSelect)
      columns.push({
        key: c.id,
        width: 55,
        align: "center",
        type: "selection",
        widthUnit: "PX",
        hidden: false,
        class: "is-selection",
        headerClass: "is-selection"
      });
    const { degridColumns } = c.model;
    degridColumns == null ? void 0 : degridColumns.forEach((model) => {
      const {
        align,
        width,
        caption,
        codeName,
        widthUnit,
        columnType,
        cellSysCss,
        enableSort
      } = model;
      const state = columnStates.find((s) => s.key === codeName);
      columns.push({
        key: codeName,
        title: caption,
        width: width || 160,
        hidden: (state == null ? void 0 : state.hidden) === true,
        enableSort: !!enableSort,
        class: cellSysCss == null ? void 0 : cellSysCss.cssName,
        widthUnit: widthUnit || "PX",
        type: columnType.toLowerCase(),
        headerClass: cellSysCss == null ? void 0 : cellSysCss.cssName,
        align: (align == null ? void 0 : align.toLowerCase()) || "center"
      });
    });
    return columns;
  });
  function toggleOrder(order) {
    const sortOrders = ["asc", "desc", void 0];
    if (order === void 0)
      return sortOrders[0];
    const index = sortOrders.indexOf(order || null);
    return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
  }
  function handleSortChange(prop, order) {
    const fieldName = c.fieldColumns[prop].model.appDEFieldId;
    const sortQuery = "".concat(fieldName, ",").concat(order);
    if (sortQuery === c.state.sortQuery)
      return;
    c.setSort(fieldName, order);
    c.load({
      isInitialLoad: c.model.pagingMode === 2 || c.model.pagingMode === 3
    });
  }
  async function handleRowClick(event, data) {
    if (data.srfuf === runtime.Srfuf.CREATE)
      return;
    await c.onRowClick(data);
  }
  async function handleDbRowClick(event, data) {
    if (data.srfuf === runtime.Srfuf.CREATE)
      return;
    await c.onDbRowClick(data);
  }
  function handleHeaderCellClick(event, column) {
    const { enableSort, key } = column;
    if (enableSort) {
      const { prop, order } = sortValue.value;
      let newOrder = "asc";
      if (prop === key)
        newOrder = toggleOrder(order);
      handleSortChange(key, newOrder);
    }
  }
  function handleSortClick(event, column, newOrder) {
    event.stopPropagation();
    const { prop, order } = sortValue.value;
    const { key } = column;
    if (prop === key && newOrder === order)
      newOrder = void 0;
    handleSortChange(key, newOrder);
  }
  function isSelected(data) {
    return !!c.state.selectedData.find((x) => x.srfkey === data.srfkey);
  }
  function isAllSelected() {
    return tableData.value.length > 0 && tableData.value.every(
      (data) => !!c.state.selectedData.find(
        (selected) => data.srfkey === selected.srfkey
      )
    );
  }
  function handleSelectAll(state) {
    c.setSelection(state ? [...c.state.items] : []);
  }
  function handleSelectionChange(data) {
    const selection = [...c.state.selectedData];
    const index = selection.findIndex(
      (selected) => selected.srfkey === data.srfkey
    );
    index === -1 ? selection.push(data) : selection.splice(index, 1);
    c.setSelection([...selection]);
  }
  function calcColumnWidth(_columns, bodyWidth) {
    const columns = [..._columns];
    const showColumns = columnModel.value.filter((model) => !model.hidden);
    const totalWidth = showColumns.reduce(
      (accumulator, currentValue) => accumulator + currentValue.width,
      0
    );
    if (bodyWidth > totalWidth && showColumns.length) {
      let adaptiveColumn = showColumns.filter(
        (model) => model.widthUnit === "STAR"
      );
      if (!adaptiveColumn.length)
        adaptiveColumn = [showColumns[showColumns.length - 1]];
      const width = (bodyWidth - totalWidth - 6) / adaptiveColumn.length;
      adaptiveColumn.forEach((column) => {
        column.width += width;
      });
    }
    return columns;
  }
  return {
    tableRef,
    tableData,
    sortValue,
    columnModel,
    isSelected,
    isAllSelected,
    handleRowClick,
    handleSortClick,
    handleSelectAll,
    calcColumnWidth,
    handleDbRowClick,
    handleHeaderCellClick,
    handleSelectionChange
  };
}

exports.useVirtualizedTable = useVirtualizedTable;
