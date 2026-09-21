import { isVNode, defineComponent, createVNode, resolveComponent, ref, h, createTextVNode } from 'vue';
import { useControlController, useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { ToolbarController } from '@ibiz-template/runtime';
import { showTitle } from '@ibiz-template/core';
import '../../util/index.mjs';
import './toolbar.css';
import { convertBtnType } from '../../util/button-util/button-util.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const calcCssName = (item) => {
  var _a;
  return (_a = item == null ? void 0 : item.sysCss) == null ? void 0 : _a.cssName;
};
const ToolbarControl = /* @__PURE__ */ defineComponent({
  name: "IBizToolbarControl",
  props: {
    /**
     * @description 工具栏模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 绘制模式，可选值为DESIGN、RUNTIME，默认值为RUNTIME
     */
    runMode: {
      type: String,
      default: "RUNTIME"
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
     * @description 是否手动计算按钮状态,即工具栏自身默认不计算权限
     * @default false
     */
    manualCalcButtonState: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, {
    emit
  }) {
    var _a;
    const c = useControlController((...args) => new ToolbarController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const ns2 = useNamespace("control-".concat(c.model.controlType.toLowerCase(), "-actions"));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const btnSize = ref("default");
    const toolbarStyle = (_a = c.model.toolbarStyle) == null ? void 0 : _a.toLowerCase();
    const isRefUIActionGroup = (detail) => {
      return !!(detail.detailType === "DEUIACTIONGROUP" && detail.refUIActionGroup);
    };
    const handleClick = async (item, event, params) => {
      if (props.runMode === "RUNTIME") {
        await c.onItemClick(item, event, params);
      } else {
        emit("click", item);
      }
    };
    const handleActionClick = async (item, event, params) => {
      if (props.runMode === "RUNTIME") {
        const tempItem = {};
        Object.assign(tempItem, {
          ...item,
          itemType: item.detailType
        });
        await handleClick(tempItem, event, params);
      } else {
        emit("click", item);
      }
    };
    const btnContent = (item, state) => {
      var _a2, _b;
      const counterNum = state && item.counterId ? state.counterData[item.counterId] : void 0;
      const tempItem = item;
      const caption = ((_a2 = tempItem.refUIActionGroup) == null ? void 0 : _a2.name) || ((_b = tempItem.refUIActionGroup) == null ? void 0 : _b.id) || item.caption;
      const image = item.sysImage;
      const result = [];
      const ns3 = useNamespace("toolbar-item");
      if (item.showIcon && image) {
        result.push(createVNode("span", {
          "class": [ns3.b("icon"), semanticClass("item.icon", {
            item
          })],
          "style": semanticStyle("item.icon", item)
        }, [createVNode(resolveComponent("iBizIcon"), {
          "icon": image
        }, null)]));
      }
      if (item.showCaption && caption) {
        result.push(createVNode("span", {
          "class": [ns3.b("text"), semanticClass("item.caption", {
            item
          })],
          "style": semanticStyle("item.caption", {
            item
          })
        }, [caption]));
      }
      if (counterNum) {
        result.push(createVNode(resolveComponent("iBizBadge"), {
          "class": [ns3.b("counter"), semanticClass("item.counter", {
            item
          })],
          "style": semanticStyle("item.counter", {
            item
          }),
          "value": counterNum,
          "counterMode": item.counterMode
        }, null));
      }
      return result;
    };
    const renderExtraButtons = (extraButtons) => {
      return extraButtons.map((button) => {
        let _slot;
        return createVNode("div", {
          "key": button.id,
          "class": [ns.e("item"), semanticClass("item", {
            item: button
          })],
          "style": semanticStyle("item", {
            item: button
          })
        }, [createVNode(resolveComponent("el-button"), {
          "title": showTitle(button.tooltip),
          "size": btnSize.value,
          "onClick": (e) => handleClick(button, e)
        }, _isSlot(_slot = btnContent(button, c.state)) ? _slot : {
          default: () => [_slot]
        })]);
      });
    };
    const renderEmbedGroupDetail = (item, detail) => {
      var _a2, _b;
      let _slot2;
      if (item.id !== detail.id && isRefUIActionGroup(detail))
        return renderActionGroupItems(detail, true);
      const actionId = detail.uiactionId;
      const visible = (_a2 = c.state.buttonsState[detail.id]) == null ? void 0 : _a2.visible;
      const provider = c.itemProviders[detail.id];
      if (!visible) {
        return null;
      }
      if (provider) {
        const component = resolveComponent(provider.component);
        return h(component, {
          key: detail.id,
          class: [ns.e("item"), semanticClass("item", {
            item: detail
          })],
          style: semanticStyle("item", {
            item: detail
          }),
          item,
          controller: c
        });
      }
      const buttonType = (_b = detail.buttonStyle) == null ? void 0 : _b.toLowerCase();
      if (actionId === "exportexcel" || actionId === "gridview_exportaction") {
        return createVNode(resolveComponent("i-biz-export-excel"), {
          "class": [ns.e("menu-exportexcel"), ns.em("item", buttonType), calcCssName(detail), semanticClass("item", {
            item: detail
          })],
          "style": semanticStyle("item", {
            item: detail
          }),
          "mode": "menu",
          "item": detail,
          "btnContent": (barItem) => btnContent(barItem, c.state),
          "size": btnSize.value,
          "controller": c,
          "onExportExcel": (e, data) => {
            handleActionClick(detail, e, data);
          }
        }, null);
      }
      return createVNode(resolveComponent("el-menu-item"), {
        "class": [ns.is("loading", c.state.buttonsState[detail.id].loading), ns.em("item", buttonType), calcCssName(detail), semanticClass("item", {
          item: detail
        })],
        "style": semanticStyle("item", {
          item: detail
        }),
        "index": "menuitem".concat(detail.id),
        "disabled": c.state.buttonsState[detail.id].disabled,
        "title": showTitle(detail.caption)
      }, {
        default: () => [createVNode(resolveComponent("el-button"), {
          "loading": c.state.buttonsState[detail.id].loading,
          "onClick": (e) => {
            if (!detail.uiactionId)
              return;
            handleActionClick(detail, e);
          }
        }, _isSlot(_slot2 = btnContent(detail, c.state)) ? _slot2 : {
          default: () => [_slot2]
        })]
      });
    };
    const renderActionButton = (detail, type) => {
      if (c.state.buttonsState[detail.id].visible) {
        let _slot3;
        return createVNode(resolveComponent("el-button"), {
          "size": btnSize.value,
          "class": calcCssName(detail),
          "type": type || convertBtnType(detail.buttonStyle),
          "title": showTitle(detail.tooltip || detail.caption),
          "loading": c.state.buttonsState[detail.id].loading,
          "disabled": c.state.buttonsState[detail.id].disabled,
          "onClick": (e) => handleActionClick(detail, e)
        }, _isSlot(_slot3 = btnContent(detail, c.state)) ? _slot3 : {
          default: () => [_slot3]
        });
      }
      return null;
    };
    const renderDropdownItem = (detail) => {
      if (c.state.buttonsState[detail.id].visible) {
        const disabled = c.state.buttonsState[detail.id].disabled;
        const content = isRefUIActionGroup(detail) ? renderActionGroupItems(detail, false, true) : renderActionButton(detail);
        return createVNode(resolveComponent("el-dropdown-item"), {
          "class": [ns2.be("dropdown-popper", "dropdown-item"), ns2.is("disabled", !!disabled), ns.em("item", convertBtnType(detail.buttonStyle)), semanticClass("item", {
            item: detail
          })],
          "style": semanticStyle("item", {
            item: detail
          })
        }, _isSlot(content) ? content : {
          default: () => [content]
        });
      }
      return null;
    };
    const renderActionGroupItems = (item, isEmbed, isSubPopover = false) => {
      const {
        uiactionGroup,
        refUIActionGroup
      } = item;
      const uiactionGroupDetails = (uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) || (refUIActionGroup == null ? void 0 : refUIActionGroup.uiactionGroupDetails);
      if (uiactionGroupDetails) {
        const enableDropdown = uiactionGroupDetails.length > 0;
        const groupButtonStyle = item.buttonStyle || "";
        if (isEmbed) {
          const curDisabled = c.state.buttonsState[item.id].disabled;
          const pdisabled = curDisabled || uiactionGroupDetails.findIndex((item2) => {
            var _a2;
            return ((_a2 = c.state.buttonsState[item2.id]) == null ? void 0 : _a2.disabled) === false;
          }) === -1;
          return createVNode(resolveComponent("el-sub-menu"), {
            "class": [ns.b("submenu"), ns.be("submenu", "groupdetails"), ns.em("item", groupButtonStyle.toLowerCase()), calcCssName(item), semanticClass("item", {
              item
            })],
            "style": semanticStyle("item", {
              item
            }),
            "index": item.id,
            "disabled": pdisabled,
            "title": showTitle(item.tooltip),
            "popper-class": [ns.b("submenu-popper"), ns.em("submenu-popper", "groupdetails"), ns.bm("submenu-popper", toolbarStyle), ns.em("submenu-popper", groupButtonStyle.toLowerCase()), ns.bm("submenu-popper", calcCssName(item)), calcCssName(item), semanticClass("popup", {
              item
            })]
          }, {
            default: () => {
              return uiactionGroupDetails.map((detail) => {
                return renderEmbedGroupDetail(item, detail);
              });
            },
            title: () => {
              return renderEmbedGroupDetail(item, item);
            }
          });
        }
        if (isSubPopover) {
          return createVNode(resolveComponent("el-popover"), {
            "popper-class": [ns2.b("popper"), ns2.b("dropdown-popper"), ns2.bm("dropdown-popper", toolbarStyle), ns2.em("dropdown-popper", groupButtonStyle.toLowerCase()), ns2.bm("dropdown-popper", calcCssName(item)), semanticClass("popup", {
              item
            })],
            "popper-style": semanticStyle("popup", {
              item
            }),
            "placement": "right-start",
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
                "size": btnSize.value,
                "class": calcCssName(item),
                "type": convertBtnType(item.buttonStyle),
                "title": showTitle(item.tooltip || item.caption),
                "disabled": c.state.buttonsState[item.id].disabled
              }, {
                default: () => [createVNode("div", {
                  "class": ns2.be("popper", "reference-btn")
                }, [createVNode("div", {
                  "class": ns2.bem("popper", "reference-btn", "content")
                }, [btnContent(item, c.state)]), createVNode("div", {
                  "class": ns2.bem("popper", "reference-btn", "chevron")
                }, [createVNode("ion-icon", {
                  "name": "chevron-forward-outline"
                }, null)])])]
              });
            },
            default: () => createVNode("div", {
              "class": ns2.be("popper", "wrapper")
            }, [uiactionGroupDetails.map((detail) => {
              const content = isRefUIActionGroup(detail) ? renderActionGroupItems(detail, false, true) : renderActionButton(detail);
              return createVNode("div", {
                "class": [ns2.be("popper", "item"), semanticClass("item", {
                  item: detail
                })],
                "style": semanticStyle("item", {
                  item: detail
                })
              }, [content]);
            })])
          });
        }
        return createVNode(resolveComponent("el-dropdown"), {
          "popper-class": [ns2.b("dropdown-popper"), ns2.bm("dropdown-popper", toolbarStyle), ns2.em("dropdown-popper", groupButtonStyle.toLowerCase()), ns2.bm("dropdown-popper", calcCssName(item)), semanticClass("popup", {
            item
          })]
        }, {
          default: () => renderActionButton(item),
          dropdown: () => {
            let _slot4;
            return enableDropdown && createVNode(resolveComponent("el-dropdown-menu"), null, _isSlot(_slot4 = uiactionGroupDetails.map((detail) => renderDropdownItem(detail))) ? _slot4 : {
              default: () => [_slot4]
            });
          }
        });
      }
      return null;
    };
    const getFirstIndex = (details, index) => {
      const firstItem = details[index];
      if (firstItem) {
        if (isRefUIActionGroup(firstItem)) {
          return index;
        }
        if (c.state.buttonsState[firstItem.id].visible) {
          return index;
        }
        return getFirstIndex(details, index + 1);
      }
      return -1;
    };
    const renderActionGroupItemx = (item, isEmbed) => {
      const {
        uiactionGroup
      } = item;
      if (uiactionGroup && uiactionGroup.uiactionGroupDetails) {
        const {
          uiactionGroupDetails
        } = uiactionGroup;
        const firstIndex = getFirstIndex(uiactionGroupDetails, 0);
        if (firstIndex !== -1) {
          const firstItem = uiactionGroupDetails[firstIndex];
          const remainders = uiactionGroupDetails.slice(firstIndex + 1).filter((_item) => !!c.state.buttonsState[_item.id].visible);
          const enableDropdown = remainders.length > 0;
          let groupButtonStyle = item.buttonStyle || "";
          if (isEmbed) {
            groupButtonStyle = firstItem.buttonStyle || "";
            return createVNode(resolveComponent("el-sub-menu"), {
              "class": [ns.b("submenu"), ns.be("submenu", "groupdetails"), ns.em("item", groupButtonStyle.toLowerCase()), calcCssName(firstItem), semanticClass("item", {
                item: firstItem
              })],
              "style": semanticStyle("item", {
                item: firstItem
              }),
              "index": firstItem.id,
              "disabled": c.state.buttonsState[firstItem.id].disabled,
              "title": showTitle(firstItem.tooltip),
              "popper-class": [ns.b("submenu-popper"), ns.be("submenu-popper", "groupdetails"), ns.bm("submenu-popper", toolbarStyle), ns.em("submenu-popper", groupButtonStyle.toLowerCase()), ns.bm("submenu-popper", calcCssName(firstItem)), calcCssName(firstItem), semanticClass("popup", {
                item: firstItem
              })]
            }, {
              default: () => {
                return remainders.map((detail) => {
                  return renderEmbedGroupDetail(item, detail);
                });
              },
              title: () => {
                return renderEmbedGroupDetail(item, firstItem);
              }
            });
          }
          return createVNode(resolveComponent("el-dropdown"), {
            "split-button": enableDropdown,
            "type": convertBtnType(groupButtonStyle),
            "popper-class": [ns2.b("dropdown-popper"), ns2.bm("dropdown-popper", toolbarStyle), ns2.em("dropdown-popper", groupButtonStyle.toLowerCase()), ns2.bm("dropdown-popper", calcCssName(item)), semanticClass("popup", {
              item
            })]
          }, {
            default: () => {
              if (isRefUIActionGroup(firstItem))
                return renderActionGroupItems(firstItem, false);
              return renderActionButton(firstItem, convertBtnType(groupButtonStyle));
            },
            dropdown: () => {
              let _slot5;
              return enableDropdown && createVNode(resolveComponent("el-dropdown-menu"), null, _isSlot(_slot5 = remainders.map((detail) => renderDropdownItem(detail))) ? _slot5 : {
                default: () => [_slot5]
              });
            }
          });
        }
      }
      return null;
    };
    const renderActionGroupItem = (item, isEmbed) => {
      const {
        uiactionGroup
      } = item;
      if (uiactionGroup && uiactionGroup.uiactionGroupDetails) {
        const {
          uiactionGroupDetails
        } = uiactionGroup;
        if (isEmbed) {
          return uiactionGroupDetails.map((detail) => {
            return renderEmbedGroupDetail(item, detail);
          });
        }
        return uiactionGroupDetails.map((detail) => {
          const itemContent = isRefUIActionGroup(detail) ? renderActionGroupItems(detail, isEmbed) : renderActionButton(detail);
          return createVNode("div", {
            "class": [ns2.e("item-deuiaction"), ns.em("item", convertBtnType(detail.buttonStyle)), semanticClass("item", {
              item: detail
            })],
            "style": semanticStyle("item", {
              item: detail
            })
          }, [itemContent]);
        });
      }
      return null;
    };
    const renderActionGroup = (item, isEmbed = false) => {
      const {
        groupExtractMode
      } = item;
      switch (groupExtractMode) {
        case "ITEMS":
          return renderActionGroupItems(item, isEmbed);
        case "ITEMX":
          return renderActionGroupItemx(item, isEmbed);
        case "ITEM":
        default:
          return renderActionGroupItem(item, isEmbed);
      }
    };
    const renderSubmenu = (item) => {
      const detoolbarItems = item.detoolbarItems || [];
      const curVisible = c.state.buttonsState[item.id].visible;
      const curDisabled = c.state.buttonsState[item.id].disabled;
      if (!curVisible) {
        return null;
      }
      const ploading = detoolbarItems.findIndex((item2) => {
        var _a2;
        return (_a2 = c.state.buttonsState[item2.id]) == null ? void 0 : _a2.loading;
      }) !== -1;
      const pvisible = detoolbarItems.findIndex((item2) => {
        var _a2;
        return ((_a2 = c.state.buttonsState[item2.id]) == null ? void 0 : _a2.visible) === true;
      }) !== -1;
      const pdisabled = curDisabled || detoolbarItems.findIndex((item2) => {
        var _a2;
        return ((_a2 = c.state.buttonsState[item2.id]) == null ? void 0 : _a2.disabled) === false;
      }) === -1;
      if (item.uiactionGroup && item.uiactionGroup.uiactionGroupDetails && item.uiactionGroup.uiactionGroupDetails.length > 0) {
        return renderActionGroup(item, true);
      }
      if (!pvisible) {
        return null;
      }
      const groupButtonStyle = item.buttonStyle || "";
      return createVNode(resolveComponent("el-sub-menu"), {
        "class": [ns.b("submenu"), ns.em("item", groupButtonStyle.toLowerCase()), calcCssName(item), semanticClass("group", {
          item
        })],
        "style": semanticStyle("group", {
          item
        }),
        "index": item.id,
        "disabled": pdisabled,
        "title": showTitle(item.tooltip),
        "popper-class": [ns.b("submenu-popper"), ns.bm("submenu-popper", toolbarStyle), ns.em("submenu-popper", groupButtonStyle.toLowerCase()), ns.bm("submenu-popper", calcCssName(item)), calcCssName(item), semanticClass("popup", {
          item
        })]
      }, {
        default: () => {
          return detoolbarItems.map((item2) => {
            var _a2, _b;
            const actionId = item2.uiactionId;
            const visible = (_a2 = c.state.buttonsState[item2.id]) == null ? void 0 : _a2.visible;
            const provider = c.itemProviders[item2.id];
            if (!visible) {
              return null;
            }
            if (provider) {
              const component = resolveComponent(provider.component);
              return h(component, {
                key: item2.id,
                class: [ns.e("item"), semanticClass("item", {
                  item: item2
                })],
                style: semanticStyle("item", {
                  item: item2
                }),
                item,
                controller: c
              });
            }
            if (item2.itemType === "SEPERATOR") {
              return;
            }
            if (item2.itemType === "RAWITEM") {
              return createVNode(resolveComponent("el-menu-item"), {
                "index": "menuitem".concat(item2.id),
                "title": showTitle(item2.tooltip),
                "class": semanticClass("rawitem", {
                  item: item2
                }),
                "style": semanticStyle("rawitem", {
                  item: item2
                })
              }, {
                default: () => [createVNode(resolveComponent("iBizRawItem"), {
                  "rawItem": item2,
                  "content": item2.rawItem.content,
                  "class": ns.b("submenu-rawitem"),
                  "onClick": (e) => handleClick(item2, e)
                }, null)]
              });
            }
            if (item2.itemType === "DEUIACTION") {
              let _slot6;
              const buttonType = (_b = item2.buttonStyle) == null ? void 0 : _b.toLowerCase();
              if (actionId === "exportexcel" || actionId === "gridview_exportaction") {
                return createVNode(resolveComponent("i-biz-export-excel"), {
                  "class": [ns.e("menu-exportexcel"), ns.em("item", buttonType), calcCssName(item2), semanticClass("item", {
                    item: item2
                  })],
                  "style": semanticStyle("item", {
                    item: item2
                  }),
                  "mode": "menu",
                  "item": item2,
                  "btnContent": (barItem) => btnContent(barItem, c.state),
                  "size": btnSize.value,
                  "controller": c,
                  "onExportExcel": (e, data) => {
                    handleClick(item2, e, data);
                  }
                }, null);
              }
              return createVNode(resolveComponent("el-menu-item"), {
                "class": [ns.is("loading", c.state.buttonsState[item2.id].loading), ns.em("item", buttonType), calcCssName(item2), semanticClass("item", {
                  item: item2
                })],
                "style": semanticStyle("item", {
                  item: item2
                }),
                "index": "menuitem".concat(item2.id),
                "disabled": c.state.buttonsState[item2.id].disabled,
                "title": showTitle(item2.tooltip),
                "onClick": (e) => handleClick(item2, e)
              }, {
                default: () => [createVNode(resolveComponent("el-button"), {
                  "loading": c.state.buttonsState[item2.id].loading
                }, _isSlot(_slot6 = btnContent(item2, c.state)) ? _slot6 : {
                  default: () => [_slot6]
                })]
              });
            }
            if (item2.itemType === "ITEMS") {
              return renderSubmenu(item2);
            }
            return null;
          });
        },
        title: () => {
          let _slot7;
          return createVNode(resolveComponent("el-button"), {
            "loading": ploading,
            "disabled": pdisabled,
            "type": convertBtnType(groupButtonStyle)
          }, _isSlot(_slot7 = btnContent(item, c.state)) ? _slot7 : {
            default: () => [_slot7]
          });
        }
      });
    };
    const renderToolbarItem = (item) => {
      var _a2, _b;
      const itemId = item.id;
      const visible = (_a2 = c.state.buttonsState[itemId]) == null ? void 0 : _a2.visible;
      const provider = c.itemProviders[itemId];
      if (!visible) {
        return null;
      }
      if (provider) {
        const component = resolveComponent(provider.component);
        return h(component, {
          key: itemId,
          class: [ns.e("item"), semanticClass("item", {
            item
          })],
          style: semanticStyle("item", {
            item
          }),
          item,
          controller: c
        });
      }
      if (item.itemType === "SEPERATOR") {
        if (c.state.hideSeparator.includes(itemId)) {
          return null;
        }
        return createVNode("div", {
          "key": itemId,
          "class": [ns.e("item"), ns.e("item-separator"), semanticClass("divider", {
            item
          })],
          "style": semanticStyle("divider", {
            item
          })
        }, [createTextVNode("|")]);
      }
      if (item.itemType === "RAWITEM") {
        return createVNode("div", {
          "key": itemId,
          "class": [ns.e("item"), ns.e("item-rawitem"), semanticClass("rawitem", {
            item
          })],
          "style": semanticStyle("rawitem", {
            item
          })
        }, [createVNode(resolveComponent("iBizRawItem"), {
          "class": [calcCssName(item)],
          "rawItem": item,
          "content": item.rawItem.content,
          "onClick": (e) => handleClick(item, e)
        }, null)]);
      }
      if (item.itemType === "DEUIACTION") {
        let _slot8;
        const actionId = item.uiactionId;
        const buttonStyle = item.buttonStyle;
        if (actionId === "exportexcel" || actionId === "gridview_exportaction") {
          return createVNode(resolveComponent("i-biz-export-excel"), {
            "class": [ns.e("item"), ns.e("item-deuiaction"), ns.em("item", buttonStyle == null ? void 0 : buttonStyle.toLowerCase()), calcCssName(item), semanticClass("item", {
              item
            })],
            "style": semanticStyle("item", {
              item
            }),
            "item": item,
            "btnContent": (barItem) => btnContent(barItem, c.state),
            "size": btnSize.value,
            "controller": c,
            "onExportExcel": (e, data) => {
              handleClick(item, e, data);
            }
          }, null);
        }
        if (actionId === "shortcut") {
          return createVNode(resolveComponent("i-biz-short-cut-button"), {
            "key": itemId,
            "class": [ns.e("item"), ns.e("item-deuiaction"), ns.em("item", buttonStyle == null ? void 0 : buttonStyle.toLowerCase()), calcCssName(item), semanticClass("item", {
              item
            })],
            "style": semanticStyle("item", {
              item
            }),
            "item": item,
            "controller": c,
            "size": btnSize.value,
            "onClick": (e) => handleClick(item, e)
          }, null);
        }
        return createVNode("div", {
          "key": itemId,
          "class": [ns.e("item"), ns.e("item-deuiaction"), ns.em("item", buttonStyle == null ? void 0 : buttonStyle.toLowerCase()), ibiz.config.common.enhancedUI === false ? calcCssName(item) : "", ns.is("loading", c.state.buttonsState[itemId].loading), semanticClass("item", {
            item
          })],
          "style": semanticStyle("item", {
            item
          })
        }, [createVNode(resolveComponent("el-button"), {
          "class": [ibiz.config.common.enhancedUI === true ? calcCssName(item) : ""],
          "size": btnSize.value,
          "title": showTitle(item.tooltip),
          "type": convertBtnType(buttonStyle),
          "loading": c.state.buttonsState[itemId].loading,
          "disabled": c.state.buttonsState[itemId].disabled,
          "onClick": (e) => handleClick(item, e)
        }, _isSlot(_slot8 = btnContent(item, c.state)) ? _slot8 : {
          default: () => [_slot8]
        })]);
      }
      if (item.itemType === "ITEMS") {
        let _slot9;
        const groupItem = item;
        const groupButtonStyle = groupItem.buttonStyle || "";
        if (groupItem.groupExtractMode && groupItem.uiactionGroup) {
          const extractName = "extract-mode-".concat(((_b = groupItem.groupExtractMode) == null ? void 0 : _b.toLowerCase()) || "item");
          return createVNode("div", {
            "class": [ns2.b(), ns2.e(extractName), ns2.em("item", groupButtonStyle.toLowerCase()), calcCssName(item), semanticClass("actions", {
              item
            })],
            "style": semanticStyle("actions", {
              item
            })
          }, [renderActionGroup(item)]);
        }
        return createVNode(resolveComponent("el-menu"), {
          "mode": "horizontal",
          "class": [ns.e("menu"), ns.em("menu", groupButtonStyle.toLowerCase()), calcCssName(item), semanticClass("group", {
            item
          })],
          "style": semanticStyle("group", {
            item
          }),
          "ellipsis": false,
          "menu-trigger": "hover"
        }, _isSlot(_slot9 = renderSubmenu(item)) ? _slot9 : {
          default: () => [_slot9]
        });
      }
      return null;
    };
    return {
      c,
      btnSize,
      ns,
      toolbarStyle,
      handleClick,
      renderExtraButtons,
      renderToolbarItem,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b, _c;
    const {
      state
    } = this.c;
    let content = null;
    if (state.isCreated) {
      content = [
        // 绘制最前方的额外按钮
        ((_a = state.extraButtons.before) == null ? void 0 : _a.length) > 0 && this.renderExtraButtons(state.extraButtons.before),
        (_b = this.modelData.detoolbarItems) == null ? void 0 : _b.map((item, index) => {
          var _a2;
          const toolbarItemNode = this.renderToolbarItem(item);
          if ((_a2 = state.extraButtons[index]) == null ? void 0 : _a2.length) {
            return [toolbarItemNode, this.renderExtraButtons(state.extraButtons[index])];
          }
          return toolbarItemNode;
        }),
        // 绘制最后方的额外按钮
        ((_c = state.extraButtons.after) == null ? void 0 : _c.length) > 0 && this.renderExtraButtons(state.extraButtons.after)
      ];
    }
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.m(state.viewMode.toLowerCase()), this.ns.m(this.toolbarStyle), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

export { ToolbarControl };
