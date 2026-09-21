'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var virtualizedTable_util = require('./virtualized-table.util.cjs');
require('../../../util/index.cjs');
require('./virtualized-table.css');
var usePagination = require('../../../util/pagination/use-pagination.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const VirtualizedTableControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = vue3Util.useControlController((...args) => new runtime.GridController(...args));
    const ns = vue3Util.useNamespace("control-virtualized-table");
    const {
      zIndex
    } = vue3Util.useUIStore();
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
    } = virtualizedTable_util.useVirtualizedTable(c, props);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination.usePagination(c);
    vue.onUnmounted(() => {
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
          return vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
            "modelData": quickToolbar,
            "context": c.context,
            "params": c.params,
            "class": ns.e("quick-toolbar")
          }, null);
        }
        const noDataSlots = {};
        if (vue3Util.hasEmptyPanelRenderer(c)) {
          Object.assign(noDataSlots, {
            customRender: () => vue.createVNode(vue3Util.IBizCustomRender, {
              "controller": c
            }, null)
          });
        }
        return vue.createVNode(vue.resolveComponent("iBizNoData"), {
          "text": c.model.emptyText,
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes,
          "hideNoDataImage": c.state.hideNoDataImage
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
      return vue.createVNode("div", null, null);
    };
    const renderBatchToolBar = () => {
      var _a;
      const batchToolbar = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_batchtoolbar");
      });
      if (!batchToolbar || c.state.singleSelect || !c.state.selectedData.length)
        return;
      return vue.createVNode("div", {
        "class": [ns.e("batch-toolbar"), ns.is("show", c.state.selectedData.length > 0)]
      }, [vue.createVNode("div", {
        "class": ns.em("batch-toolbar", "content")
      }, [vue.createVNode("div", {
        "class": ns.em("batch-toolbar", "text")
      }, [ibiz.i18n.t("control.common.itemsSelected", {
        length: c.state.selectedData.length
      })]), vue.createVNode("div", {
        "class": ns.em("batch-toolbar", "separator")
      }, [vue.createTextVNode("|")]), vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
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
        return vue.createVNode("div", {
          "class": [ns.e("cell"), ns.e("header-cell"), ns.em("cell", align || "left")]
        }, [vue.createVNode(vue.resolveComponent("el-checkbox"), {
          "modelValue": isAllSelected(),
          "onChange": (val) => handleSelectAll(val),
          "indeterminate": c.state.selectedData.length > 0 && !isAllSelected()
        }, null)]);
      return vue.createVNode("div", {
        "class": [ns.e("cell"), ns.e("header-cell"), ns.is("sortable", !!enableSort), ns.em("cell", align || "left")],
        "onClick": (e) => handleHeaderCellClick(e, column)
      }, [vue.createVNode("span", {
        "class": ns.em("header-cell", "caption")
      }, [title]), enableSort && vue.createVNode("span", {
        "class": ns.e("caret-wrapper")
      }, [vue.createVNode("i", {
        "class": [ns.em("caret-wrapper", "asc"), ns.em("caret-wrapper", "sort-caret"), ns.is("active", prop === key && order === "asc")],
        "onClick": (e) => handleSortClick(e, column, "asc")
      }, null), vue.createVNode("i", {
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
        return vue.createVNode("div", {
          "class": [ns.e("cell"), ns.e("body-cell"), ns.em("cell", align || "left")],
          "onClick": (evt) => evt.stopPropagation()
        }, [vue.createVNode(vue.resolveComponent("el-checkbox"), {
          "onChange": () => handleSelectionChange(rowData),
          "modelValue": isSelected(rowData)
        }, null)]);
      const controller = c.columns[key];
      const {
        columnType
      } = controller.model;
      const row = c.findRowState(rowData);
      return vue.createVNode("div", {
        "class": [ns.e("cell"), ns.e("body-cell"), ns.em("cell", align || "left")]
      }, [columnType === "DEFGRIDCOLUMN" ? vue.createVNode(vue.resolveComponent("iBizGridFieldColumn"), {
        "controller": controller,
        "row": row
      }, null) : vue.createVNode(vue.resolveComponent("iBizGridUAColumn"), {
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
    return vue.createVNode(vue.resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizControlBase"), {
        "controller": this.c,
        "class": [this.ns.b(), this.ns.m(this.c.overflowMode), this.ns.is("dynamic-grid", this.c.state.isAutoGrid), this.ns.is("show-header", !this.c.state.hideHeader), this.ns.is("enable-page", this.c.state.enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("single-select", this.c.state.singleSelect), this.ns.is("empty", this.c.state.items.length === 0), this.ns.is("enable-customized", this.c.model.enableCustomized)]
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-auto-resizer"), null, {
          default: ({
            height,
            width
          }) => {
            const columns = this.calcColumnWidth(this.columnModel, width);
            return vue.withDirectives(vue.createVNode(vue.resolveComponent("el-table-v2"), {
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
            }), [[vue.resolveDirective("scrollbarSize"), 4]]);
          }
        }), this.c.model.enableCustomized && !this.c.state.hideHeader && vue.createVNode("div", {
          "class": this.ns.e("setting-box")
        }, [vue.createVNode(vue.resolveComponent("iBizGridSetting"), {
          "controller": this.c,
          "columnStates": this.c.state.columnStates
        }, null)]), this.renderBatchToolBar()]
      })]
    });
  }
});

exports.VirtualizedTableControl = VirtualizedTableControl;
