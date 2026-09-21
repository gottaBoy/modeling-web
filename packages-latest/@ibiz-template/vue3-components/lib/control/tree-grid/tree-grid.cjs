'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var useRowEditPopover = require('../grid/row-edit-popover/use-row-edit-popover.cjs');
require('../grid/grid/index.cjs');
var grid = require('../grid/grid/grid.cjs');
require('../../util/index.cjs');
var gridControl_util = require('../grid/grid/grid-control.util.cjs');
var usePagination = require('../../util/pagination/use-pagination.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
function renderAttrs(model, params) {
  const attrs = {};
  runtime.filterPresetAttrs(model.controlAttributes).forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
        ...params
      });
    }
  });
  return attrs;
}
const TreeGridControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeGridControl",
  props: {
    /**
     * @description 树表格模型数据
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
     * @description 是否是单选
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
  setup(props, {
    slots
  }) {
    const c = vue3Util.useControlController((...args) => new runtime.TreeGridController(...args));
    vue3Util.useControlPopoverzIndex(c);
    const ns = vue3Util.useNamespace("control-grid");
    const ns2 = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const {
      tableRef,
      onRowClick,
      onDbRowClick,
      onSortChange,
      onSelectionChange,
      handleRowClassName,
      handleHeaderCellClassName
    } = gridControl_util.useITableEvent(c);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = gridControl_util.useAppGridPagination(c);
    const {
      pageSemantic
    } = usePagination.usePagination(c);
    const {
      tableData,
      defaultSort,
      renderColumns,
      summaryMethod,
      headerDragend
    } = gridControl_util.useAppGridBase(c, props, tableRef);
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
            "class": [ns.b("quick-toolbar"), semanticClass("quicktoolbar", {
              model: quickToolbar
            })],
            "style": semanticStyle("quicktoolbar", {
              model: quickToolbar
            })
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
          "class": semanticClass("empty"),
          "style": semanticStyle("empty"),
          "text": c.model.emptyText,
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
      return null;
    };
    const handleDefaultSelect = () => {
      const {
        expandRowKeys,
        selectedData,
        singleSelect
      } = c.state;
      const table = tableRef.value;
      if (!table || !selectedData.length)
        return;
      const treeData = table.store.states.treeData.value;
      const expandKeys = Object.keys(treeData).filter((key) => treeData[key].loaded);
      if (expandRowKeys.length === expandKeys.length && expandRowKeys.sort().every((item, index) => item === expandKeys.sort()[index])) {
        const selection = [];
        const selectKeys = selectedData.map((selected) => selected.srfkey);
        core.recursiveIterate({
          children: table.store.states.data.value
        }, (item) => {
          if (selectKeys.includes(item.srfkey))
            selection.push(item);
        });
        vue.nextTick(() => {
          if (singleSelect) {
            table.setCurrentRow(selection[0]);
          } else {
            table.store.states.selection.value = selection;
          }
        });
      }
    };
    const handleDefaultExpand = (nodes) => {
      if (!tableRef.value || !c.state.expandRowKeys.length)
        return;
      c.state.expandRowKeys.forEach((key) => {
        const node = nodes.find((item) => item.srfkey === key);
        if (node)
          vue.nextTick(() => {
            tableRef.value.store.loadOrToggle(node);
          });
      });
      handleDefaultSelect();
    };
    vue.watch(() => tableRef.value, () => {
      handleDefaultExpand(c.state.treeGirdData);
    });
    const loadData = async (item, _row, callback) => {
      const treeGirdItems = c.state.items.map((data) => c.getTreeGridDataItem(data));
      const items = treeGirdItems.filter((data) => item[c.treeGridValueField] === data[c.treeGridParentField]);
      item.children = items;
      callback(items);
      handleDefaultExpand(items);
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
        "class": [ns.b("batch-toolbar"), ns.is("show", c.showBatchToolbar), semanticClass("batchtoolbar", {
          model: batchToolbar
        })],
        "style": semanticStyle("batchtoolbar", {
          model: batchToolbar
        })
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
      return grid.renderChildColumn(c, model, renderColumns.value, index, slots, semanticClass, semanticStyle);
    };
    return {
      c,
      ns,
      ns2,
      tableRef,
      tableData,
      defaultSort,
      renderColumns,
      headerCssVars,
      semanticClass,
      semanticStyle,
      pageSemantic,
      loadData,
      onRowClick,
      renderColumn,
      onDbRowClick,
      onSortChange,
      onPageChange,
      renderNoData,
      onPageRefresh,
      summaryMethod,
      headerDragend,
      renderPopover,
      onPageSizeChange,
      onSelectionChange,
      handleRowClassName,
      renderBatchToolBar,
      handleHeaderCellClassName
    };
  },
  render() {
    const state = this.c.state;
    const {
      hideHeader,
      enablePagingBar
    } = this.c.model;
    return vue.createVNode(vue.resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizControlBase"), {
        "class": [this.ns.b(), this.ns2.b(), this.ns.is("show-header", !hideHeader), this.ns.is("enable-page", enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("enable-customized", this.c.model.enableCustomized), this.semanticClass("root")],
        "controller": this.c,
        "style": [this.headerCssVars, this.semanticStyle("root")]
      }, {
        default: () => {
          var _a;
          return [this.c.state.isLoaded && vue.createVNode(vue.resolveComponent("el-table"), vue.mergeProps({
            "lazy": true,
            "border": true,
            "ref": "tableRef",
            "row-key": "srfkey",
            "load": this.loadData,
            "tooltip-effect": "light",
            "show-header": !hideHeader,
            "style": this.semanticStyle("content"),
            "class": [this.ns.e("table"), this.semanticClass("content")],
            "key": this.c.state.tableKey,
            "onRowClick": this.onRowClick,
            "default-sort": this.defaultSort,
            "show-summary": this.c.enableAgg,
            "onSortChange": this.onSortChange,
            "onRowDblclick": this.onDbRowClick,
            "summary-method": this.summaryMethod,
            "onHeaderDragend": this.headerDragend,
            "onSelectionChange": this.onSelectionChange,
            "highlight-current-row": state.singleSelect,
            "onExpandChange": (row, expanded) => this.c.expandChange(row, expanded),
            "row-class-name": (event) => {
              return [this.handleRowClassName(event), this.semanticClass("body.row", {
                event
              })].join(" ");
            },
            "header-row-class-name": (...args) => this.semanticClass("header.row", {
              args
            }),
            "row-style": (...args) => this.semanticStyle("body.row", {
              args
            }),
            "header-row-style": (...args) => this.semanticStyle("header.row", {
              args
            }),
            "cell-class-name": (...args) => this.semanticClass("body.cell", {
              args
            }),
            "header-cell-class-name": (data) => {
              return [this.handleHeaderCellClassName(data), this.semanticClass("header.cell", {
                event: data
              })].join(" ");
            },
            "cell-style": (...args) => this.semanticStyle("body.cell", {
              args
            }),
            "header-cell-style": this.semanticStyle("header.cell"),
            "tree-props": {
              children: "children",
              hasChildren: "hasChildren"
            },
            "data": this.c.state.showTreeGrid ? state.treeGirdData : this.tableData
          }, this.$attrs, renderAttrs(this.c.model, {
            ...this.c.getEventArgs()
          })), {
            empty: this.renderNoData,
            default: () => {
              return [!state.singleSelect && vue.createVNode(vue.resolveComponent("el-table-column"), {
                "width": "55",
                "type": "selection",
                "reserve-selection": true,
                "style": this.semanticStyle("selection"),
                "class-name": "".concat(this.ns.e("selection"), " ").concat(this.semanticClass("selection"))
              }, null), state.isCreated && this.renderColumns.map((model, index) => {
                return this.renderColumn(model, index);
              })];
            },
            append: () => {
              return this.renderPopover();
            }
          }), enablePagingBar && vue.createVNode(vue.resolveComponent("iBizPagination"), {
            "class": this.semanticClass("pagination"),
            "style": this.semanticStyle("pagination"),
            "semantic": this.pageSemantic,
            "mode": this.c.paginationMode,
            "total": state.total,
            "curPage": state.curPage,
            "size": state.size,
            "totalPages": state.totalPages,
            "onChange": this.onPageChange,
            "onPageSizeChange": this.onPageSizeChange,
            "onPageRefresh": this.onPageRefresh,
            "popperClass": "".concat(((_a = this.c.model.sysCss) == null ? void 0 : _a.cssName) || "default", "--popper")
          }, null), this.c.model.enableCustomized && !hideHeader && vue.createVNode("div", {
            "class": this.ns.b("setting-box")
          }, [vue.createVNode(vue.resolveComponent("iBizGridSetting"), {
            "class": this.semanticClass("setting"),
            "style": this.semanticStyle("setting"),
            "columnStates": state.columnStates,
            "controller": this.c
          }, null)]), this.renderBatchToolBar()];
        }
      })]
    });
  }
});

exports.TreeGridControl = TreeGridControl;
