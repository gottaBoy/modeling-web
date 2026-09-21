import { isVNode, defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, onUnmounted, createTextVNode } from 'vue';
import { useControlController, useNamespace, useUIStore, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { GridController } from '@ibiz-template/runtime';
import { useVirtualizedTable } from './virtualized-table.util.mjs';
import '../../../util/index.mjs';
import './virtualized-table.css';
import { usePagination } from '../../../util/pagination/use-pagination.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const VirtualizedTableControl = /* @__PURE__ */ defineComponent({
  name: "IBizVirtualizedTableControl",
  props: {
    /**
     * @description 表格模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 部件行数据默认激活模式，值为0:不激活，值为1：单击激活，值为2：双击激活
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    /**
     * @description 是否单选
     */
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    /**
     * @description 是否启用行编辑
     */
    rowEditOpen: {
      type: Boolean,
      default: void 0
    },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: {
      type: Boolean,
      required: false
    },
    /**
     * @description 简单模式下传入的数据
     */
    data: {
      type: Array,
      required: false
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const c = useControlController((...args) => new GridController(...args));
    const ns = useNamespace("control-virtualized-table");
    const {
      zIndex
    } = useUIStore();
    c.state.zIndex = zIndex.increment();
    const {
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
    } = useVirtualizedTable(c, props);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination(c);
    onUnmounted(() => {
      zIndex.decrement();
    });
    const calcRowClass = (params) => {
      const {
        rowData
      } = params;
      return "".concat(ns.is("selected", rowData && isSelected(rowData)));
    };
    const renderNoData = () => {
      var _a;
      const {
        isLoaded
      } = c.state;
      if (isLoaded) {
        const quickToolbar = (_a = c.model.controls) == null ? void 0 : _a.find((item) => item.name === "".concat(c.model.name, "_quicktoolbar"));
        if (quickToolbar) {
          return createVNode(resolveComponent("iBizToolbarControl"), {
            "modelData": quickToolbar,
            "context": c.context,
            "params": c.params,
            "class": ns.e("quick-toolbar")
          }, null);
        }
        const noDataSlots = {};
        if (hasEmptyPanelRenderer(c)) {
          Object.assign(noDataSlots, {
            customRender: () => createVNode(IBizCustomRender, {
              "controller": c
            }, null)
          });
        }
        return createVNode(resolveComponent("iBizNoData"), {
          "text": c.model.emptyText,
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes,
          "hideNoDataImage": c.state.hideNoDataImage
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
      return createVNode("div", null, null);
    };
    const renderBatchToolBar = () => {
      var _a;
      const batchToolbar = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_batchtoolbar");
      });
      if (!batchToolbar || c.state.singleSelect || !c.state.selectedData.length)
        return;
      return createVNode("div", {
        "class": [ns.e("batch-toolbar"), ns.is("show", c.state.selectedData.length > 0)]
      }, [createVNode("div", {
        "class": ns.em("batch-toolbar", "content")
      }, [createVNode("div", {
        "class": ns.em("batch-toolbar", "text")
      }, [ibiz.i18n.t("control.common.itemsSelected", {
        length: c.state.selectedData.length
      })]), createVNode("div", {
        "class": ns.em("batch-toolbar", "separator")
      }, [createTextVNode("|")]), createVNode(resolveComponent("iBizToolbarControl"), {
        "modelData": batchToolbar,
        "context": c.context,
        "params": c.params,
        "class": ns.b("batch-toolbar-items")
      }, null)])]);
    };
    const renderHeaderCell = (params) => {
      const {
        column
      } = params;
      const {
        type,
        enableSort,
        key,
        title,
        align
      } = column;
      const {
        prop,
        order
      } = sortValue.value;
      if (type === "selection")
        return createVNode("div", {
          "class": [ns.e("cell"), ns.e("header-cell"), ns.em("cell", align || "left")]
        }, [createVNode(resolveComponent("el-checkbox"), {
          "modelValue": isAllSelected(),
          "onChange": (val) => handleSelectAll(val),
          "indeterminate": c.state.selectedData.length > 0 && !isAllSelected()
        }, null)]);
      return createVNode("div", {
        "class": [ns.e("cell"), ns.e("header-cell"), ns.is("sortable", !!enableSort), ns.em("cell", align || "left")],
        "onClick": (e) => handleHeaderCellClick(e, column)
      }, [createVNode("span", {
        "class": ns.em("header-cell", "caption")
      }, [title]), enableSort && createVNode("span", {
        "class": ns.e("caret-wrapper")
      }, [createVNode("i", {
        "class": [ns.em("caret-wrapper", "asc"), ns.em("caret-wrapper", "sort-caret"), ns.is("active", prop === key && order === "asc")],
        "onClick": (e) => handleSortClick(e, column, "asc")
      }, null), createVNode("i", {
        "class": [ns.em("caret-wrapper", "desc"), ns.em("caret-wrapper", "sort-caret"), ns.is("active", prop === key && order === "desc")],
        "onClick": (e) => handleSortClick(e, column, "desc")
      }, null)])]);
    };
    const renderBodyCell = (params) => {
      const {
        column,
        rowData
      } = params;
      const {
        type,
        key,
        align
      } = column;
      if (type === "selection")
        return createVNode("div", {
          "class": [ns.e("cell"), ns.e("body-cell"), ns.em("cell", align || "left")],
          "onClick": (evt) => evt.stopPropagation()
        }, [createVNode(resolveComponent("el-checkbox"), {
          "onChange": () => handleSelectionChange(rowData),
          "modelValue": isSelected(rowData)
        }, null)]);
      const controller = c.columns[key];
      const {
        columnType
      } = controller.model;
      const row = c.findRowState(rowData);
      return createVNode("div", {
        "class": [ns.e("cell"), ns.e("body-cell"), ns.em("cell", align || "left")]
      }, [columnType === "DEFGRIDCOLUMN" ? createVNode(resolveComponent("iBizGridFieldColumn"), {
        "controller": controller,
        "row": row
      }, null) : createVNode(resolveComponent("iBizGridUAColumn"), {
        "controller": controller,
        "row": row
      }, null)]);
    };
    return {
      c,
      ns,
      tableRef,
      tableData,
      columnModel,
      onPageChange,
      onPageRefresh,
      onPageSizeChange,
      renderNoData,
      calcRowClass,
      renderBodyCell,
      handleRowClick,
      calcColumnWidth,
      handleDbRowClick,
      renderHeaderCell,
      renderBatchToolBar
    };
  },
  render() {
    if (!this.c.state.isCreated)
      return;
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "controller": this.c,
        "class": [this.ns.b(), this.ns.m(this.c.overflowMode), this.ns.is("dynamic-grid", this.c.state.isAutoGrid), this.ns.is("show-header", !this.c.state.hideHeader), this.ns.is("enable-page", this.c.state.enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("single-select", this.c.state.singleSelect), this.ns.is("empty", this.c.state.items.length === 0), this.ns.is("enable-customized", this.c.model.enableCustomized)]
      }, {
        default: () => [createVNode(resolveComponent("el-auto-resizer"), null, {
          default: ({
            height,
            width
          }) => {
            const columns = this.calcColumnWidth(this.columnModel, width);
            return withDirectives(createVNode(resolveComponent("el-table-v2"), {
              "fixed": true,
              "ref": "tableRef",
              "width": width,
              "height": height,
              "row-height": 54,
              "columns": columns,
              "header-height": 54,
              "hScrollbarSize": 4,
              "data": this.tableData,
              "class": this.ns.e("table"),
              "row-class": this.calcRowClass,
              "row-event-handlers": {
                onClick: ({
                  event,
                  rowData
                }) => this.handleRowClick(event, rowData),
                onDblclick: ({
                  event,
                  rowData
                }) => this.handleDbRowClick(event, rowData)
              }
            }, {
              empty: this.renderNoData,
              cell: this.renderBodyCell,
              "header-cell": this.renderHeaderCell
            }), [[resolveDirective("scrollbarSize"), 4]]);
          }
        }), this.c.model.enableCustomized && !this.c.state.hideHeader && createVNode("div", {
          "class": this.ns.e("setting-box")
        }, [createVNode(resolveComponent("iBizGridSetting"), {
          "controller": this.c,
          "columnStates": this.c.state.columnStates
        }, null)]), this.renderBatchToolBar()]
      })]
    });
  }
});

export { VirtualizedTableControl };
