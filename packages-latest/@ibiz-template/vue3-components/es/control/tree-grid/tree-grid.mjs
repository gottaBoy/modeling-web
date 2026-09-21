import { isVNode, defineComponent, createVNode, resolveComponent, mergeProps, nextTick, watch, createTextVNode, renderSlot } from 'vue';
import { useControlController, useControlPopoverzIndex, useNamespace, useSemanticNode, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import { recursiveIterate } from '@ibiz-template/core';
import { filterPresetAttrs, ScriptFactory, TreeGridController } from '@ibiz-template/runtime';
import { useRowEditPopover } from '../grid/row-edit-popover/use-row-edit-popover.mjs';
import '../grid/grid/index.mjs';
import { renderChildColumn } from '../grid/grid/grid.mjs';
import '../../util/index.mjs';
import { useITableEvent, useAppGridPagination, useAppGridBase, useGridHeaderStyle } from '../grid/grid/grid-control.util.mjs';
import { usePagination } from '../../util/pagination/use-pagination.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function renderAttrs(model, params) {
  const attrs = {};
  filterPresetAttrs(model.controlAttributes).forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = ScriptFactory.execSingleLine(item.attrValue, {
        ...params
      });
    }
  });
  return attrs;
}
const TreeGridControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new TreeGridController(...args));
    useControlPopoverzIndex(c);
    const ns = useNamespace("control-grid");
    const ns2 = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const {
      tableRef,
      onRowClick,
      onDbRowClick,
      onSortChange,
      onSelectionChange,
      handleRowClassName,
      handleHeaderCellClassName
    } = useITableEvent(c);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = useAppGridPagination(c);
    const {
      pageSemantic
    } = usePagination(c);
    const {
      tableData,
      defaultSort,
      renderColumns,
      summaryMethod,
      headerDragend
    } = useAppGridBase(c, props, tableRef);
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
            "class": [ns.b("quick-toolbar"), semanticClass("quicktoolbar", {
              model: quickToolbar
            })],
            "style": semanticStyle("quicktoolbar", {
              model: quickToolbar
            })
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
        recursiveIterate({
          children: table.store.states.data.value
        }, (item) => {
          if (selectKeys.includes(item.srfkey))
            selection.push(item);
        });
        nextTick(() => {
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
          nextTick(() => {
            tableRef.value.store.loadOrToggle(node);
          });
      });
      handleDefaultSelect();
    };
    watch(() => tableRef.value, () => {
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
      return createVNode("div", {
        "class": [ns.b("batch-toolbar"), ns.is("show", c.showBatchToolbar), semanticClass("batchtoolbar", {
          model: batchToolbar
        })],
        "style": semanticStyle("batchtoolbar", {
          model: batchToolbar
        })
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
      return renderChildColumn(c, model, renderColumns.value, index, slots, semanticClass, semanticStyle);
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
    return createVNode(resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizControlBase"), {
        "class": [this.ns.b(), this.ns2.b(), this.ns.is("show-header", !hideHeader), this.ns.is("enable-page", enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("enable-customized", this.c.model.enableCustomized), this.semanticClass("root")],
        "controller": this.c,
        "style": [this.headerCssVars, this.semanticStyle("root")]
      }, {
        default: () => {
          var _a;
          return [this.c.state.isLoaded && createVNode(resolveComponent("el-table"), mergeProps({
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
              return [!state.singleSelect && createVNode(resolveComponent("el-table-column"), {
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
          }), enablePagingBar && createVNode(resolveComponent("iBizPagination"), {
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
          }, null), this.c.model.enableCustomized && !hideHeader && createVNode("div", {
            "class": this.ns.b("setting-box")
          }, [createVNode(resolveComponent("iBizGridSetting"), {
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

export { TreeGridControl };
