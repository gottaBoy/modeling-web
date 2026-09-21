'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var useRowEditPopover = require('../grid/row-edit-popover/use-row-edit-popover.cjs');
require('../grid/grid/index.cjs');
var grid = require('../grid/grid/grid.cjs');
var gridControl_util = require('../grid/grid/grid-control.util.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const TreeGridControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeGridControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    /**
     * 部件行数据默认激活模式
     * - 0 不激活
     * - 1 单击激活
     * - 2 双击激活(默认值)
     *
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    rowEditOpen: {
      type: Boolean,
      default: void 0
    },
    isSimple: {
      type: Boolean,
      required: false
    },
    data: {
      type: Array,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props, {
    slots
  }) {
    const c = vue3Util.useControlController((...args) => new runtime.TreeGridController(...args));
    const ns = vue3Util.useNamespace("control-grid");
    const ns2 = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      tableRef,
      onRowClick,
      onDbRowClick,
      onSelectionChange,
      onSortChange,
      handleRowClassName
    } = gridControl_util.useITableEvent(c);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = gridControl_util.useAppGridPagination(c);
    const {
      tableData,
      renderColumns,
      defaultSort,
      summaryMethod,
      headerDragend
    } = gridControl_util.useAppGridBase(c, props);
    const {
      renderPopover
    } = useRowEditPopover.useRowEditPopover(tableRef, c);
    const {
      headerCssVars
    } = gridControl_util.useGridHeaderStyle(tableRef, ns);
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
            "class": ns.b("quick-toolbar")
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
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
      return null;
    };
    const loadData = async (item, _row, callback) => {
      const treeGirdItems = c.state.items.map((data) => c.getTreeGridDataItem(data));
      const items = treeGirdItems.filter((data) => item[c.treeGridValueField] === data[c.treeGridParentField]);
      item.children = items;
      callback(items);
    };
    const renderBatchToolBar = () => {
      var _a;
      const batchToolbar = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
        return item.name === "".concat(c.model.name, "_batchtoolbar");
      });
      if (!batchToolbar || c.state.singleSelect) {
        return;
      }
      return vue.createVNode("div", {
        "class": [ns.b("batch-toolbar"), ns.is("show", c.state.selectedData.length > 0)]
      }, [vue.createVNode("div", {
        "class": ns.b("batch-toolbar-content")
      }, [vue.createVNode("div", {
        "class": ns.b("batch-toolbar-text")
      }, [ibiz.i18n.t("control.common.itemsSelected", {
        length: c.state.selectedData.length
      })]), vue.createVNode("div", {
        "class": ns.b("batch-toolbar-separator")
      }, [vue.createTextVNode("|")]), vue.createVNode(vue.resolveComponent("iBizToolbarControl"), {
        "modelData": batchToolbar,
        "context": c.context,
        "params": c.params,
        "class": ns.b("batch-toolbar-items")
      }, null)])]);
    };
    const renderColumn = (model, index) => {
      if (slots[model.id]) {
        return vue.renderSlot(slots, model.id, {
          model,
          data: c.state.items
        });
      }
      return grid.renderChildColumn(c, model, renderColumns.value, index);
    };
    return {
      c,
      ns,
      ns2,
      tableRef,
      tableData,
      renderColumns,
      renderColumn,
      defaultSort,
      onDbRowClick,
      onRowClick,
      onSelectionChange,
      onSortChange,
      onPageChange,
      onPageSizeChange,
      onPageRefresh,
      handleRowClassName,
      renderNoData,
      loadData,
      summaryMethod,
      headerDragend,
      renderPopover,
      renderBatchToolBar,
      headerCssVars
    };
  },
  render() {
    const state = this.c.state;
    const {
      hideHeader,
      enablePagingBar
    } = this.c.model;
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "class": [this.ns.b(), this.ns2.b(), this.ns.is("show-header", !hideHeader), this.ns.is("enable-page", enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("enable-customized", this.c.model.enableCustomized)],
      "controller": this.c,
      "style": this.headerCssVars
    }, {
      default: () => [this.c.state.isLoaded && vue.createVNode(vue.resolveComponent("el-table"), {
        "ref": "tableRef",
        "class": this.ns.e("table"),
        "default-sort": this.defaultSort,
        "border": true,
        "show-header": !hideHeader,
        "show-summary": this.c.enableAgg,
        "summary-method": this.summaryMethod,
        "highlight-current-row": state.singleSelect,
        "row-class-name": this.handleRowClassName,
        "row-key": "srfkey",
        "data": this.c.state.showTreeGrid ? state.treeGirdData : this.tableData,
        "onRowClick": this.onRowClick,
        "onRowDblclick": this.onDbRowClick,
        "onSelectionChange": this.onSelectionChange,
        "onSortChange": this.onSortChange,
        "onHeaderDragend": this.headerDragend,
        "tooltip-effect": "light",
        "tree-props": {
          children: "children",
          hasChildren: "hasChildren"
        },
        "load": this.loadData,
        "lazy": true
      }, {
        empty: this.renderNoData,
        default: () => {
          return [!state.singleSelect && vue.createVNode(vue.resolveComponent("el-table-column"), {
            "class-name": this.ns.e("selection"),
            "type": "selection",
            "width": "55"
          }, null), state.isCreated && this.renderColumns.map((model, index) => {
            return this.renderColumn(model, index);
          })];
        },
        append: () => {
          return this.renderPopover();
        }
      }), enablePagingBar && vue.createVNode(vue.resolveComponent("iBizPagination"), {
        "total": state.total,
        "curPage": state.curPage,
        "size": state.size,
        "totalPages": state.totalPages,
        "onChange": this.onPageChange,
        "onPageSizeChange": this.onPageSizeChange,
        "onPageRefresh": this.onPageRefresh
      }, null), this.c.model.enableCustomized && !hideHeader && vue.createVNode("div", {
        "class": this.ns.b("setting-box")
      }, [vue.createVNode(vue.resolveComponent("iBizGridSetting"), {
        "columnStates": state.columnStates,
        "controller": this.c
      }, null)]), this.renderBatchToolBar()]
    });
  }
});

exports.TreeGridControl = TreeGridControl;
