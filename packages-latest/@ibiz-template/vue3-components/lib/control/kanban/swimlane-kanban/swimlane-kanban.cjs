'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var draggable = require('vuedraggable');
var core = require('@ibiz-template/core');
require('./swimlane-kanban.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const SwimlaneKanban = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSwimlaneKanban",
  components: {
    draggable
  },
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = vue3Util.useNamespace("swimlane-kanban");
    const c = props.controller;
    const {
      zIndex
    } = vue3Util.useUIStore();
    const isFull = vue.ref(false);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const popperStyle = {
      zIndex: zIndex.increment()
    };
    const expandAll = vue.ref(true);
    const dropdownKey = vue.ref();
    const swimlaneKanban = vue.ref();
    let cleanup = core.NOOP;
    vue.onMounted(() => {
      cleanup = core.listenJSEvent(window, "resize", () => {
        isFull.value = c.getFullscreen();
      });
    });
    vue.onBeforeUnmount(() => {
      if (cleanup !== core.NOOP)
        cleanup();
    });
    const disabled = vue.computed(() => {
      return !c.state.draggable || c.draggableMode === 0 || c.state.updating || c.state.readonly;
    });
    const width = vue.computed(() => {
      const {
        groupWidth,
        cardWidth
      } = c.model;
      return groupWidth || cardWidth || 320;
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
    let cacheInfo = null;
    const onFullScreen = () => {
      const container = swimlaneKanban.value;
      isFull.value = c.onFullScreen(container);
    };
    const onDraggableChange = (evt, groupKey, laneKey) => {
      if (evt.moved)
        c.onDragChange({
          from: groupKey,
          to: groupKey,
          fromIndex: evt.moved.oldIndex,
          toIndex: evt.moved.newIndex,
          fromLane: laneKey,
          toLane: laneKey
        });
      if (evt.added)
        cacheInfo = {
          to: groupKey,
          toLane: laneKey,
          toIndex: evt.added.newIndex
        };
      if (evt.removed) {
        if (cacheInfo) {
          Object.assign(cacheInfo, {
            from: groupKey,
            fromLane: laneKey,
            fromIndex: evt.removed.oldIndex
          });
          c.onDragChange(cacheInfo);
        }
        cacheInfo = null;
      }
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
    const isSelected = (item) => {
      return c.state.selectedData.findIndex((data) => {
        return data.srfkey === item.srfkey;
      }) !== -1;
    };
    const getGroupKey = (groupKey, laneKey) => {
      return c.draggableMode === 1 ? groupKey.toString() : c.draggableMode === 2 ? laneKey || "custom" : c.model.id;
    };
    const handleExpandAll = () => {
      expandAll.value = !expandAll.value;
      c.state.swimlanes.forEach((lane) => {
        lane.isExpand = expandAll.value;
      });
    };
    const onVisibleChange = (val, key) => {
      dropdownKey.value = val ? key : void 0;
    };
    const renderHeaderToolbar = (group) => {
      let _slot;
      const showActionBar = c.model.groupUIActionGroup && group.groupActionGroupState || batchToolbarModel;
      if (group.isExpand === false)
        return null;
      if (batchKey.value === group.key)
        return vue.createVNode("div", {
          "class": [ns.em("cell", "right"), ns.em("header", "actions")]
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "text": true,
          "onClick": () => c.closeBatch()
        }, _isSlot(_slot = ibiz.i18n.t("app.complete")) ? _slot : {
          default: () => [_slot]
        })]);
      return vue.createVNode("div", {
        "class": [ns.em("cell", "right"), ns.em("header", "actions"), semanticClass("group.toolbar", {
          group
        })],
        "style": semanticStyle("group.toolbar", {
          group
        })
      }, [vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "circle": true,
        "class": ns.em("header", "action"),
        "onClick": () => {
          group.isExpand = false;
        }
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "chevron-back-outline",
          "title": ibiz.i18n.t("control.kanban.collapsed")
        }, null)]
      }), showActionBar && vue.createVNode(vue.resolveComponent("el-dropdown"), {
        "trigger": "click",
        "teleported": false,
        "style": popperStyle,
        "class": [ns.em("header", "action"), ns.is("visible", group.key === dropdownKey.value)],
        "popper-class": ns.em("header", "popper"),
        "onVisibleChange": (val) => onVisibleChange(val, group.key)
      }, {
        default: () => vue.createVNode(vue.resolveComponent("el-button"), {
          "text": true,
          "circle": true
        }, {
          default: () => [vue.createVNode("ion-icon", {
            "title": core.showTitle(ibiz.i18n.t("app.more")),
            "name": "ellipsis-horizontal"
          }, null)]
        }),
        dropdown: () => vue.createVNode("div", {
          "class": ns.em("header", "toolbar")
        }, [c.model.groupUIActionGroup && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
          "direction": "vertical",
          "placement": "right-start",
          "teleported": false,
          "zIndex": c.state.zIndex,
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
    const renderHeaderCell = (group) => {
      return vue.createVNode("div", {
        "class": [ns.e("cell"), ns.em("header", "cell"), ns.is("collapsed", group.isExpand === false), semanticClass("group.header", {
          group
        })],
        "style": semanticStyle("group.header", {
          group
        })
      }, [vue.createVNode("div", {
        "class": ns.em("cell", "content")
      }, [vue.createVNode("div", {
        "class": ns.em("cell", "left")
      }, [vue.createVNode("div", {
        "class": [ns.em("cell", "caption"), semanticClass("group.caption", {
          group
        })],
        "style": semanticStyle("group.caption", {
          group
        })
      }, [group.caption, vue.createVNode("span", {
        "class": ns.em("cell", "separator")
      }, [vue.createTextVNode("\xB7")]), group.children.length]), group.isExpand === false && vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "circle": true,
        "onClick": () => {
          group.isExpand = true;
        }
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "title": ibiz.i18n.t("control.kanban.expand"),
          "name": "chevron-forward-outline"
        }, null)]
      })]), renderHeaderToolbar(group)])]);
    };
    const renderHeader = () => {
      return vue.createVNode("div", {
        "class": ns.e("header")
      }, [vue.createVNode("div", {
        "class": ns.em("header", "row")
      }, [vue.createVNode("div", {
        "class": [ns.e("cell"), ns.em("header", "cell"), semanticClass("swimlane.header")],
        "style": semanticStyle("swimlane.header")
      }, [vue.createVNode("div", {
        "class": ns.em("cell", "content")
      }, [vue.createVNode("div", {
        "class": ns.em("cell", "left")
      }, [vue.createVNode("ion-icon", {
        "onClick": handleExpandAll,
        "class": ns.em("cell", "expand-icon"),
        "title": expandAll.value ? ibiz.i18n.t("control.kanban.allCollapsed") : ibiz.i18n.t("control.kanban.allExpand"),
        "name": expandAll.value ? "chevron-collapse-outline" : "chevron-expand-outline"
      }, null), vue.createVNode("div", {
        "class": [ns.em("cell", "caption"), semanticClass("swimlane.caption")],
        "style": semanticStyle("swimlane.caption")
      }, [ibiz.i18n.t("control.kanban.lane")])]), vue.createVNode("div", {
        "class": [ns.em("cell", "right"), semanticClass("toolbar")],
        "style": semanticStyle("toolbar")
      }, [c.enableGroupHidden && vue.createVNode(vue.resolveComponent("iBizKanbanSetting"), {
        "class": [ns.e("setting"), semanticClass("setting")],
        "style": semanticStyle("setting"),
        "buttonStyle": {
          circle: true,
          type: "text"
        },
        "controller": props.controller
      }, null), c.enableFullScreen && vue.createVNode(vue.resolveComponent("el-button"), {
        "type": "text",
        "circle": true,
        "onClick": onFullScreen,
        "class": [ns.e("fullscreen"), semanticClass("fullscreen")],
        "style": semanticStyle("fullscreen"),
        "title": isFull.value ? ibiz.i18n.t("app.cancelFullscreen") : ibiz.i18n.t("app.fullscreen")
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": isFull.value ? "contract-outline" : "expand-outline"
        }, null)]
      })])])]), c.state.groups.map((group) => {
        if (group.hidden)
          return void 0;
        return renderHeaderCell(group);
      })])]);
    };
    const renderPanelItemLayout = (lane, item) => {
      const {
        context,
        params
      } = c;
      const {
        itemLayoutPanel
      } = c.model;
      if (!itemLayoutPanel)
        return;
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": item,
        "params": params,
        "context": context,
        "class": ns.e("panel-item"),
        "modelData": itemLayoutPanel
      }, null);
    };
    const renderDefaultItem = (lane, item, group) => {
      const actionModel = c.getOptItemModel();
      return vue.createVNode("div", {
        "class": ns.e("default-item")
      }, [vue.createVNode("div", {
        "class": ns.em("default-item", "header")
      }, [item.srfmajortext]), vue.createVNode("div", {
        "class": ns.em("default-item", "content")
      }, [item.content]), actionModel.length ? vue.createVNode("div", {
        "class": ns.em("default-item", "footer")
      }, [vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
        "zIndex": c.state.zIndex,
        "class": ns.em("default-item", "actions"),
        "action-details": actionModel,
        "actions-state": c.state.uaState[item.srfkey],
        "onActionClick": (detail, event) => c.onGroupActionClick(detail, item, event, group, lane)
      }, null)]) : null]);
    };
    const renderBodyCellToolber = (lane, group) => {
      const {
        swimlaneAppDEFieldId
      } = c.model;
      const items = group.children.filter((item) => item[swimlaneAppDEFieldId] === lane.key);
      return vue.createVNode("div", {
        "class": ns.em("cell", "toolbar")
      }, [c.enableNew && !c.state.readonly && vue.createVNode(vue.resolveComponent("el-button"), {
        "text": true,
        "class": ns.em("cell", "action"),
        "onClick": (event) => {
          c.onClickNew(event, group.key, lane);
        }
      }, {
        default: () => [vue.createVNode("ion-icon", {
          "name": "add-outline"
        }, null), ibiz.i18n.t("app.newlyBuild")]
      }), quickToolbarModel && items.length === 0 && vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "class": [ns.e("quicktoolbar"), semanticClass("quicktoolbar", {
          group,
          model: quickToolbarModel
        })],
        "style": semanticStyle("quicktoolbar", {
          group,
          model: quickToolbarModel
        }),
        "modelData": {
          ...quickToolbarModel,
          name: "".concat(quickToolbarModel.name, "_").concat(group.key)
        },
        "context": c.context,
        "params": c.params
      }, null)]);
    };
    const renderBatchToolBar = (group) => {
      let _slot2;
      if (!batchToolbarModel || batchKey.value !== group.key)
        return;
      const selectedData = group.selectedData || [];
      const checkAll = selectedData.length === group.children.length;
      const isIndeterminate = selectedData.length > 0 && selectedData.length < group.children.length;
      return vue.createVNode("div", {
        "class": ns.e("batch")
      }, [vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "modelData": {
          ...batchToolbarModel,
          name: "".concat(batchToolbarModel.name, "_").concat(group.key)
        },
        "class": [ns.em("batch", "toolbar"), semanticClass("batchtoolbar", {
          group,
          model: batchToolbarModel
        })],
        "style": semanticStyle("batchtoolbar", {
          group,
          model: batchToolbarModel
        }),
        "context": c.context,
        "params": c.params
      }, null), vue.createVNode("div", {
        "class": ns.em("batch", "check")
      }, [vue.createVNode(vue.resolveComponent("el-checkbox"), {
        "model-value": checkAll,
        "indeterminate": isIndeterminate,
        "onChange": () => handleCheckAllGroup(group, checkAll)
      }, _isSlot(_slot2 = ibiz.i18n.t("control.kanban.selectAll")) ? _slot2 : {
        default: () => [_slot2]
      }), vue.createVNode("span", {
        "class": ns.em("batch", "info"),
        "innerHTML": ibiz.i18n.t("control.kanban.selectedDataCount", {
          length: selectedData.length
        })
      }, null)])]);
    };
    const renderBodyCell = (index, lane, group) => {
      const {
        swimlaneAppDEFieldId
      } = c.model;
      return vue.createVNode("div", {
        "class": [ns.e("cell"), ns.em("body", "cell"), ns.is("collapsed", group.isExpand === false)]
      }, [index === 0 && renderBatchToolBar(group), group.isExpand !== false ? vue.createVNode("div", {
        "class": ns.em("cell", "content")
      }, [lane.isExpand ? [vue.createVNode(draggable, {
        "itemKey": "srfkey",
        "disabled": disabled.value,
        "modelValue": group.children,
        "handle": ".".concat(ns.e("drag-icon")),
        "class": [ns.em("cell", "draggable"), semanticClass("group.list", {
          group
        })],
        "style": semanticStyle("group.list", {
          group
        }),
        "group": getGroupKey(group.key, lane.key),
        "onChange": (evt) => onDraggableChange(evt, group.key, lane.key)
      }, {
        item: ({
          element
        }) => {
          if (!swimlaneAppDEFieldId || element[swimlaneAppDEFieldId] !== lane.key)
            return null;
          return vue.createVNode(vue.resolveComponent("el-card"), {
            "shadow": "hover",
            "class": [ns.e("card"), ns.is("selected", isSelected(element)), ns.is("disabled", c.state.draggable && c.state.updating), semanticClass("item", {
              group,
              item: element
            })],
            "style": semanticStyle("item", {
              group,
              item: element
            }),
            "onClick": () => c.onRowClick(element),
            "onDblclick": () => c.onDbRowClick(element)
          }, {
            default: () => [vue.createVNode("div", {
              "class": ns.em("card", "content")
            }, [c.state.draggable && !c.state.readonly && c.draggableMode !== 0 && vue.createVNode("svg", {
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
            }, null)])])]), c.model.itemLayoutPanel ? renderPanelItemLayout(lane, element) : renderDefaultItem(lane, element, group)])]
          });
        }
      }), renderBodyCellToolber(lane, group)] : vue.createVNode("div", {
        "class": ns.em("cell", "left")
      }, [vue.createVNode("span", {
        "class": ns.em("cell", "description")
      }, ["".concat(group.children.filter((child) => swimlaneAppDEFieldId && child[swimlaneAppDEFieldId] === lane.key).length, " \u4E2A").concat(group.caption)])])]) : null]);
    };
    const renderBody = () => {
      return vue.createVNode("div", {
        "class": ns.e("body")
      }, [c.state.swimlanes.map((lane, index) => {
        return vue.createVNode("div", {
          "class": [ns.em("body", "row"), ns.is("expand", lane.isExpand)]
        }, [vue.createVNode("div", {
          "class": [ns.e("cell"), ns.em("body", "cell"), semanticClass("swimlane.item", {
            item: lane
          })],
          "style": semanticStyle("swimlane.item", {
            item: lane
          })
        }, [vue.createVNode("div", {
          "class": ns.em("cell", "content")
        }, [vue.createVNode("div", {
          "class": ns.em("cell", "left")
        }, [vue.createVNode("ion-icon", {
          "class": ns.em("cell", "expand-icon"),
          "name": lane.isExpand ? "chevron-down-outline" : "chevron-forward-outline",
          "onClick": () => {
            lane.isExpand = !lane.isExpand;
          }
        }, null), vue.createVNode("div", {
          "class": [ns.em("cell", "caption"), semanticClass("swimlane.item.caption", {
            item: lane
          })],
          "style": semanticStyle("swimlane.item.caption", {
            item: lane
          })
        }, [lane.caption])]), vue.createVNode("div", {
          "class": ns.em("cell", "right")
        }, [vue.createVNode("span", {
          "class": [ns.em("cell", "description"), semanticClass("swimlane.item.description", {
            item: lane
          })],
          "style": semanticStyle("swimlane.item.description", {
            item: lane
          })
        }, ["".concat(lane.count, " ").concat(ibiz.i18n.t("app.piece")).concat(c.laneDescription)])])])]), c.state.groups.map((group) => {
          if (group.hidden)
            return void 0;
          return renderBodyCell(index, lane, group);
        })]);
      })]);
    };
    return {
      ns,
      swimlaneKanban,
      width,
      renderHeader,
      renderBody
    };
  },
  render() {
    var _a;
    return vue.createVNode("div", {
      "ref": "swimlaneKanban",
      "class": [this.ns.b(), this.ns.e((_a = this.controller.model.groupStyle) == null ? void 0 : _a.toLowerCase())],
      "style": {
        "--ibiz-swimlane-kanban-width": "".concat(this.width, "px")
      }
    }, [vue.createVNode("div", {
      "class": this.ns.e("table")
    }, [this.renderHeader(), this.renderBody()])]);
  }
});

exports.SwimlaneKanban = SwimlaneKanban;
