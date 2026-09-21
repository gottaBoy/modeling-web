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
  const attrs = {};
  runtime.filterPresetAttrs(model.controlAttributes).forEach((item) => {
    if (item.attrName && item.attrName !== "span-method" && item.attrValue) {
      attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
        ...params
      });
    }
  });
  return attrs;
}
function renderFieldColumn(c, row) {
  var _a, _b, _c;
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
    controlRenders = [],
    id
  } = c.model;
  const panel = (_a = controlRenders.find((renderItem) => renderItem.renderType === "LAYOUTPANEL" && !["".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip"), "".concat(id == null ? void 0 : id.toLowerCase(), "_edit_tooltip")].includes(renderItem.id))) == null ? void 0 : _a.layoutPanel;
  const columnType = (_b = c.model.userParam) == null ? void 0 : _b.columntype;
  if (panel) {
    content = vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizControlShell"), {
      "data": row.data,
      "modelData": panel,
      "context": c.context,
      "params": c.params
    }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(row.data, c.model, c.grid)]]);
  } else if (columnType === "attachment") {
    content = vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizAttachmentColumn"), {
      "data": row.data,
      "value": fieldValue,
      "controller": c
    }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(row.data, c.model, c.grid)]]);
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
      const percentValue = Number(fieldValue);
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
    content = vue.withDirectives(vue.createVNode("span", {
      "class": ns.e("text"),
      "title": core.showTitle(tooltip.value),
      "onClick": onTextClick
    }, [showValue, hiddenEmpty.value && c.model.unitName, percent.value && "(".concat(percent.value, ")")]), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(row.data, c.model, c.grid)]]);
  }
  const onCellClick = (event) => {
    if (c.hasAction) {
      event.stopPropagation();
      c.triggerAction(row, event);
    }
  };
  return vue.createVNode("div", {
    "class": [ns.b(), c.clickable(row) && ns.m("clickable"), ns.m(c.grid.overflowMode), (_c = c.model.cellSysCss) == null ? void 0 : _c.cssName, ns.is("has-action", !!c.model.deuiactionGroup)],
    "onClick": onCellClick
  }, [c.model.deuiactionGroup ? [vue.createVNode("div", {
    "class": ns.b("text-container")
  }, [content]), vue.createVNode("div", {
    "class": ns.b("toolbar-container")
  }, [actionToolbar])] : content]);
}
function renderColumn(c, model, renderColumns, index, slots) {
  var _a, _b, _c, _d;
  const {
    codeName: columnName,
    width
  } = model;
  const columnC = c.columns[columnName];
  const columnState = c.state.columnStates.find((item) => item.key === columnName);
  let type = "default";
  const expandiconcolumn = (_a = c.controlParams.expandiconcolumn) == null ? void 0 : _a.toLowerCase();
  const expandColumnSatate = c.state.columnStates.find((item) => expandiconcolumn && item.key.toLowerCase() === expandiconcolumn);
  if (expandColumnSatate && !expandColumnSatate.hidden)
    type = (columnName == null ? void 0 : columnName.toLowerCase()) === expandiconcolumn ? "default" : "";
  const widthFlexGrow = columnC.isAdaptiveColumn || !c.hasAdaptiveColumn && index === renderColumns.length - 1;
  const widthName = widthFlexGrow ? "min-width" : "width";
  const tempWidth = (columnState == null ? void 0 : columnState.columnWidth) || width;
  const align = ((_b = model.align) == null ? void 0 : _b.toLowerCase()) || c.columnAlign;
  const sortable = model.enableSort ? c.model.sortMode === "LOCAL" || "custom" : false;
  return vue.createVNode(vue.resolveComponent("el-table-column"), vue.mergeProps({
    "type": type,
    "prop": columnName,
    "label": model.caption,
    "fixed": columnState.fixed
  }, {
    [widthName]: tempWidth
  }, {
    "sortable": sortable,
    "align": align,
    "sortMethod": (a, b) => {
      const fieldName = model.id.toLowerCase();
      if (a[fieldName] < b[fieldName] || !a[fieldName])
        return -1;
      if (a[fieldName] > b[fieldName] || !b[fieldName])
        return 1;
      return 0;
    },
    "className": "".concat((_c = model.columnType) == null ? void 0 : _c.toLowerCase(), " ").concat((_d = model.columnType) == null ? void 0 : _d.toLowerCase(), "-").concat(columnName)
  }), {
    header: ({
      column
    }) => {
      return vue.createVNode(vue.resolveComponent("iBizGridColumnHeader"), {
        "key": column.property,
        "controller": columnC
      }, null);
    },
    default: ({
      row
    }) => {
      let elRow = row;
      if (elRow.isGroupRow)
        return vue.createVNode("div", {
          "class": "ibiz-grid-field-column"
        }, [vue.createVNode("span", {
          "class": "ibiz-grid-field-column__text"
        }, [row.caption])]);
      if (row.isGroupData)
        elRow = row.first;
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
        }, slots);
      }
      return null;
    }
  });
}
function renderChildColumn(c, model, renderColumns, index, slots, semanticClass, semanticStyle) {
  var _a, _b;
  if (model.columnType === "GROUPGRIDCOLUMN") {
    const childColumns = ((_a = model.degridColumns) == null ? void 0 : _a.filter((item) => !item.hideDefault && !item.hiddenDataItem)) || [];
    const {
      width,
      codeName
    } = model;
    const columnC = c.columns[codeName];
    const align = ((_b = model.align) == null ? void 0 : _b.toLowerCase()) || c.columnAlign;
    return vue.createVNode(vue.resolveComponent("el-table-column"), {
      "prop": model.codeName,
      "label": model.caption,
      "min-width": width,
      "align": align,
      "class-name": semanticClass("groupcolumn", {
        column: columnC
      })
    }, {
      header: ({
        column
      }) => {
        return vue.createVNode(vue.resolveComponent("iBizGridColumnHeader"), {
          "key": column.property,
          "controller": columnC
        }, null);
      },
      default: () => {
        return childColumns.map((column, index2) => {
          return renderChildColumn(c, column, renderColumns, index2, slots, semanticClass, semanticStyle);
        });
      }
    });
  }
  return renderColumn(c, model, renderColumns, index, slots);
}
const GridControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridControl",
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
  setup(props, {
    slots
  }) {
    const c = vue3Util.useControlController((...args) => new runtime.GridController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    vue3Util.useControlPopoverzIndex(c);
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
      cleanClick = core.NOOP,
      cleanEnter = core.NOOP,
      cleanTab = core.NOOP,
      onSelectAll
    } = gridControl_util.useITableEvent(c);
    const {
      pageSemantic,
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination.usePagination(c);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const {
      headerCssVars
    } = gridControl_util.useGridHeaderStyle(tableRef, ns);
    const {
      cleanup = core.NOOP,
      setDragEvent
    } = gridControl_util.useGridDraggable(tableRef, ns, c);
    c.evt.on("onLoadSuccess", () => {
      if (setDragEvent) {
        setDragEvent();
      }
    });
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
    } = gridControl_util.useAppGridBase(c, props, tableRef);
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
    const renderTableColumn = (model, index) => {
      if (slots[model.id]) {
        return vue.renderSlot(slots, model.id, {
          model,
          data: c.state.items,
          controller: c.columns[model.codeName]
        });
      }
      return renderChildColumn(c, model, renderColumns.value, index, slots, semanticClass, semanticStyle);
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
            "id": "drag-icon-air",
            "fill": "currentColor"
          }, null)])])]);
        }
      });
    };
    const renderRowDetail = () => {
      const {
        navAppViewId,
        navViewHeight
      } = c.model;
      if (navAppViewId && c.state.showRowDetail)
        return vue.createVNode(vue.resolveComponent("el-table-column"), {
          "type": "expand"
        }, {
          default: ({
            row
          }) => {
            const {
              context,
              params
            } = c.calcNavParams(row);
            const style = {
              height: navViewHeight ? "".concat(navViewHeight, "px") : "auto"
            };
            return vue.h(vue.resolveComponent("IBizViewShell"), {
              style,
              params,
              context,
              viewId: navAppViewId,
              class: ns.b("row-detail-view")
            });
          }
        });
    };
    vue.onUnmounted(() => {
      if (cleanup !== core.NOOP)
        cleanup();
      if (cleanClick !== core.NOOP)
        cleanClick();
      if (cleanEnter !== core.NOOP)
        cleanEnter();
      if (cleanTab !== core.NOOP)
        cleanTab();
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
      tableRef,
      tableData,
      sysCssName,
      defaultSort,
      renderColumns,
      headerCssVars,
      infiniteScroll,
      infiniteScrollKey,
      isLodeMoreDisabled,
      semanticClass,
      semanticStyle,
      pageSemantic,
      onRowClick,
      spanMethod,
      onSortChange,
      onDbRowClick,
      onPageChange,
      renderNoData,
      summaryMethod,
      headerDragend,
      renderPopover,
      onPageRefresh,
      renderRowDetail,
      onPageSizeChange,
      renderTableColumn,
      onSelectionChange,
      handleRowClassName,
      renderBatchToolBar,
      renderDragIconColumn,
      handleHeaderCellClassName,
      onSelectAll
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
        "class": [this.ns.b(), this.ns.is("dynamic-grid", this.c.state.isAutoGrid), this.ns.is("show-header", !this.c.state.hideHeader), this.ns.is("enable-page", this.c.state.enablePagingBar), this.ns.is("enable-group", this.c.state.enableGroup), this.ns.is("single-select", state.singleSelect), this.ns.is("empty", state.items.length === 0), this.ns.is("enable-customized", this.c.model.enableCustomized), this.ns.is("group-row-mode", this.c.controlParams.grouprowmode === "NEWROW"), this.semanticClass("root")],
        "controller": this.c,
        "style": [this.headerCssVars, this.semanticStyle("root")]
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-table"), vue.mergeProps({
          "border": true,
          "ref": "tableRef",
          "data": this.tableData,
          "row-key": "tempsrfkey",
          "tooltip-effect": "light",
          "style": this.semanticStyle("content"),
          "class": [this.ns.e("table"), this.semanticClass("content")],
          "scrollbar-always-on": true,
          "onRowClick": this.onRowClick,
          "span-method": this.spanMethod,
          "default-sort": this.defaultSort,
          "show-summary": this.c.enableAgg,
          "onSortChange": this.onSortChange,
          "onSelectAll": this.onSelectAll,
          "onRowDblclick": this.onDbRowClick,
          "summary-method": this.summaryMethod,
          "onHeaderDragend": this.headerDragend,
          "default-expand-all": defaultExpandAll,
          "show-header": !this.c.state.hideHeader,
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
          "highlight-current-row": state.singleSelect,
          "expandRowKeys": this.c.state.expandRowKeys,
          "onSelectionChange": this.onSelectionChange,
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
          "header-cell-style": (...args) => this.semanticStyle("header.cell", {
            args
          }),
          "onExpandChange": (row, expanded) => this.c.expandChange(row, expanded)
        }, this.$attrs, renderAttrs(this.c.model, {
          ...this.c.getEventArgs()
        })), {
          empty: this.renderNoData,
          default: () => {
            return [this.c.enableRowEditOrder && this.renderDragIconColumn(), !state.singleSelect && vue.createVNode(vue.resolveComponent("el-table-column"), {
              "width": "55",
              "align": "center",
              "type": "selection",
              "reserve-selection": true,
              "style": this.semanticStyle("selection"),
              "class-name": "".concat(this.ns.e("selection"), " ").concat(this.semanticClass("selection"))
            }, null), this.renderRowDetail(), this.renderColumns.map((model, index) => {
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
          "class": this.semanticClass("pagination"),
          "style": this.semanticStyle("pagination"),
          "semantic": this.pageSemantic,
          "mode": this.c.paginationMode,
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
          "class": this.semanticClass("setting"),
          "style": this.semanticStyle("setting"),
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
