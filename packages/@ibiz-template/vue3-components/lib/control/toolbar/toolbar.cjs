'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var exportExcel = require('./export-excel/export-excel.cjs');
var shortCutButton = require('./short-cut-button/short-cut-button.cjs');
require('./toolbar.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const btnContent = (item, state) => {
  const counterNum = state && item.counterId ? state.counterData[item.counterId] : void 0;
  const image = item.sysImage;
  const result = [];
  const ns = vue3Util.useNamespace("toolbar-item");
  if (item.showIcon && image) {
    result.push(vue.createVNode("span", {
      "class": ns.b("icon")
    }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
      "icon": image
    }, null)]));
  }
  if (item.showCaption && item.caption) {
    result.push(vue.createVNode("span", {
      "class": ns.b("text")
    }, [item.caption]));
  }
  if (counterNum) {
    result.push(vue.createVNode(vue.resolveComponent("iBizBadge"), {
      "class": ns.b("counter"),
      "value": counterNum,
      "counterMode": item.counterMode
    }, null));
  }
  return result;
};
const calcCssName = (item) => {
  var _a;
  return (_a = item == null ? void 0 : item.sysCss) == null ? void 0 : _a.cssName;
};
const ToolbarControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizToolbarControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    runMode: {
      type: String,
      default: "RUNTIME"
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
    const c = vue3Util.useControlController((...args) => new runtime.ToolbarController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const ns2 = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase(), "-actions"));
    const btnSize = vue.ref("default");
    const toolbarStyle = (_a = c.model.toolbarStyle) == null ? void 0 : _a.toLowerCase();
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
    const renderExtraButtons = (extraButtons) => {
      return extraButtons.map((button) => {
        let _slot;
        return vue.createVNode("div", {
          "key": button.id,
          "class": [ns.e("item")]
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "title": core.showTitle(button.tooltip),
          "size": btnSize.value,
          "onClick": (e) => handleClick(button, e)
        }, _isSlot(_slot = btnContent(button, c.state)) ? _slot : {
          default: () => [_slot]
        })]);
      });
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
      if (!pvisible) {
        return null;
      }
      const pdisabled = curDisabled || detoolbarItems.findIndex((item2) => {
        var _a2;
        return ((_a2 = c.state.buttonsState[item2.id]) == null ? void 0 : _a2.disabled) === false;
      }) === -1;
      const groupButtonStyle = item.buttonStyle || "";
      return vue.createVNode(vue.resolveComponent("el-sub-menu"), {
        "class": [ns.b("submenu"), ns.em("item", groupButtonStyle.toLowerCase()), calcCssName(item)],
        "index": item.id,
        "disabled": pdisabled,
        "title": core.showTitle(item.tooltip),
        "popper-class": [ns.b("submenu-popper"), ns.bm("submenu-popper", toolbarStyle), ns.em("submenu-popper", groupButtonStyle.toLowerCase()), ns.bm("submenu-popper", calcCssName(item)), calcCssName(item)]
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
              const component = vue.resolveComponent(provider.component);
              return vue.h(component, {
                key: item2.id,
                class: [ns.e("item")],
                item,
                controller: c
              });
            }
            if (item2.itemType === "SEPERATOR") {
              return;
            }
            if (item2.itemType === "RAWITEM") {
              return vue.createVNode(vue.resolveComponent("el-menu-item"), {
                "index": "menuitem".concat(item2.id),
                "title": core.showTitle(item2.tooltip)
              }, {
                default: () => [vue.createVNode(vue.resolveComponent("iBizRawItem"), {
                  "rawItem": item2,
                  "content": item2.rawItem.content,
                  "class": ns.b("submenu-rawitem"),
                  "onClick": (e) => handleClick(item2, e)
                }, null)]
              });
            }
            if (item2.itemType === "DEUIACTION") {
              let _slot2;
              const buttonType = (_b = item2.buttonStyle) == null ? void 0 : _b.toLowerCase();
              if (actionId === "exportexcel" || actionId === "gridview_exportaction") {
                return vue.createVNode(exportExcel.IBizExportExcel, {
                  "class": [ns.e("menu-exportexcel"), ns.em("item", buttonType), calcCssName(item2)],
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
              return vue.createVNode(vue.resolveComponent("el-menu-item"), {
                "class": [ns.is("loading", c.state.buttonsState[item2.id].loading), ns.em("item", buttonType), calcCssName(item2)],
                "index": "menuitem".concat(item2.id),
                "disabled": c.state.buttonsState[item2.id].disabled,
                "title": core.showTitle(item2.tooltip),
                "onClick": (e) => handleClick(item2, e)
              }, {
                default: () => [vue.createVNode(vue.resolveComponent("el-button"), {
                  "loading": c.state.buttonsState[item2.id].loading
                }, _isSlot(_slot2 = btnContent(item2, c.state)) ? _slot2 : {
                  default: () => [_slot2]
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
          let _slot3;
          return vue.createVNode(vue.resolveComponent("el-button"), {
            "loading": ploading,
            "disabled": pdisabled
          }, _isSlot(_slot3 = btnContent(item, c.state)) ? _slot3 : {
            default: () => [_slot3]
          });
        }
      });
    };
    const renderActionButton = (detail) => {
      if (c.state.buttonsState[detail.id].visible) {
        let _slot4;
        return [vue.createVNode(vue.resolveComponent("el-button"), {
          "title": core.showTitle(detail.tooltip || detail.caption),
          "size": btnSize.value,
          "class": [calcCssName(detail)],
          "loading": c.state.buttonsState[detail.id].loading,
          "disabled": c.state.buttonsState[detail.id].disabled,
          "onClick": (e) => handleActionClick(detail, e)
        }, _isSlot(_slot4 = btnContent(detail, c.state)) ? _slot4 : {
          default: () => [_slot4]
        })];
      }
      return null;
    };
    const renderDropdownItem = (detail) => {
      if (c.state.buttonsState[detail.id].visible) {
        let _slot5;
        const disabled = c.state.buttonsState[detail.id].disabled;
        return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
          "class": [ns2.be("dropdown-popper", "dropdown-item"), ns2.is("disabled", disabled)]
        }, _isSlot(_slot5 = renderActionButton(detail)) ? _slot5 : {
          default: () => [_slot5]
        });
      }
      return null;
    };
    const renderActionGroupItems = (item) => {
      const {
        uiactionGroup
      } = item;
      if (uiactionGroup && uiactionGroup.uiactionGroupDetails) {
        const {
          uiactionGroupDetails
        } = uiactionGroup;
        const enableDropdown = uiactionGroupDetails.length > 0;
        const groupButtonStyle = item.buttonStyle || "";
        return vue.createVNode(vue.resolveComponent("el-dropdown"), {
          "popper-class": [ns2.b("dropdown-popper"), ns2.bm("dropdown-popper", toolbarStyle), ns2.em("dropdown-popper", groupButtonStyle.toLowerCase()), ns2.bm("dropdown-popper", calcCssName(item))]
        }, {
          default: () => renderActionButton(item),
          dropdown: () => {
            let _slot6;
            return enableDropdown && vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, _isSlot(_slot6 = uiactionGroupDetails.map((detail) => renderDropdownItem(detail))) ? _slot6 : {
              default: () => [_slot6]
            });
          }
        });
      }
      return null;
    };
    const getFirstIndex = (details, index) => {
      const firstItem = details.slice(index, 1);
      if (firstItem[0]) {
        if (c.state.buttonsState[firstItem[0].id].visible) {
          return index;
        }
        return getFirstIndex(details, index + 1);
      }
      return -1;
    };
    const renderActionGroupItemx = (item) => {
      const {
        uiactionGroup
      } = item;
      if (uiactionGroup && uiactionGroup.uiactionGroupDetails) {
        const {
          uiactionGroupDetails
        } = uiactionGroup;
        const firstIndex = getFirstIndex(uiactionGroupDetails, 0);
        if (firstIndex !== -1) {
          const firstItem = uiactionGroupDetails.slice(firstIndex, 1);
          const remainders = uiactionGroupDetails.slice(firstIndex + 1);
          const enableDropdown = remainders.length > 0;
          const groupButtonStyle = item.buttonStyle || "";
          return vue.createVNode(vue.resolveComponent("el-dropdown"), {
            "split-button": enableDropdown,
            "popper-class": [ns2.b("dropdown-popper"), ns2.bm("dropdown-popper", toolbarStyle), ns2.em("dropdown-popper", groupButtonStyle.toLowerCase()), ns2.bm("dropdown-popper", calcCssName(item))]
          }, {
            default: () => renderActionButton(firstItem[0]),
            dropdown: () => {
              let _slot7;
              return enableDropdown && vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, _isSlot(_slot7 = remainders.map((detail) => renderDropdownItem(detail))) ? _slot7 : {
                default: () => [_slot7]
              });
            }
          });
        }
      }
      return null;
    };
    const renderActionGroupItem = (item) => {
      const {
        uiactionGroup
      } = item;
      if (uiactionGroup && uiactionGroup.uiactionGroupDetails) {
        const {
          uiactionGroupDetails
        } = uiactionGroup;
        return uiactionGroupDetails.map((detail) => vue.createVNode("div", {
          "class": ns2.e("item-deuiaction")
        }, [renderActionButton(detail)]));
      }
      return null;
    };
    const renderActionGroup = (item) => {
      const {
        groupExtractMode
      } = item;
      switch (groupExtractMode) {
        case "ITEMS":
          return renderActionGroupItems(item);
        case "ITEMX":
          return renderActionGroupItemx(item);
        case "ITEM":
        default:
          return renderActionGroupItem(item);
      }
    };
    const renderToolbarItem = (item) => {
      var _a2, _b, _c;
      const itemId = item.id;
      const visible = (_a2 = c.state.buttonsState[itemId]) == null ? void 0 : _a2.visible;
      const provider = c.itemProviders[itemId];
      if (!visible) {
        return null;
      }
      if (provider) {
        const component = vue.resolveComponent(provider.component);
        return vue.h(component, {
          key: itemId,
          class: [ns.e("item")],
          item,
          controller: c
        });
      }
      if (item.itemType === "SEPERATOR") {
        if (c.state.hideSeparator.includes(itemId)) {
          return null;
        }
        return vue.createVNode("div", {
          "key": itemId,
          "class": [ns.e("item"), ns.e("item-separator")]
        }, [vue.createTextVNode("|")]);
      }
      if (item.itemType === "RAWITEM") {
        return vue.createVNode("div", {
          "key": itemId,
          "class": [ns.e("item"), ns.e("item-rawitem")]
        }, [vue.createVNode(vue.resolveComponent("iBizRawItem"), {
          "rawItem": item,
          "content": item.rawItem.content,
          "onClick": (e) => handleClick(item, e)
        }, null)]);
      }
      if (item.itemType === "DEUIACTION") {
        let _slot8;
        const actionId = item.uiactionId;
        const buttonType = (_b = item.buttonStyle) == null ? void 0 : _b.toLowerCase();
        if (actionId === "exportexcel" || actionId === "gridview_exportaction") {
          return vue.createVNode(exportExcel.IBizExportExcel, {
            "class": [ns.e("item"), ns.e("item-deuiaction"), ns.em("item", buttonType), calcCssName(item)],
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
          return vue.createVNode(shortCutButton.IBizShortCutButton, {
            "key": itemId,
            "class": [ns.e("item"), ns.e("item-deuiaction"), ns.em("item", buttonType), calcCssName(item)],
            "item": item,
            "controller": c,
            "size": btnSize.value,
            "onClick": (e) => handleClick(item, e)
          }, null);
        }
        return vue.createVNode("div", {
          "key": itemId,
          "class": [ns.e("item"), ns.e("item-deuiaction"), ns.em("item", buttonType), calcCssName(item), ns.is("loading", c.state.buttonsState[itemId].loading)]
        }, [vue.createVNode(vue.resolveComponent("el-button"), {
          "title": core.showTitle(item.tooltip),
          "size": btnSize.value,
          "text": Object.is(buttonType, "inverse"),
          "type": buttonType,
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
          const extractName = "extract-mode-".concat(((_c = groupItem.groupExtractMode) == null ? void 0 : _c.toLowerCase()) || "item");
          return vue.createVNode("div", {
            "class": [ns2.b(), ns2.e(extractName), ns2.em("item", groupButtonStyle.toLowerCase()), calcCssName(item)]
          }, [renderActionGroup(item)]);
        }
        return vue.createVNode(vue.resolveComponent("el-menu"), {
          "mode": "horizontal",
          "class": [ns.e("menu"), ns.em("menu", groupButtonStyle.toLowerCase()), calcCssName(item)],
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
      renderToolbarItem
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": [this.ns.m(state.viewMode.toLowerCase()), this.ns.m(this.toolbarStyle)]
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

exports.ToolbarControl = ToolbarControl;
