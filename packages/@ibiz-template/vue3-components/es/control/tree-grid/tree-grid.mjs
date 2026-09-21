import { isVNode, defineComponent, createVNode, resolveComponent, createTextVNode, renderSlot } from 'vue';
import { useControlController, useNamespace, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { TreeGridController } from '@ibiz-template/runtime';
import { useRowEditPopover } from '../grid/row-edit-popover/use-row-edit-popover.mjs';
import '../grid/grid/index.mjs';
import { renderChildColumn } from '../grid/grid/grid.mjs';
import { useITableEvent, useAppGridPagination, useAppGridBase, useGridHeaderStyle } from '../grid/grid/grid-control.util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TreeGridControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new TreeGridController(...args));
    const ns = useNamespace("control-grid");
    const ns2 = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      tableRef,
      onRowClick,
      onDbRowClick,
      onSelectionChange,
      onSortChange,
      handleRowClassName
    } = useITableEvent(c);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = useAppGridPagination(c);
    const {
      tableData,
      renderColumns,
      defaultSort,
      summaryMethod,
      headerDragend
    } = useAppGridBase(c, props);
    const {
      renderPopover
    } = useRowEditPopover(tableRef, c);
    const {
      headerCssVars
    } = useGridHeaderStyle(tableRef, ns);
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
            "class": ns.b("quick-toolbar")
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
      return createVNode("div", {
        "class": [ns.b("batch-toolbar"), ns.is("show", c.state.selectedData.length > 0)]
      }, [createVNode("div", {
        "class": ns.b("batch-toolbar-content")
      }, [createVNode("div", {
        "class": ns.b("batch-toolbar-text")
      }, [ibiz.i18n.t("control.common.itemsSelected", {
        length: c.state.selectedData.length
      })]), createVNode("div", {
        "class": ns.b("batch-toolbar-separator")
      }, [createTextVNode("|")]), createVNode(resolveComponent("iBizToolbarControl"), {
        "modelData": batchToolbar,
        "context": c.context,
        "params": c.params,
        "class": ns.b("batch-toolbar-items")
      }, null)])]);
    };
    const renderColumn = (model, index) => {
      if (slots[model.id]) {
        return renderSlot(slots, model.id, {
          model,
          data: c.state.items
        });
      }
      return renderChildColumn(c, model, renderColumns.value, index);
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
    return createVNode(resolveComponent("iBizControlBase"), {
      "class": [this.ns.b(), this.ns2.b(), this.ns.is("show-header", !hideHeader), this.ns.is("enable-page", enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("enable-customized", this.c.model.enableCustomized)],
      "controller": this.c,
      "style": this.headerCssVars
    }, {
      default: () => [this.c.state.isLoaded && createVNode(resolveComponent("el-table"), {
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
          return [!state.singleSelect && createVNode(resolveComponent("el-table-column"), {
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
      }), enablePagingBar && createVNode(resolveComponent("iBizPagination"), {
        "total": state.total,
        "curPage": state.curPage,
        "size": state.size,
        "totalPages": state.totalPages,
        "onChange": this.onPageChange,
        "onPageSizeChange": this.onPageSizeChange,
        "onPageRefresh": this.onPageRefresh
      }, null), this.c.model.enableCustomized && !hideHeader && createVNode("div", {
        "class": this.ns.b("setting-box")
      }, [createVNode(resolveComponent("iBizGridSetting"), {
        "columnStates": state.columnStates,
        "controller": this.c
      }, null)]), this.renderBatchToolBar()]
    });
  }
});

export { TreeGridControl };
