import { isVNode, defineComponent, createVNode, ref, onMounted, onBeforeUnmount, computed, resolveComponent, createTextVNode } from 'vue';
import { useNamespace, useUIStore, useSemanticNode } from '@ibiz-template/vue3-util';
import draggable from 'vuedraggable';
import { NOOP, listenJSEvent, showTitle } from '@ibiz-template/core';
import './swimlane-kanban.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const SwimlaneKanban = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("swimlane-kanban");
    const c = props.controller;
    const {
      zIndex
    } = useUIStore();
    const isFull = ref(false);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const popperStyle = {
      zIndex: zIndex.increment()
    };
    const expandAll = ref(true);
    const dropdownKey = ref();
    const swimlaneKanban = ref();
    let cleanup = NOOP;
    onMounted(() => {
      cleanup = listenJSEvent(window, "resize", () => {
        isFull.value = c.getFullscreen();
      });
    });
    onBeforeUnmount(() => {
      if (cleanup !== NOOP)
        cleanup();
    });
    const disabled = computed(() => {
      return !c.state.draggable || c.draggableMode === 0 || c.state.updating || c.state.readonly;
    });
    const width = computed(() => {
      const {
        groupWidth,
        cardWidth
      } = c.model;
      return groupWidth || cardWidth || 320;
    });
    const batchKey = computed(() => {
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
        return createVNode("div", {
          "class": [ns.em("cell", "right"), ns.em("header", "actions")]
        }, [createVNode(resolveComponent("el-button"), {
          "text": true,
          "onClick": () => c.closeBatch()
        }, _isSlot(_slot = ibiz.i18n.t("app.complete")) ? _slot : {
          default: () => [_slot]
        })]);
      return createVNode("div", {
        "class": [ns.em("cell", "right"), ns.em("header", "actions"), semanticClass("group.toolbar", {
          group
        })],
        "style": semanticStyle("group.toolbar", {
          group
        })
      }, [createVNode(resolveComponent("el-button"), {
        "text": true,
        "circle": true,
        "class": ns.em("header", "action"),
        "onClick": () => {
          group.isExpand = false;
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "chevron-back-outline",
          "title": ibiz.i18n.t("control.kanban.collapsed")
        }, null)]
      }), showActionBar && createVNode(resolveComponent("el-dropdown"), {
        "trigger": "click",
        "teleported": false,
        "style": popperStyle,
        "class": [ns.em("header", "action"), ns.is("visible", group.key === dropdownKey.value)],
        "popper-class": ns.em("header", "popper"),
        "onVisibleChange": (val) => onVisibleChange(val, group.key)
      }, {
        default: () => createVNode(resolveComponent("el-button"), {
          "text": true,
          "circle": true
        }, {
          default: () => [createVNode("ion-icon", {
            "title": showTitle(ibiz.i18n.t("app.more")),
            "name": "ellipsis-horizontal"
          }, null)]
        }),
        dropdown: () => createVNode("div", {
          "class": ns.em("header", "toolbar")
        }, [c.model.groupUIActionGroup && createVNode(resolveComponent("iBizActionToolbar"), {
          "direction": "vertical",
          "placement": "right-start",
          "teleported": false,
          "zIndex": c.state.zIndex,
          "actionDetails": c.model.groupUIActionGroup.uiactionGroupDetails,
          "actionsState": group.groupActionGroupState,
          "onActionClick": (detail, event) => {
            c.onGroupToolbarClick(detail, event, group);
          }
        }, null), batchToolbarModel && createVNode(resolveComponent("el-button"), {
          "size": "small",
          "onClick": () => {
            c.openBatch(group.key);
          }
        }, {
          default: () => [createVNode("ion-icon", {
            "name": "checkmark-sharp"
          }, null), ibiz.i18n.t("control.kanban.natchOperation")]
        })])
      })]);
    };
    const renderHeaderCell = (group) => {
      return createVNode("div", {
        "class": [ns.e("cell"), ns.em("header", "cell"), ns.is("collapsed", group.isExpand === false), semanticClass("group.header", {
          group
        })],
        "style": semanticStyle("group.header", {
          group
        })
      }, [createVNode("div", {
        "class": ns.em("cell", "content")
      }, [createVNode("div", {
        "class": ns.em("cell", "left")
      }, [createVNode("div", {
        "class": [ns.em("cell", "caption"), semanticClass("group.caption", {
          group
        })],
        "style": semanticStyle("group.caption", {
          group
        })
      }, [group.caption, createVNode("span", {
        "class": ns.em("cell", "separator")
      }, [createTextVNode("\xB7")]), group.children.length]), group.isExpand === false && createVNode(resolveComponent("el-button"), {
        "text": true,
        "circle": true,
        "onClick": () => {
          group.isExpand = true;
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "title": ibiz.i18n.t("control.kanban.expand"),
          "name": "chevron-forward-outline"
        }, null)]
      })]), renderHeaderToolbar(group)])]);
    };
    const renderHeader = () => {
      return createVNode("div", {
        "class": ns.e("header")
      }, [createVNode("div", {
        "class": ns.em("header", "row")
      }, [createVNode("div", {
        "class": [ns.e("cell"), ns.em("header", "cell"), semanticClass("swimlane.header")],
        "style": semanticStyle("swimlane.header")
      }, [createVNode("div", {
        "class": ns.em("cell", "content")
      }, [createVNode("div", {
        "class": ns.em("cell", "left")
      }, [createVNode("ion-icon", {
        "onClick": handleExpandAll,
        "class": ns.em("cell", "expand-icon"),
        "title": expandAll.value ? ibiz.i18n.t("control.kanban.allCollapsed") : ibiz.i18n.t("control.kanban.allExpand"),
        "name": expandAll.value ? "chevron-collapse-outline" : "chevron-expand-outline"
      }, null), createVNode("div", {
        "class": [ns.em("cell", "caption"), semanticClass("swimlane.caption")],
        "style": semanticStyle("swimlane.caption")
      }, [ibiz.i18n.t("control.kanban.lane")])]), createVNode("div", {
        "class": [ns.em("cell", "right"), semanticClass("toolbar")],
        "style": semanticStyle("toolbar")
      }, [c.enableGroupHidden && createVNode(resolveComponent("iBizKanbanSetting"), {
        "class": [ns.e("setting"), semanticClass("setting")],
        "style": semanticStyle("setting"),
        "buttonStyle": {
          circle: true,
          type: "text"
        },
        "controller": props.controller
      }, null), c.enableFullScreen && createVNode(resolveComponent("el-button"), {
        "type": "text",
        "circle": true,
        "onClick": onFullScreen,
        "class": [ns.e("fullscreen"), semanticClass("fullscreen")],
        "style": semanticStyle("fullscreen"),
        "title": isFull.value ? ibiz.i18n.t("app.cancelFullscreen") : ibiz.i18n.t("app.fullscreen")
      }, {
        default: () => [createVNode("ion-icon", {
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
      return createVNode(resolveComponent("iBizControlShell"), {
        "data": item,
        "params": params,
        "context": context,
        "class": ns.e("panel-item"),
        "modelData": itemLayoutPanel
      }, null);
    };
    const renderDefaultItem = (lane, item, group) => {
      const actionModel = c.getOptItemModel();
      return createVNode("div", {
        "class": ns.e("default-item")
      }, [createVNode("div", {
        "class": ns.em("default-item", "header")
      }, [item.srfmajortext]), createVNode("div", {
        "class": ns.em("default-item", "content")
      }, [item.content]), actionModel.length ? createVNode("div", {
        "class": ns.em("default-item", "footer")
      }, [createVNode(resolveComponent("iBizActionToolbar"), {
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
      return createVNode("div", {
        "class": ns.em("cell", "toolbar")
      }, [c.enableNew && !c.state.readonly && createVNode(resolveComponent("el-button"), {
        "text": true,
        "class": ns.em("cell", "action"),
        "onClick": (event) => {
          c.onClickNew(event, group.key, lane);
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "add-outline"
        }, null), ibiz.i18n.t("app.newlyBuild")]
      }), quickToolbarModel && items.length === 0 && createVNode(resolveComponent("iBizControlShell"), {
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
      return createVNode("div", {
        "class": ns.e("batch")
      }, [createVNode(resolveComponent("iBizControlShell"), {
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
      }, null), createVNode("div", {
        "class": ns.em("batch", "check")
      }, [createVNode(resolveComponent("el-checkbox"), {
        "model-value": checkAll,
        "indeterminate": isIndeterminate,
        "onChange": () => handleCheckAllGroup(group, checkAll)
      }, _isSlot(_slot2 = ibiz.i18n.t("control.kanban.selectAll")) ? _slot2 : {
        default: () => [_slot2]
      }), createVNode("span", {
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
      return createVNode("div", {
        "class": [ns.e("cell"), ns.em("body", "cell"), ns.is("collapsed", group.isExpand === false)]
      }, [index === 0 && renderBatchToolBar(group), group.isExpand !== false ? createVNode("div", {
        "class": ns.em("cell", "content")
      }, [lane.isExpand ? [createVNode(draggable, {
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
          return createVNode(resolveComponent("el-card"), {
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
            default: () => [createVNode("div", {
              "class": ns.em("card", "content")
            }, [c.state.draggable && !c.state.readonly && c.draggableMode !== 0 && createVNode("svg", {
              "viewBox": "0 0 16 16",
              "xmlns": "http://www.w3.org/2000/svg",
              "height": "1em",
              "width": "1em",
              "class": ns.e("drag-icon"),
              "preserveAspectRatio": "xMidYMid meet",
              "focusable": "false"
            }, [createVNode("g", {
              "stroke-width": "1",
              "fill-rule": "evenodd"
            }, [createVNode("g", {
              "transform": "translate(5 1)",
              "fill-rule": "nonzero"
            }, [createVNode("path", {
              "d": "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            }, null)])])]), c.model.itemLayoutPanel ? renderPanelItemLayout(lane, element) : renderDefaultItem(lane, element, group)])]
          });
        }
      }), renderBodyCellToolber(lane, group)] : createVNode("div", {
        "class": ns.em("cell", "left")
      }, [createVNode("span", {
        "class": ns.em("cell", "description")
      }, ["".concat(group.children.filter((child) => swimlaneAppDEFieldId && child[swimlaneAppDEFieldId] === lane.key).length, " \u4E2A").concat(group.caption)])])]) : null]);
    };
    const renderBody = () => {
      return createVNode("div", {
        "class": ns.e("body")
      }, [c.state.swimlanes.map((lane, index) => {
        return createVNode("div", {
          "class": [ns.em("body", "row"), ns.is("expand", lane.isExpand)]
        }, [createVNode("div", {
          "class": [ns.e("cell"), ns.em("body", "cell"), semanticClass("swimlane.item", {
            item: lane
          })],
          "style": semanticStyle("swimlane.item", {
            item: lane
          })
        }, [createVNode("div", {
          "class": ns.em("cell", "content")
        }, [createVNode("div", {
          "class": ns.em("cell", "left")
        }, [createVNode("ion-icon", {
          "class": ns.em("cell", "expand-icon"),
          "name": lane.isExpand ? "chevron-down-outline" : "chevron-forward-outline",
          "onClick": () => {
            lane.isExpand = !lane.isExpand;
          }
        }, null), createVNode("div", {
          "class": [ns.em("cell", "caption"), semanticClass("swimlane.item.caption", {
            item: lane
          })],
          "style": semanticStyle("swimlane.item.caption", {
            item: lane
          })
        }, [lane.caption])]), createVNode("div", {
          "class": ns.em("cell", "right")
        }, [createVNode("span", {
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
    return createVNode("div", {
      "ref": "swimlaneKanban",
      "class": [this.ns.b(), this.ns.e((_a = this.controller.model.groupStyle) == null ? void 0 : _a.toLowerCase())],
      "style": {
        "--ibiz-swimlane-kanban-width": "".concat(this.width, "px")
      }
    }, [createVNode("div", {
      "class": this.ns.e("table")
    }, [this.renderHeader(), this.renderBody()])]);
  }
});

export { SwimlaneKanban };
