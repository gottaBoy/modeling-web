'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var qxUtil = require('qx-util');
var ramda = require('ramda');
var gridControl_util = require('./grid-control.util.cjs');
var useRowEditPopover = require('../row-edit-popover/use-row-edit-popover.cjs');
require('../../../util/index.cjs');
require('./grid.css');
var usePagination = require('../../../util/pagination/use-pagination.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
function renderAttrs(model, params) {
  var _a;
  const attrs = {};
  (_a = model.controlAttributes) == null ? void 0 : _a.forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
        ...params
      });
    }
  });
  return attrs;
}
function renderFieldColumn(c, row) {
  var _a, _b;
  const ns = vue3Util.useNamespace("grid-field-column");
  const fieldValue = row.data[c.fieldName];
  let actionToolbar;
  if (c.model.deuiactionGroup) {
    const onActionClick = (detail, event) => {
      return c.onActionClick(detail, row, event);
    };
    const zIndex = c.grid.state.zIndex;
    actionToolbar = vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
      "class": ns.e("toolbar"),
      "action-details": c.model.deuiactionGroup.uiactionGroupDetails,
      "actions-state": row.uiActionGroupStates[c.model.codeName],
      "groupLevelKeys": [50, 100],
      "actionCallBack": onActionClick,
      "zIndex": zIndex
    }, null);
  } else {
    actionToolbar = null;
  }
  let content = null;
  const {
    controlRenders = []
  } = c.model;
  const panel = (_a = controlRenders.find((renderItem) => renderItem.renderType === "LAYOUTPANEL")) == null ? void 0 : _a.layoutPanel;
  if (panel) {
    content = vue.createVNode(vue.resolveComponent("iBizControlShell"), {
      "data": row.data,
      "modelData": panel,
      "context": c.context,
      "params": c.params
    }, null);
  } else {
    const showValue = c.formatValue(fieldValue);
    const tooltip = vue.computed(() => {
      if (c.grid.overflowMode === "ellipsis" && ramda.isNotNil(fieldValue) && fieldValue !== "") {
        return showValue + (c.model.unitName || "");
      }
      return void 0;
    });
    const hiddenEmpty = vue.computed(() => {
      if (fieldValue) {
        if (c.grid.emptyHiddenUnit) {
          if (showValue) {
            return true;
          }
          return false;
        }
        return true;
      }
      return false;
    });
    const percent = vue.computed(() => {
      const {
        grid,
        fieldName
      } = c;
      if (!grid.percentkeys.includes(fieldName)) {
        return "";
      }
      const percentValue = Number(fieldValue.value);
      if (!Number.isNaN(percentValue)) {
        const {
          totalResult = {}
        } = grid.state;
        const total = totalResult[fieldName];
        if (total && !Number.isNaN(total)) {
          return ibiz.util.text.format("".concat(percentValue / total), "0.##%");
        }
      }
      return "";
    });
    const onTextClick = (event) => {
      if (c.isLinkColumn) {
        event.stopPropagation();
        c.openLinkView(row, event);
      }
    };
    content = vue.createVNode("span", {
      "class": ns.e("text"),
      "title": core.showTitle(tooltip.value),
      "onClick": onTextClick
    }, [showValue, hiddenEmpty.value && c.model.unitName, percent.value && "(".concat(percent.value, ")")]);
  }
  const onCellClick = (event) => {
    if (c.hasAction) {
      event.stopPropagation();
      c.triggerAction(row, event);
    }
  };
  return vue.createVNode("div", {
    "class": [ns.b(), c.clickable(row) && ns.m("clickable"), ns.m(c.grid.overflowMode), (_b = c.model.cellSysCss) == null ? void 0 : _b.cssName, ns.is("has-action", !!c.model.deuiactionGroup)],
    "onClick": onCellClick
  }, [c.model.deuiactionGroup ? [vue.createVNode("div", {
    "class": ns.b("text-container")
  }, [content]), vue.createVNode("div", {
    "class": ns.b("toolbar-container")
  }, [actionToolbar])] : content]);
}
function renderColumn(c, model, renderColumns, index) {
  var _a, _b;
  const {
    codeName: columnName,
    width
  } = model;
  const columnC = c.columns[columnName];
  const columnState = c.state.columnStates.find((item) => item.key === columnName);
  const widthFlexGrow = columnC.isAdaptiveColumn || !c.hasAdaptiveColumn && index === renderColumns.length - 1;
  const widthName = widthFlexGrow ? "min-width" : "width";
  const tempWidth = (columnState == null ? void 0 : columnState.columnWidth) || width;
  return vue.createVNode(vue.resolveComponent("el-table-column"), vue.mergeProps({
    "className": (_a = model.columnType) == null ? void 0 : _a.toLowerCase(),
    "label": model.caption,
    "prop": columnName
  }, {
    [widthName]: tempWidth
  }, {
    "fixed": columnState.fixed,
    "sortable": model.enableSort ? "custom" : false,
    "align": ((_b = model.align) == null ? void 0 : _b.toLowerCase()) || "center"
  }), {
    default: ({
      row
    }) => {
      let elRow = row;
      if (row.isGroupData) {
        elRow = row.first;
      }
      const rowState = c.findRowState(elRow);
      if (rowState) {
        if (model.columnType === "DEFGRIDCOLUMN" || model.columnType === "DEFTREEGRIDCOLUMN") {
          if (c.providers[columnName].component === "IBizGridFieldColumn" && !columnC.isCustomCode && !columnC.codeList) {
            return renderFieldColumn(columnC, rowState);
          }
        }
        const comp = vue.resolveComponent(c.providers[columnName].component);
        return vue.h(comp, {
          controller: columnC,
          row: rowState,
          key: elRow.tempsrfkey + columnName,
          attrs: renderAttrs(model, {
            ...c.getEventArgs(),
            data: rowState.data
          })
        });
      }
      return null;
    }
  });
}
function renderChildColumn(c, model, renderColumns, index) {
  var _a, _b;
  if (model.columnType === "GROUPGRIDCOLUMN") {
    const childColumns = ((_a = model.degridColumns) == null ? void 0 : _a.filter((item) => !item.hideDefault && !item.hiddenDataItem)) || [];
    const {
      width
    } = model;
    const align = ((_b = model.align) == null ? void 0 : _b.toLowerCase()) || "center";
    return vue.createVNode(vue.resolveComponent("el-table-column"), {
      "prop": model.codeName,
      "label": model.caption,
      "min-width": width,
      "align": align
    }, {
      default: () => {
        return childColumns.map((column, index2) => {
          return renderChildColumn(c, column, renderColumns, index2);
        });
      }
    });
  }
  return renderColumn(c, model, renderColumns, index);
}
const GridControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridControl",
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
    const c = vue3Util.useControlController((...args) => new runtime.GridController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      zIndex
    } = vue3Util.useUIStore();
    c.state.zIndex = zIndex.increment();
    const {
      sysCss
    } = c.model;
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const {
      tableRef,
      onRowClick,
      onDbRowClick,
      onSelectionChange,
      onSortChange,
      handleRowClassName,
      handleHeaderCellClassName,
      cleanKeyDown = core.NOOP,
      cleanKeyUp = core.NOOP,
      cleanClick = core.NOOP,
      cleanEnter = core.NOOP
    } = gridControl_util.useITableEvent(c);
    const {
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination.usePagination(c);
    const {
      headerCssVars
    } = gridControl_util.useGridHeaderStyle(tableRef, ns);
    const {
      cleanup = core.NOOP
    } = gridControl_util.useGridDraggable(tableRef, ns, c);
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
          "emptyTextLanguageRes": c.model.emptyTextLanguageRes,
          "hideNoDataImage": c.state.hideNoDataImage
        }, _isSlot(noDataSlots) ? noDataSlots : {
          default: () => [noDataSlots]
        });
      }
      return vue.createVNode("div", null, null);
    };
    const {
      tableData,
      renderColumns,
      defaultSort,
      summaryMethod,
      spanMethod,
      headerDragend
    } = gridControl_util.useAppGridBase(c, props);
    const {
      renderPopover
    } = useRowEditPopover.useRowEditPopover(tableRef, c);
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
    const renderTableColumn = (model, index) => {
      if (slots[model.id]) {
        return vue.renderSlot(slots, model.id, {
          model,
          data: c.state.items
        });
      }
      return renderChildColumn(c, model, renderColumns.value, index);
    };
    const renderDragIconColumn = () => {
      return vue.createVNode(vue.resolveComponent("el-table-column"), {
        "class-name": ns.e("drag-icon"),
        "type": "default",
        "width": "16"
      }, {
        default: () => {
          return vue.createVNode("svg", {
            "viewBox": "0 0 16 16",
            "class": "icon",
            "xmlns": "http://www.w3.org/2000/svg",
            "height": "1em",
            "width": "1em",
            "focusable": "false"
          }, [vue.createVNode("g", {
            "id": "drag-icon/drag--",
            "stroke-width": "1",
            "fill-rule": "evenodd"
          }, [vue.createVNode("g", {
            "id": "drag-icon",
            "transform": "translate(5 1)",
            "fill-rule": "nonzero"
          }, [vue.createVNode("path", {
            "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
            "id": "drag-icon-air"
          }, null)])])]);
        }
      });
    };
    vue.onUnmounted(() => {
      zIndex.decrement();
      if (cleanup !== core.NOOP) {
        cleanup();
      }
      if (cleanKeyDown !== core.NOOP) {
        cleanKeyDown();
      }
      if (cleanKeyUp !== core.NOOP) {
        cleanKeyUp();
      }
      if (cleanClick !== core.NOOP) {
        cleanClick();
      }
      if (cleanEnter !== core.NOOP) {
        cleanEnter();
      }
    });
    const isLodeMoreDisabled = vue.computed(() => {
      if (c.model.pagingMode !== 2) {
        return true;
      }
      return c.state.items.length >= c.state.total || c.state.isLoading || c.state.total <= c.state.size;
    });
    const infiniteScroll = vue.ref();
    const infiniteScrollKey = vue.ref(qxUtil.createUUID());
    vue.watch(() => c.state.curPage, () => {
      var _a, _b;
      if (c.state.curPage === 1 && (c.model.pagingMode === 2 || c.model.pagingMode === 3)) {
        infiniteScrollKey.value = qxUtil.createUUID();
        const containerEl = (_b = (_a = infiniteScroll.value) == null ? void 0 : _a.ElInfiniteScroll) == null ? void 0 : _b.containerEl;
        if (containerEl) {
          containerEl.lastScrollTop = 0;
          containerEl.scrollTop = 0;
        }
      }
    });
    return {
      c,
      ns,
      sysCssName,
      tableRef,
      tableData,
      renderColumns,
      renderTableColumn,
      onDbRowClick,
      onRowClick,
      onSelectionChange,
      onSortChange,
      onPageChange,
      onPageSizeChange,
      onPageRefresh,
      handleRowClassName,
      handleHeaderCellClassName,
      renderNoData,
      summaryMethod,
      spanMethod,
      headerDragend,
      renderPopover,
      defaultSort,
      renderBatchToolBar,
      headerCssVars,
      renderDragIconColumn,
      isLodeMoreDisabled,
      infiniteScroll,
      infiniteScrollKey
    };
  },
  render() {
    if (!this.c.state.isCreated) {
      return;
    }
    const state = this.c.state;
    const defaultExpandAll = this.c.controlParams.defaultexpandall === "true";
    return vue.createVNode(vue.resolveComponent("iBizControlNavigation"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizControlBase"), {
        "class": [this.ns.b(), this.ns.is("dynamic-grid", this.c.state.isAutoGrid), this.ns.is("show-header", !this.c.state.hideHeader), this.ns.is("enable-page", this.c.state.enablePagingBar), this.ns.is("enable-group", this.c.model.enableGroup), this.ns.is("single-select", state.singleSelect), this.ns.is("empty", state.items.length === 0), this.ns.is("enable-customized", this.c.model.enableCustomized)],
        "controller": this.c,
        "style": this.headerCssVars
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-table"), vue.mergeProps({
          "ref": "tableRef",
          "class": this.ns.e("table"),
          "default-sort": this.defaultSort,
          "border": true,
          "show-header": !this.c.state.hideHeader,
          "show-summary": this.c.enableAgg,
          "summary-method": this.summaryMethod,
          "highlight-current-row": state.singleSelect,
          "row-class-name": this.handleRowClassName,
          "header-cell-class-name": this.handleHeaderCellClassName,
          "row-key": "tempsrfkey",
          "data": this.tableData,
          "default-expand-all": defaultExpandAll,
          "span-method": this.spanMethod,
          "onRowClick": this.onRowClick,
          "onRowDblclick": this.onDbRowClick,
          "onSelectionChange": this.onSelectionChange,
          "onSortChange": this.onSortChange,
          "onHeaderDragend": this.headerDragend,
          "tooltip-effect": "light",
          "scrollbar-always-on": true
        }, this.$attrs, renderAttrs(this.c.model, {
          ...this.c.getEventArgs()
        })), {
          empty: this.renderNoData,
          default: () => {
            return [this.c.enableRowEditOrder && this.renderDragIconColumn(), !state.singleSelect && vue.createVNode(vue.resolveComponent("el-table-column"), {
              "class-name": this.ns.e("selection"),
              "type": "selection",
              "width": "55",
              "align": "center"
            }, null), this.renderColumns.map((model, index) => {
              return this.renderTableColumn(model, index);
            })];
          },
          append: () => {
            let _slot;
            return [vue.withDirectives(vue.createVNode("div", {
              "ref": "infiniteScroll",
              "key": this.infiniteScrollKey,
              "infinite-scroll-distance": 10,
              "infinite-scroll-disabled": this.isLodeMoreDisabled
            }, null), [[vue.resolveDirective("infinite-scroll"), () => this.c.loadMore()]]), this.c.model.pagingMode === 3 && !(this.c.state.items.length >= this.c.state.total || this.c.state.isLoading || this.c.state.total <= this.c.state.size) && vue.createVNode("div", {
              "class": this.ns.e("load-more-button")
            }, [vue.createVNode(vue.resolveComponent("el-button"), {
              "text": true,
              "onClick": () => this.c.loadMore()
            }, _isSlot(_slot = ibiz.i18n.t("control.common.loadMore")) ? _slot : {
              default: () => [_slot]
            })]), this.c.state.isAutoGrid ? vue.createVNode(vue.resolveComponent("el-button"), {
              "type": "info",
              "class": this.ns.e("add"),
              "onClick": () => this.c.newRow()
            }, {
              default: () => [vue.createVNode("ion-icon", {
                "name": "add-outline"
              }, null), ibiz.i18n.t("app.add")]
            }) : this.renderPopover()];
          }
        }), this.c.state.enablePagingBar && vue.createVNode(vue.resolveComponent("iBizPagination"), {
          "total": state.total,
          "curPage": state.curPage,
          "size": state.size,
          "totalPages": state.totalPages,
          "onChange": this.onPageChange,
          "popperClass": "".concat(this.sysCssName, "--popper"),
          "onPageSizeChange": this.onPageSizeChange,
          "onPageRefresh": this.onPageRefresh
        }, null), this.c.model.enableCustomized && !this.c.state.hideHeader && vue.createVNode("div", {
          "class": this.ns.b("setting-box")
        }, [vue.createVNode(vue.resolveComponent("iBizGridSetting"), {
          "columnStates": state.columnStates,
          "controller": this.c
        }, null)]), this.renderBatchToolBar()]
      })]
    });
  }
});

exports.GridControl = GridControl;
exports.renderChildColumn = renderChildColumn;
exports.renderColumn = renderColumn;
exports.renderFieldColumn = renderFieldColumn;
