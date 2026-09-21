import { isVNode, defineComponent, ref, computed, onMounted, onBeforeUnmount, createVNode, resolveComponent, createTextVNode } from 'vue';
import { useControlController, useNamespace, hasEmptyPanelRenderer, IBizCustomRender } from '@ibiz-template/vue3-util';
import draggable from 'vuedraggable';
import { KanbanController } from '@ibiz-template/runtime';
import { NOOP, listenJSEvent, showTitle } from '@ibiz-template/core';
import './kanban.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const KanbanControl = /* @__PURE__ */ defineComponent({
  name: "IBizKanbanControl",
  components: {
    draggable
  },
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
    mdctrlActiveMode: {
      type: Number,
      default: void 0
    },
    singleSelect: {
      type: Boolean,
      default: void 0
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    var _a, _b, _c;
    const c = useControlController((...args) => new KanbanController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const kanban = ref();
    const isFull = ref(false);
    const disabled = computed(() => {
      return !c.state.draggable || c.state.updating;
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
    const groupClass = ((_c = c.model.groupSysCss) == null ? void 0 : _c.cssName) || "";
    const collapseMap = ref({});
    let cleanup = NOOP;
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
    onMounted(() => {
      cleanup = listenJSEvent(window, "resize", () => {
        isFull.value = c.getFullscreen();
      });
    });
    onBeforeUnmount(() => {
      if (cleanup !== NOOP) {
        cleanup();
      }
    });
    const renderPanelItemLayout = (item, modelData) => {
      const {
        context,
        params
      } = c;
      return createVNode(resolveComponent("iBizControlShell"), {
        "data": item,
        "modelData": modelData,
        "context": context,
        "params": params
      }, null);
    };
    const renderItemAction = (item, group) => {
      var _a2;
      return createVNode(resolveComponent("iBizActionToolbar"), {
        "class": ns.bem("item", "bottom", "actions"),
        "action-details": (_a2 = c.getOptItemModel().deuiactionGroup) == null ? void 0 : _a2.uiactionGroupDetails,
        "actions-state": c.getOptItemAction(item),
        "onActionClick": (detail, event) => c.onGroupActionClick(detail, item, event, group)
      }, null);
    };
    const renderQuickToolBar = (group) => {
      if (!quickToolbarModel) {
        return;
      }
      return createVNode(resolveComponent("iBizControlShell"), {
        "class": ns.e("quicktoolbar"),
        "modelData": {
          ...quickToolbarModel,
          name: "".concat(quickToolbarModel.name, "_").concat(group.key)
        },
        "context": c.context,
        "params": c.params
      }, null);
    };
    const renderBatchToolBar = (group) => {
      if (!batchToolbarModel) {
        return;
      }
      return createVNode("div", {
        "class": ns.be("batch", "toolbar")
      }, [createVNode(resolveComponent("iBizControlShell"), {
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
      return createVNode("div", {
        "class": ns.be("batch", "check")
      }, [createVNode(resolveComponent("el-checkbox"), {
        "model-value": checkAll,
        "indeterminate": isIndeterminate,
        "onChange": () => handleCheckAllGroup(group, checkAll)
      }, _isSlot(_slot = ibiz.i18n.t("control.kanban.selectAll")) ? _slot : {
        default: () => [_slot]
      }), createVNode("span", {
        "class": ns.be("batch", "info"),
        "innerHTML": ibiz.i18n.t("control.kanban.selectedDataCount", {
          length: selectedData.length
        })
      }, null)]);
    };
    const renderBatchContainer = (group) => {
      if (batchKey.value !== group.key) {
        return;
      }
      return createVNode("div", {
        "class": ns.b("batch")
      }, [renderBatchToolBar(group), renderBatchCheck(group)]);
    };
    const renderDefaultItem = (item, group) => {
      return [createVNode("div", {
        "class": ns.be("item", "top")
      }, [createVNode("div", {
        "class": ns.bem("item", "top", "title")
      }, [item.srfmajortext]), createVNode("div", {
        "class": ns.bem("item", "top", "description")
      }, [item.content])]), c.getOptItemModel() ? createVNode("div", {
        "class": ns.be("item", "bottom")
      }, [renderItemAction(item, group)]) : null];
    };
    const renderCard = (item, group) => {
      const findIndex = c.state.selectedData.findIndex((data) => {
        return data.srfkey === item.srfkey;
      });
      const cardClass = [ns.b("item"), ns.is("selected", findIndex !== -1), ns.is("disabled", disabled.value)];
      const cardStyle = {};
      if (c.model.cardWidth) {
        cardStyle.width = "".concat(c.model.cardWidth, "px");
      }
      if (c.model.cardHeight) {
        cardStyle.height = "".concat(c.model.cardHeight, "px");
      }
      const panel = props.modelData.itemLayoutPanel;
      return createVNode(resolveComponent("el-card"), {
        "shadow": "hover",
        "class": cardClass,
        "body-style": cardStyle,
        "onClick": (event) => onRowClick(item, event),
        "onDblclick": (event) => onDbRowClick(item, event)
      }, {
        default: () => [panel ? renderPanelItemLayout(item, panel) : renderDefaultItem(item, group)]
      });
    };
    const renderNoData = () => {
      if (!c.state.isLoaded) {
        return;
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
    };
    let cacheInfo = null;
    const onChange = (evt, groupKey) => {
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
        return createVNode("span", {
          "class": ns.be("group", "header-right"),
          "onClick": (event) => stopPropagation(event)
        }, [createVNode(resolveComponent("el-button"), {
          "text": true,
          "onClick": () => c.closeBatch()
        }, _isSlot(_slot2 = ibiz.i18n.t("app.complete")) ? _slot2 : {
          default: () => [_slot2]
        })]);
      }
      return createVNode("span", {
        "class": ns.be("group", "header-right"),
        "onClick": (event) => stopPropagation(event)
      }, [c.enableNew && !c.state.readonly && createVNode(resolveComponent("el-button"), {
        "class": ns.be("group", "header-new"),
        "text": true,
        "circle": true,
        "onClick": (event) => {
          onClickNew(event, group.key);
        }
      }, {
        default: () => [createVNode("ion-icon", {
          "name": "add-outline",
          "title": showTitle(ibiz.i18n.t("app.newlyBuild"))
        }, null)]
      }), showActionBar && createVNode(resolveComponent("el-dropdown"), {
        "class": ns.be("group", "header-actions"),
        "trigger": "click",
        "teleported": false
      }, {
        default: () => createVNode("span", {
          "title": ibiz.i18n.t("app.more")
        }, [createTextVNode("\xB7\xB7\xB7")]),
        dropdown: () => createVNode("div", {
          "class": ns.be("group", "actions-dropdown")
        }, [c.model.groupUIActionGroup && group.groupActionGroupState && createVNode(resolveComponent("iBizActionToolbar"), {
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
        return createVNode("div", {
          "class": [ns.b("group"), ns.is("collapse", collapse), groupClass],
          "style": tempGroupStyle
        }, [createVNode("div", {
          "class": ns.be("group", "header"),
          "style": {
            borderTopColor: group.color || "transparent"
          },
          "onClick": (event) => onCollapse(group, event)
        }, [createVNode("div", {
          "class": ns.be("group", "header-left")
        }, [createVNode("ion-icon", {
          "name": "caret-down-sharp"
        }, null), createVNode("span", {
          "class": [ns.be("group", "header-caption"), ns.is("badge", !!group.color)],
          "style": {
            backgroundColor: group.color
          }
        }, ["".concat(group.caption).concat(group.children.length ? " \xB7 ".concat(group.children.length) : "")])]), renderGroupToolbar(group)]), renderBatchContainer(group), createVNode("div", {
          "class": [ns.be("group", "list"), ns.is("empty", !group.children.length)]
        }, [createVNode(draggable, {
          "class": ns.be("group", "draggable"),
          "modelValue": group.children,
          "group": c.model.id,
          "itemKey": "srfkey",
          "disabled": disabled.value || c.state.readonly,
          "onChange": (evt) => onChange(evt, group.key)
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
            return createVNode("div", {
              "class": ns.be("group", "list")
            }, [renderNoData()]);
          }
        }), renderQuickToolBar(group)])]);
      }
      return createVNode("div", {
        "class": [ns.b("group"), ns.is("collapse", collapse), groupClass]
      }, [createVNode("div", {
        "class": ns.be("group", "header"),
        "style": {
          borderTopColor: group.color || "transparent"
        },
        "onClick": (event) => onCollapse(group, event)
      }, [createVNode("span", {
        "class": [ns.be("group", "header-caption"), ns.is("badge", !!group.color)],
        "style": {
          backgroundColor: group.color
        }
      }, ["".concat(group.caption).concat(group.children.length ? " \xB7 ".concat(group.children.length) : "")]), createVNode("ion-icon", {
        "name": "caret-forward-sharp"
      }, null)])]);
    };
    return {
      c,
      ns,
      isFull,
      kanban,
      onFullScreen,
      renderGroup
    };
  },
  render() {
    var _a;
    const {
      groups,
      isCreated
    } = this.c.state;
    if (!isCreated) {
      return null;
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "ref": "kanban",
      "controller": this.c,
      "class": [this.ns.m((_a = this.modelData.groupLayout) == null ? void 0 : _a.toLowerCase()), this.ns.is("full", this.isFull)]
    }, {
      default: () => [createVNode("div", {
        "class": this.ns.b("group-container")
      }, [groups.length > 0 && groups.map((group) => {
        return this.renderGroup(group);
      })]), groups.length > 0 && createVNode("div", {
        "class": this.ns.e("full-btn"),
        "onClick": this.onFullScreen
      }, [this.isFull ? createVNode("ion-icon", {
        "name": "contract-outline"
      }, null) : createVNode("ion-icon", {
        "name": "expand-outline"
      }, null)])]
    });
  }
});

export { KanbanControl };
