import { isVNode, defineComponent, createVNode, resolveComponent, ref, watch } from 'vue';
import { useControlController, useNamespace, usePopoverVisible, usePopoverzIndex } from '@ibiz-template/vue3-util';
import './context-menu.css';
import { ContextMenuController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ContextMenuControl = /* @__PURE__ */ defineComponent({
  name: "IBizContextMenuControl",
  props: {
    /**
     * @description 上下文菜单模型数据
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
     * @description 模式，值为dropdown:下拉模式，buttons:按钮组模式
     * @default buttons
     */
    mode: {
      type: String,
      default: "buttons"
    },
    /**
     * @description 分组的行为级别
     * @default [50]
     */
    groupLevelKeys: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [50]
    },
    /**
     * @description 节点数据
     */
    nodeData: {
      type: Object,
      required: true
    },
    /**
     * @description 节点模型
     */
    nodeModel: {
      type: Object,
      required: true
    },
    /**
     * @description 点击菜单项时的回调函数，存在此参数时不抛出action-click事件
     */
    actionCallBack: {
      type: Function
    }
  },
  setup(props, {
    emit
  }) {
    const c = useControlController((...args) => new ContextMenuController(...args));
    const ns = useNamespace("context-menu");
    const actionDetails = props.modelData.detoolbarItems;
    const expandDetails = ref([]);
    const groupDetails = ref([]);
    const groupButtonRef = ref();
    const {
      popoverVisible,
      setPopoverVisible
    } = usePopoverVisible(groupButtonRef, (ele) => {
      return ele.ref;
    });
    const dropdownRef = ref();
    const {
      popoverid,
      setPopoverZIndex
    } = usePopoverzIndex();
    const isRefUIActionGroup = (detail) => {
      return !!(detail.detailType === "DEUIACTIONGROUP" && detail.refUIActionGroup);
    };
    const transformLanguage = (items) => {
      if (!Array.isArray(items)) {
        return;
      }
      items.forEach((detail) => {
        if (detail.capLanguageRes && detail.capLanguageRes.lanResTag) {
          detail.caption = ibiz.i18n.t(detail.capLanguageRes.lanResTag, detail.caption);
        }
        if (detail.tooltipLanguageRes && detail.tooltipLanguageRes.lanResTag) {
          detail.tooltip = ibiz.i18n.t(detail.tooltipLanguageRes.lanResTag, detail.tooltip);
        }
        transformLanguage(detail.detoolbarItems);
      });
    };
    if (actionDetails) {
      transformLanguage(actionDetails);
      actionDetails.forEach((detail) => {
        if (!detail.actionLevel || props.groupLevelKeys.findIndex((item) => item === detail.actionLevel) !== -1) {
          groupDetails.value.push(detail);
        } else {
          expandDetails.value.push(detail);
        }
      });
    }
    const calcActionItemClass = (item) => {
      var _a;
      const {
        actionLevel
      } = item;
      return [ns.e("item"), "".concat((_a = item == null ? void 0 : item.sysCss) == null ? void 0 : _a.cssName), ns.em("item", "level-".concat(actionLevel)), ns.is("disabled", c.state.buttonsState[item.id].disabled)];
    };
    watch(() => props.nodeData, async (newVal, oldVal) => {
      if (newVal !== oldVal) {
        await c.calcButtonState(newVal._deData || (newVal.srfkey ? newVal : void 0), props.nodeModel.appDataEntityId);
      }
    });
    c.evt.on("onCreated", async () => {
      await c.calcButtonState(props.nodeData._deData || (props.nodeData.srfkey ? props.nodeData : void 0), props.nodeModel.appDataEntityId);
    });
    const handleClick = async (detail, e) => {
      e.stopPropagation();
      if (!detail.uiactionId) {
        setPopoverVisible(false);
        return;
      }
      if (props.actionCallBack) {
        await props.actionCallBack(detail, e);
      }
      if (props.mode === "buttons") {
        setPopoverVisible(false);
      } else if (dropdownRef.value) {
        dropdownRef.value.handleClose();
      }
      if (!props.actionCallBack) {
        emit("action-click", detail, e);
      }
    };
    const calcDetailCaption = (detail) => {
      var _a, _b;
      return ((_a = detail.refUIActionGroup) == null ? void 0 : _a.name) || ((_b = detail.refUIActionGroup) == null ? void 0 : _b.id) || detail.caption;
    };
    const renderItemContent = (detail) => {
      return [detail.showIcon && detail.sysImage && createVNode("div", {
        "class": ns.e("action-content-icon")
      }, [createVNode(resolveComponent("iBizIcon"), {
        "icon": detail.sysImage
      }, null)]), detail.showCaption ? createVNode("div", {
        "class": [ns.e("action-content-caption"), ns.e("action-content-group-caption")]
      }, [calcDetailCaption(detail)]) : null];
    };
    const renderActionGroup = (detail, isExpand = true) => {
      var _a;
      const actionGroup = detail.refUIActionGroup;
      if (!((_a = actionGroup == null ? void 0 : actionGroup.uiactionGroupDetails) == null ? void 0 : _a.length))
        return null;
      const pvisible = actionGroup.uiactionGroupDetails.some((item) => {
        return c.state.buttonsState[item.id].visible;
      });
      if (!pvisible)
        return null;
      const ishorizontal = isExpand;
      return [detail.addSeparator && renderDivider(isExpand), createVNode(resolveComponent("el-popover"), {
        "teleported": false,
        "popper-class": ns.e("popover"),
        "placement": ishorizontal ? "bottom" : "right-start",
        "popper-options": {
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 4]
            }
          }]
        }
      }, {
        reference: () => {
          return createVNode(resolveComponent("el-button"), {
            "text": true,
            "size": "small",
            "class": [...calcActionItemClass(detail), ns.e("group-item")]
          }, {
            default: () => [createVNode("div", {
              "class": ns.em("group-item", "content")
            }, [createVNode("div", {
              "class": ns.em("group-item", "caption")
            }, [renderItemContent(detail)]), createVNode("ion-icon", {
              "class": ns.em("group-item", "icon"),
              "name": ishorizontal ? "chevron-down-outline" : "chevron-forward-outline"
            }, null)])]
          });
        },
        default: () => {
          return renderActions(actionGroup.uiactionGroupDetails || [], false);
        }
      })];
    };
    const renderDivider = (isExpand) => {
      return createVNode(resolveComponent("el-divider"), {
        "class": ns.e("separator"),
        "border-style": "double",
        "direction": isExpand ? "vertical" : "horizontal"
      }, null);
    };
    const renderActionButton = (detail, isExpand = true) => {
      if (c.state.buttonsState[detail.id].visible) {
        return [detail.addSeparator && renderDivider(isExpand), createVNode(resolveComponent("el-button"), {
          "text": true,
          "size": "small",
          "title": showTitle(detail.tooltip),
          "class": calcActionItemClass(detail),
          "disabled": c.state.buttonsState[detail.id].disabled,
          "onClick": (e) => handleClick(detail, e)
        }, {
          default: () => [createVNode("div", {
            "class": ns.e("action-content")
          }, [detail.showIcon && detail.sysImage && createVNode("div", {
            "class": ns.e("action-content-icon")
          }, [createVNode(resolveComponent("iBizIcon"), {
            "icon": detail.sysImage
          }, null)]), detail.showCaption ? createVNode("div", {
            "class": ns.e("action-content-caption")
          }, [calcDetailCaption(detail)]) : ""])]
        })];
      }
      return null;
    };
    const renderGroupItem = (item, isExpand = true) => {
      var _a, _b, _c;
      const {
        groupExtractMode,
        uiactionGroup
      } = item;
      let detail = item;
      if (uiactionGroup && groupExtractMode === "ITEM") {
        return (_a = uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) == null ? void 0 : _a.map((_item) => {
          if (isRefUIActionGroup(_item))
            return renderActionGroup(_item, isExpand);
          return renderActionButton(_item, isExpand);
        });
      }
      const details = (_c = (_b = item.uiactionGroup) == null ? void 0 : _b.uiactionGroupDetails) == null ? void 0 : _c.filter((_item) => c.state.buttonsState[_item.id].visible);
      if (uiactionGroup && groupExtractMode === "ITEMX" && details) {
        detail = details[0];
        if (isRefUIActionGroup(detail))
          return renderActionGroup(detail, isExpand);
      }
      if (detail) {
        return createVNode(resolveComponent("el-popover"), {
          "placement": "right-start",
          "popper-class": ns.e("popover"),
          "teleported": false,
          "popper-options": {
            modifiers: [{
              name: "offset",
              options: {
                offset: [0, 4]
              }
            }]
          }
        }, {
          reference: () => {
            return createVNode(resolveComponent("el-button"), {
              "text": true,
              "size": "small",
              "onClick": (e) => handleClick(detail, e),
              "title": showTitle(detail.tooltip),
              "class": calcActionItemClass(detail),
              "disabled": c.state.buttonsState[detail.id].disabled
            }, {
              default: () => [createVNode("div", {
                "class": ns.e("action-content")
              }, [detail.showIcon && detail.sysImage && createVNode("div", {
                "class": ns.e("action-content-icon")
              }, [createVNode(resolveComponent("iBizIcon"), {
                "icon": detail.sysImage
              }, null)]), detail.showCaption ? createVNode("div", {
                "class": [ns.e("action-content-caption"), ns.e("action-content-group-caption")]
              }, [calcDetailCaption(detail)]) : "", createVNode("ion-icon", {
                "class": ns.e("action-content-group-icon"),
                "name": "chevron-forward-outline"
              }, null)])]
            });
          },
          default: () => {
            if (uiactionGroup) {
              return details == null ? void 0 : details.map((_item, index) => {
                if (groupExtractMode === "ITEMX" && index === 0) {
                  return null;
                }
                if (isRefUIActionGroup(_item))
                  return renderActionGroup(_item, isExpand);
                return renderActionButton(_item, isExpand);
              });
            }
            return renderActions(item.detoolbarItems || [], isExpand);
          }
        });
      }
    };
    const renderActions = (items, isExpand = true) => {
      return items.map((detail) => {
        var _a;
        if (!((_a = c.state.buttonsState[detail.id]) == null ? void 0 : _a.visible)) {
          return null;
        }
        if (detail.itemType === "SEPERATOR") {
          return renderDivider(isExpand);
        }
        if (detail.itemType === "DEUIACTION") {
          return renderActionButton(detail, isExpand);
        }
        if (detail.itemType === "ITEMS") {
          return renderGroupItem(detail, isExpand);
        }
        if (isRefUIActionGroup(detail))
          return renderActionGroup(detail, isExpand);
        return null;
      });
    };
    return {
      c,
      ns,
      popoverid,
      expandDetails,
      groupDetails,
      groupButtonRef,
      dropdownRef,
      popoverVisible,
      handleClick,
      renderActions,
      renderActionButton,
      calcActionItemClass,
      calcDetailCaption,
      setPopoverZIndex,
      actionDetails
    };
  },
  render() {
    const details = this.actionDetails || [];
    const renderGroup = () => {
      let _slot;
      if (this.groupDetails.length === 0) {
        return null;
      }
      const pvisible = this.groupDetails.findIndex((item) => {
        return this.c.state.buttonsState[item.id].visible === true;
      }) !== -1;
      if (!pvisible) {
        return null;
      }
      const pdisabled = this.groupDetails.findIndex((item) => {
        return this.c.state.buttonsState[item.id].disabled === false;
      }) === -1;
      return [createVNode(resolveComponent("el-button"), {
        "size": "small",
        "text": true,
        "disabled": pdisabled,
        "ref": "groupButtonRef",
        "class": [this.ns.e("item"), this.ns.is("expand", this.popoverVisible)],
        "onClick": () => {
          this.popoverVisible = !this.popoverVisible;
        }
      }, {
        icon: () => createVNode("ion-icon", {
          "class": this.ns.e("icon"),
          "name": "ellipsis-vertical"
        }, null)
      }), createVNode(resolveComponent("el-popover"), {
        "placement": "bottom-start",
        "virtual-ref": this.groupButtonRef,
        "visible": this.popoverVisible,
        "popper-class": [this.popoverid, this.ns.e("popover"), this.ns.e("transfer")],
        "virtual-triggering": true,
        "transition": "none",
        "onBefore-enter": () => this.setPopoverZIndex("--".concat(this.ns.namespace, "-context-menu-transfer-zindex"))
      }, _isSlot(_slot = this.renderActions(this.groupDetails, false)) ? _slot : {
        default: () => [_slot]
      })];
    };
    if (!this.c.state.buttonsState.visible) {
      return;
    }
    if (this.mode === "buttons") {
      return createVNode("div", {
        "class": [this.ns.b(), this.ns.m("buttons")],
        "onClick": (e) => e.stopPropagation()
      }, [this.renderActions(this.expandDetails), renderGroup()]);
    }
    return createVNode(resolveComponent("el-dropdown"), {
      "ref": "dropdownRef",
      "onCommand": (command) => this.handleClick(command, new MouseEvent("click")),
      "onVisible-change": () => this.setPopoverZIndex("--".concat(this.ns.namespace, "-context-menu-transfer-zindex")),
      "popper-class": [this.popoverid, this.ns.e("transfer")],
      "class": [this.ns.b(), this.ns.m("dropdown")]
    }, {
      default: () => createVNode("span", {
        "class": this.ns.e("caption")
      }, [createVNode("ion-icon", {
        "class": this.ns.e("caption-icon"),
        "name": "ibiz-arrow-down"
      }, null)]),
      dropdown: () => createVNode(resolveComponent("el-dropdown-menu"), null, {
        default: () => [details.length > 0 && details.map((detail) => {
          var _a;
          if ((_a = this.c.state.buttonsState[detail.id]) == null ? void 0 : _a.visible) {
            return createVNode(resolveComponent("el-dropdown-item"), {
              "class": [this.ns.e("item"), this.ns.is("disabled", false)],
              "title": showTitle(detail.tooltip),
              "disabled": this.c.state.buttonsState[detail.id].disabled,
              "command": detail
            }, {
              default: () => [detail.showIcon && detail.sysImage && createVNode(resolveComponent("iBizIcon"), {
                "icon": detail.sysImage
              }, null), detail.showCaption ? this.calcDetailCaption(detail) : ""]
            });
          }
          return null;
        })]
      })
    });
  }
});

export { ContextMenuControl };
