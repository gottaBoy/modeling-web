'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var draggable = require('vuedraggable');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var swimlaneKanban = require('./swimlane-kanban/swimlane-kanban.cjs');
require('../../util/index.cjs');
require('./kanban.css');
var usePagination = require('../../util/pagination/use-pagination.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const KanbanControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizKanbanControl",
  components: {
    draggable
  },
  props: {
    /**
     * @description 数据看板模型数据
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
    var _a, _b, _c;
    const c = vue3Util.useControlController((...args) => new runtime.KanbanController(...args));
    vue3Util.useControlPopoverzIndex(c);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const kanban = vue.ref();
    const isFull = vue.ref(false);
    const {
      pageSemantic,
      onPageChange,
      onPageRefresh,
      onPageSizeChange
    } = usePagination.usePagination(c);
    const initSimpleData = () => {
      if (!props.data) {
        return;
      }
      c.state.items = props.data.map((item) => new runtime.ControlVO(item));
      c.afterLoad({}, c.state.items);
    };
    c.evt.on("onCreated", async () => {
      if (props.isSimple) {
        initSimpleData();
        c.state.isSimple = true;
        c.state.isLoaded = true;
      }
    });
    vue.watch(() => props.data, () => {
      if (props.isSimple)
        initSimpleData();
    }, {
      deep: true
    });
    const batchKey = vue.computed(() => {
      return c.state.batching ? c.state.selectGroupKey : "";
    });
    const quickToolbarModel = (_a = c.model.controls) == null ? void 0 : _a.find((item) => {
      return item.name === "".concat(c.model.name, "_quicktoolbar") || item.name === "".concat(c.model.name, "_groupquicktoolbar");
    });
    const batchToolbarModel = (_b = c.model.controls) == null ? void 0 : _b.find((item) => {
      return item.name === "".concat(c.model.name, "_batchtoolbar");
    });
    const groupClass = ((_c = c.model.groupSysCss) == null ? void 0 : _c.cssName) || "";
    const collapseMap = vue.ref({});
    let cleanup = core.NOOP;
    const groupStyle = {};
    switch (c.model.groupLayout) {
      case "ROW":
        groupStyle.width = "".concat(c.model.groupWidth || 300, "px");
        groupStyle.height = "100%";
        break;
      case "COLUMN":
        groupStyle.width = "100%";
        groupStyle.height = "".concat(c.model.groupHeight || 500, "px");
        break;
      default:
    }
    const stopPropagation = (event) => {
      event.stopPropagation();
    };
    const onCollapse = (group, event) => {
      stopPropagation(event);
      const key = String(group.key);
      collapseMap.value[key] = !collapseMap.value[key];
    };
    const onRowClick = (item, event) => {
      stopPropagation(event);
      return c.onRowClick(item);
    };
    const onDbRowClick = (item, event) => {
      stopPropagation(event);
      return c.onDbRowClick(item);
    };
    const onClickNew = (event, group) => {
      stopPropagation(event);
      return c.onClickNew(event, group);
    };
    const handleCheckAllGroup = (group, invert) => {
      const selectedData = group.selectedData || [];
      if (invert) {
        selectedData.forEach((item) => {
          c.onRowClick(item);
        });
      } else {
        const items = group.children.filter((item) => !selectedData.includes(item));
        items.forEach((item) => {
          c.onRowClick(item);
        });
      }
    };
    vue.onMounted(() => {
      cleanup = core.listenJSEvent(window, "resize", () => {
        isFull.value = c.getFullscreen();
      });
    });
    vue.onBeforeUnmount(() => {
      if (cleanup !== core.NOOP)
        cleanup();
    });
    const renderPanelItemLayout = (item, modelData) => {
      const {
        context,
        params
      } = c;
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": item,
        "class": ns.e("panel-item"),
        "modelData": modelData,
        "context": context,
        "params": params
      }, null);
    };
    const renderItemAction = (item, group) => {
      return vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
        "zIndex": c.state.zIndex,
        "class": ns.bem("item", "bottom", "actions"),
        "action-details": c.getOptItemModel(),
        "actions-state": c.state.uaState[item.srfkey],
        "onActionClick": (detail, event) => c.onGroupActionClick(detail, item, event, group)
      }, null);
    };
    const renderQuickToolBar = (group) => {
      if (!quickToolbarModel)
        return;
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "class": [ns.e("quicktoolbar"), semanticClass("quicktoolbar", {
          model: quickToolbarModel,
          group
        })],
        "style": semanticStyle("quicktoolbar", {
          model: quickToolbarModel,
          group
        }),
        "modelData": {
          ...quickToolbarModel,
          name: "".concat(quickToolbarModel.name, "_").concat(group.key)
        },
        "context": c.context,
        "params": c.params
      }, null);
    };
    const renderBatchToolBar = (group) => {
      if (!batchToolbarModel)
        return;
      return vue.createVNode("div", {
        "class": [ns.be("batch", "toolbar"), semanticClass("batchtoolbar", {
          model: batchToolbarModel,
          group
        })],
        "style": semanticStyle("batchtoolbar", {
          model: batchToolbarModel,
          group
        })
      }, [vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "modelData": {
          ...batchToolbarModel,
          name: "".concat(batchToolbarModel.name, "_").concat(group.key)
        },
        "context": c.context,
        "params": c.params
      }, null)]);
    };
    const renderBatchCheck = (group) => {
      let _slot;
      const selectedData = group.selectedData || [];
      const checkAll = selectedData.length === group.children.length;
      const isIndeterminate = selectedData.length > 0 && selectedData.length < group.children.length;
      return vue.createVNode("div", {
        "class": ns.be("batch", "check")
      }, [vue.createVNode(vue.resolveComponent("el-checkbox"), {
        "model-value": checkAll,
        "indeterminate": isIndeterminate,
        "onChange": () => handleCheckAllGroup(group, checkAll)
      }, _isSlot(_slot = ibiz.i18n.t("control.kanban.selectAll")) ? _slot : {
        default: () => [_slot]
      }), vue.createVNode("span", {
        "class": ns.be("batch", "info"),
        "innerHTML": ibiz.i18n.t("control.kanban.selectedDataCount", {
          length: selectedData.length
        })
      }, null)]);
    };
    const renderBatchContainer = (group) => {
      if (batchKey.value !== group.key)
        return;
      return vue.createVNode("div", {
        "class": ns.b("batch")
      }, [renderBatchToolBar(group), renderBatchCheck(group)]);
    };
    const renderDefaultItem = (item, group) => {
      const actionModel = c.getOptItemModel();
      return vue.createVNode("div", {
        "class": ns.e("default-item")
      }, [vue.createVNode("div", {
        "class": ns.be("item", "top")
      }, [vue.createVNode("div", {
        "class": ns.bem("item", "top", "title")
      }, [item.srfmajortext]), vue.createVNode("div", {
        "class": ns.bem("item", "top", "description")
      }, [item.content])]), actionModel.length ? vue.createVNode("div", {
        "class": ns.be("item", "bottom")
      }, [renderItemAction(item, group)]) : null]);
    };
    const renderCard = (item, group) => {
      const findIndex = c.state.selectedData.findIndex((data) => {
        return data.srfkey === item.srfkey;
      });
      const cardClass = [
        ns.b("item"),
        ns.is("selected", findIndex !== -1),
        // 数据更新时不允许拖拽，鼠标变为禁用
        ns.is("disabled", c.state.draggable && c.state.updating),
        semanticClass("item", {
          item,
          group
        })
      ];
      const cardStyle = {};
      if (c.model.cardWidth) {
        cardStyle.width = "".concat(c.model.cardWidth, "px");
      }
      if (c.model.cardHeight) {
        cardStyle.height = "".concat(c.model.cardHeight, "px");
      }
      const panel = props.modelData.itemLayoutPanel;
      return vue.createVNode(vue.resolveComponent("el-card"), {
        "shadow": "hover",
        "class": cardClass,
        "style": semanticStyle("item", {
          item,
          group
        }),
        "body-style": cardStyle,
        "onClick": (event) => onRowClick(item, event),
        "onDblclick": (event) => onDbRowClick(item, event)
      }, {
        default: () => [vue.createVNode("div", {
          "class": ns.be("item", "content")
        }, [c.state.draggable && !c.state.readonly && vue.createVNode("svg", {
          "viewBox": "0 0 16 16",
          "xmlns": "http://www.w3.org/2000/svg",
          "height": "1em",
          "width": "1em",
          "class": ns.e("drag-icon"),
          "preserveAspectRatio": "xMidYMid meet",
          "focusable": "false"
        }, [vue.createVNode("g", {
          "stroke-width": "1",
          "fill-rule": "evenodd"
        }, [vue.createVNode("g", {
          "transform": "translate(5 1)",
          "fill-rule": "nonzero"
        }, [vue.createVNode("path", {
          "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        }, null)])])]), panel ? renderPanelItemLayout(item, panel) : renderDefaultItem(item, group)])]
      });
    };
    const renderNoData = () => {
      if (!c.state.isLoaded) {
        return;
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
    };
    let cacheInfo = null;
    const onDraggableChange = (evt, groupKey) => {
      if (evt.moved) {
        c.onDragChange({
          from: groupKey,
          to: groupKey,
          fromIndex: evt.moved.oldIndex,
          toIndex: evt.moved.newIndex
        });
      }
      if (evt.added) {
        cacheInfo = {
          to: groupKey,
          toIndex: evt.added.newIndex
        };
      }
      if (evt.removed) {
        if (cacheInfo) {
          cacheInfo.from = groupKey;
          cacheInfo.fromIndex = evt.removed.oldIndex;
          c.onDragChange(cacheInfo);
        }
        cacheInfo = null;
      }
    };
    const onFullScreen = () => {
      const container = kanban.value.$el;
      isFull.value = c.onFullScreen(container);
    };
    const renderGroupToolbar = (group) => {
      const showActionBar = c.model.groupUIActionGroup && group.groupActionGroupState || batchToolbarModel;
      if (batchKey.value === group.key) {
        let _slot2;
        return vue.createVNode("span", {
          "class": [ns.be("group", "header-right")],
          "onClick": (event) => stopPropagation(event)
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "text": true,
          "onClick": () => c.closeBatch()
        }, _isSlot(_slot2 = ibiz.i18n.t("app.complete")) ? _slot2 : {
          default: () => [_slot2]
        })]);
      }
      return vue.createVNode("span", {
        "class": [ns.be("group", "header-right"), semanticClass("group.toolbar", {
          group
        })],
        "style": semanticStyle("group.toolbar", {
          group
        }),
        "onClick": (event) => stopPropagation(event)
      }, [c.enableNew && !c.state.readonly && vue.createVNode(vue.resolveComponent("el-button"), {
        "class": ns.be("group", "header-new"),
        "text": true,
        "circle": true,
        "onClick": (event) => {
          onClickNew(event, group.key);
        }
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "add-outline",
          "title": ibiz.i18n.t("app.newlyBuild")
        }, null)]
      }), showActionBar && vue.createVNode(vue.resolveComponent("el-dropdown"), {
        "class": ns.be("group", "header-actions"),
        "trigger": "click",
        "teleported": false,
        "popper-class": ns.e("popover")
      }, {
        default: () => vue.createVNode("span", {
          "title": ibiz.i18n.t("app.more")
        }, [vue.createTextVNode("\xB7\xB7\xB7")]),
        dropdown: () => vue.createVNode("div", {
          "class": ns.be("group", "actions-dropdown")
        }, [c.model.groupUIActionGroup && group.groupActionGroupState && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
          "direction": "vertical",
          "placement": "right-start",
          "teleported": false,
          "actionDetails": c.model.groupUIActionGroup.uiactionGroupDetails,
          "actionsState": group.groupActionGroupState,
          "onActionClick": (detail, event) => {
            c.onGroupToolbarClick(detail, event, group);
          }
        }, null), batchToolbarModel && vue.createVNode(vue.resolveComponent("el-button"), {
          "size": "small",
          "onClick": () => {
            c.openBatch(group.key);
          }
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "name": "checkmark-sharp"
          }, null), ibiz.i18n.t("control.kanban.natchOperation")]
        })])
      })]);
    };
    const renderGroup = (group) => {
      const collapse = collapseMap.value[String(group.key)];
      const isColumn = c.model.groupLayout === "COLUMN";
      const tempGroupStyle = {
        ...groupStyle
      };
      if (collapse) {
        tempGroupStyle.height = "50px";
      }
      if (!collapse || isColumn) {
        return vue.createVNode("div", {
          "class": [ns.b("group"), semanticClass("group", {
            group
          }), ns.is("collapse", collapse), groupClass],
          "style": [tempGroupStyle, semanticStyle("group", {
            group
          })]
        }, [vue.createVNode("div", {
          "class": [ns.be("group", "header"), semanticClass("group.header", {
            group
          })],
          "style": [{
            borderTopColor: group.color || "transparent"
          }, semanticStyle("group.header", {
            group
          })],
          "onClick": (event) => onCollapse(group, event)
        }, [vue.createVNode("div", {
          "class": ns.be("group", "header-left")
        }, [vue.createVNode("ion-icon", {
          "name": "caret-down-sharp"
        }, null), vue.createVNode("span", {
          "class": [ns.be("group", "header-caption"), ns.is("badge", !!group.color), semanticClass("group.caption", {
            group
          })],
          "style": [{
            backgroundColor: group.color
          }, semanticStyle("group.caption", {
            group
          })]
        }, ["".concat(group.caption).concat(group.children.length ? " \xB7 ".concat(group.children.length) : "")])]), renderGroupToolbar(group)]), renderBatchContainer(group), vue.createVNode("div", {
          "class": [ns.be("group", "list"), ns.is("empty", !group.children.length), semanticClass("group.list", {
            group
          })],
          "style": semanticStyle("group.list", {
            group
          })
        }, [vue.createVNode(draggable, {
          "itemKey": "srfkey",
          "group": c.model.id,
          "modelValue": group.children,
          "class": ns.be("group", "draggable"),
          "handle": ".".concat(ns.e("drag-icon")),
          "disabled": !c.state.draggable || c.state.updating || c.state.readonly,
          "onChange": (evt) => onDraggableChange(evt, group.key)
        }, {
          item: ({
            element
          }) => {
            return renderCard(element, group);
          },
          header: () => {
            if (group.children.length) {
              return null;
            }
            return vue.createVNode("div", {
              "class": ns.be("group", "list")
            }, [renderNoData()]);
          }
        }), renderQuickToolBar(group)])]);
      }
      return vue.createVNode("div", {
        "class": [ns.b("group"), semanticClass("group", {
          group
        }), ns.is("collapse", collapse), groupClass],
        "style": semanticStyle("group", {
          group
        })
      }, [vue.createVNode("div", {
        "class": [ns.be("group", "header"), semanticClass("group.header", {
          group
        })],
        "style": [{
          borderTopColor: group.color || "transparent"
        }, semanticStyle("group.header", {
          group
        })],
        "onClick": (event) => onCollapse(group, event)
      }, [vue.createVNode("span", {
        "class": [ns.be("group", "header-caption"), ns.is("badge", !!group.color), semanticClass("group.caption", {
          group
        })],
        "style": [{
          backgroundColor: group.color
        }, semanticStyle("group.caption", {
          group
        })]
      }, ["".concat(group.caption).concat(group.children.length ? " \xB7 ".concat(group.children.length) : "")]), vue.createVNode("ion-icon", {
        "name": "caret-forward-sharp"
      }, null)])]);
    };
    return {
      c,
      ns,
      isFull,
      kanban,
      renderGroup,
      onFullScreen,
      onPageChange,
      onPageRefresh,
      onPageSizeChange,
      semanticClass,
      semanticStyle,
      pageSemantic
    };
  },
  render() {
    var _a;
    const {
      groups,
      isCreated
    } = this.c.state;
    const {
      swimlaneAppDEFieldId
    } = this.c.model;
    if (!isCreated)
      return null;
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "ref": "kanban",
      "controller": this.c,
      "class": [this.ns.m((_a = this.modelData.groupLayout) == null ? void 0 : _a.toLowerCase()), this.ns.is("full", this.isFull), this.ns.is("swimlane", !!swimlaneAppDEFieldId), this.ns.is("enable-page", this.c.state.enablePagingBar), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, {
      default: () => [vue.createVNode("div", {
        "class": [this.ns.e("content"), this.semanticClass("content")],
        "style": this.semanticStyle("content")
      }, [swimlaneAppDEFieldId ? vue.createVNode(swimlaneKanban.SwimlaneKanban, {
        "controller": this.c
      }, null) : [vue.createVNode("div", {
        "class": this.ns.b("group-container")
      }, [groups.length > 0 && groups.map((group) => {
        if (group.hidden)
          return null;
        return this.renderGroup(group);
      })]), groups.length > 0 && vue.createVNode("div", {
        "class": [this.ns.b("toolbar"), this.semanticClass("toolbar")],
        "style": this.semanticStyle("toolbar")
      }, [this.c.enableGroupHidden && vue.createVNode(vue.resolveComponent("iBizKanbanSetting"), {
        "class": this.semanticClass("setting"),
        "style": this.semanticStyle("setting"),
        "controller": this.c
      }, null), this.c.enableFullScreen && vue.createVNode(vue.resolveComponent("el-button"), {
        "type": "info",
        "class": [this.ns.e("fullscreen"), this.semanticClass("fullscreen")],
        "style": this.semanticStyle("fullscreen"),
        "onClick": this.onFullScreen,
        "title": this.isFull ? ibiz.i18n.t("app.cancelFullscreen") : ibiz.i18n.t("app.fullscreen")
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": this.isFull ? "contract-outline" : "expand-outline"
        }, null)]
      })])]]), this.c.state.enablePagingBar && vue.createVNode(vue.resolveComponent("iBizPagination"), {
        "class": this.semanticClass("pagination"),
        "style": this.semanticStyle("pagination"),
        "semantic": this.pageSemantic,
        "mode": this.c.paginationMode,
        "size": this.c.state.size,
        "total": this.c.state.total,
        "curPage": this.c.state.curPage,
        "totalPages": this.c.state.totalPages,
        "onChange": this.onPageChange,
        "onPageRefresh": this.onPageRefresh,
        "onPageSizeChange": this.onPageSizeChange
      }, null)]
    });
  }
});

exports.KanbanControl = KanbanControl;
