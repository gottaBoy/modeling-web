'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
require('../../util/index.cjs');
require('./button-list.css');
var buttonUtil = require('../../util/button-util/button-util.cjs');

"use strict";
const IBizButtonList = /* @__PURE__ */ vue.defineComponent({
  name: "IBizButtonList",
  props: {
    model: {
      type: Object,
      required: true
    },
    buttonsState: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    semantic: {
      type: Object,
      default: () => ({
        semanticClass: () => "",
        semanticStyle: () => ""
      })
    }
  },
  emits: {
    click: (_id, _e) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("button-list");
    const {
      zIndex
    } = vue3Util.useUIStore();
    const dropdown = vue.ref();
    const componentRef = vue.ref();
    const {
      actionGroupExtractMode,
      buttonListType,
      uiactionGroup
    } = props.model;
    const sliceIndex = vue.ref(-1);
    const isActivated = vue.ref(true);
    const visible = vue.ref(false);
    const details = vue.computed(() => {
      if (buttonListType === "UIACTIONGROUP")
        return (uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) || [];
      return props.model.panelButtons || props.model.deformButtons || [];
    });
    const firstIndex = vue.computed(() => {
      const index = details.value.findIndex((item) => {
        var _a;
        return ((_a = props.buttonsState[item.id]) == null ? void 0 : _a.visible) !== false;
      });
      return index === void 0 ? -1 : index;
    });
    const buttonListStyle = vue.computed(() => {
      const {
        itemStyle,
        detailStyle
      } = props.model;
      return itemStyle || detailStyle || "DEFAULT";
    });
    const trigger = vue.computed(() => {
      return actionGroupExtractMode === "ITEMX" && buttonListStyle.value === "STYLE2" ? "hover" : "click";
    });
    const calcItemWidth = (item) => {
      const computedStyle = getComputedStyle(item);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return item.offsetWidth + marginLeft + marginRight || 0;
    };
    const calcSliceIndex = () => {
      var _a;
      if (!componentRef.value)
        return -1;
      const items = Array.from((_a = componentRef.value.children) != null ? _a : []);
      const moreItemWidth = 44;
      const computedStyle = getComputedStyle(componentRef.value);
      const paddingLeft = Number.parseInt(computedStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedStyle.paddingRight, 10);
      const totalWidth = componentRef.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let index = 0;
      items.forEach((item, _index) => {
        calcWidth += calcItemWidth(item);
        const width = _index === items.length - 1 ? totalWidth : totalWidth - moreItemWidth;
        if (calcWidth <= width) {
          index = _index + 1;
        }
      });
      return index === items.length ? -1 : index;
    };
    let handleResize = () => {
      if (!isActivated.value) {
        return;
      }
      if (sliceIndex.value === calcSliceIndex())
        return;
      sliceIndex.value = -1;
      vue.nextTick(() => {
        sliceIndex.value = calcSliceIndex();
      });
    };
    vue.onActivated(() => {
      isActivated.value = true;
    });
    vue.onDeactivated(() => {
      isActivated.value = false;
    });
    let resizeObserver;
    vue.onMounted(() => {
      if (actionGroupExtractMode === "ITEM" || buttonListType === "BUTTONS") {
        handleResize = lodashEs.debounce(handleResize, 33.34);
        if (componentRef.value && ResizeObserver) {
          resizeObserver = new ResizeObserver(() => {
            handleResize();
          });
          resizeObserver.observe(componentRef.value);
        }
      }
    });
    const handleClick = (e, item) => {
      var _a, _b;
      e.stopPropagation();
      (_b = (_a = dropdown.value) == null ? void 0 : _a.handleClose) == null ? void 0 : _b.call(_a);
      emit("click", item.id, e);
    };
    const handleMoreClick = (e, item) => {
      var _a, _b, _c, _d;
      e.stopPropagation();
      if (trigger.value === "hover") {
        emit("click", item.id, e);
      } else if (visible.value) {
        (_b = (_a = dropdown.value) == null ? void 0 : _a.handleClose) == null ? void 0 : _b.call(_a);
      } else {
        (_d = (_c = dropdown.value) == null ? void 0 : _c.handleOpen) == null ? void 0 : _d.call(_c);
      }
    };
    const renderActionGroup = (detail, isFlatten) => {
      var _a;
      const actionGroup = detail.refUIActionGroup;
      if (!((_a = actionGroup == null ? void 0 : actionGroup.uiactionGroupDetails) == null ? void 0 : _a.length))
        return null;
      const pvisible = actionGroup.uiactionGroupDetails.findIndex((item) => {
        return props.buttonsState[item.id].visible === true;
      }) !== -1;
      if (!pvisible)
        return null;
      return vue.createVNode(vue.resolveComponent("el-popover"), {
        "trigger": "click",
        "teleported": isFlatten,
        "popper-class": [ns.e("popover"), props.semantic.semanticClass("popup", {
          model: detail
        })],
        "placement": isFlatten ? "bottom" : "right-start",
        "popper-options": {
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 4]
            }
          }]
        },
        "popper-style": {
          zIndex: zIndex.zIndex,
          ...props.semantic.semanticStyle("popup", {
            model: detail
          })
        }
      }, {
        reference: () => {
          var _a2, _b;
          return vue.createVNode(vue.resolveComponent("el-button"), {
            "class": [ns.e("item"), ns.em("item", "group"), ns.em("item", "".concat((_a2 = detail.id) == null ? void 0 : _a2.toLowerCase())), "".concat(((_b = detail.sysCss) == null ? void 0 : _b.cssName) || ""), props.semantic.semanticClass("item", {
              model: detail
            })],
            "style": props.semantic.semanticStyle("item", {
              model: detail
            }),
            "type": buttonUtil.convertBtnType(detail.buttonStyle)
          }, {
            default: () => [vue.createVNode("div", {
              "class": ns.e("button-content")
            }, [detail.showIcon && vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "icon": detail.sysImage,
              "class": [ns.em("button-content", "icon"), props.semantic.semanticClass("item.icon", {
                model: detail
              })],
              "style": props.semantic.semanticStyle("item.icon", {
                model: detail
              })
            }, null), detail.showCaption && vue.createVNode("span", {
              "class": [ns.em("button-content", "caption"), props.semantic.semanticClass("item.caption", {
                model: detail
              })],
              "style": props.semantic.semanticStyle("item.caption", {
                model: detail
              })
            }, [actionGroup.name || actionGroup.id])]), vue.createVNode("ion-icon", {
              "class": [ns.em("item", "group-icon")],
              "name": isFlatten ? "chevron-down-outline" : "chevron-forward-outline"
            }, null)]
          });
        },
        default: () => {
          var _a2;
          return (_a2 = actionGroup.uiactionGroupDetails) == null ? void 0 : _a2.map((item) => renderButton(item, false));
        }
      });
    };
    const renderButton = (item, isFlatten, type) => {
      var _a, _b, _c, _d;
      if (item.detailType === "DEUIACTIONGROUP" && item.refUIActionGroup)
        return renderActionGroup(item, isFlatten);
      if ((_a = props.buttonsState[item.id]) == null ? void 0 : _a.visible)
        return vue.createVNode(vue.resolveComponent("el-button"), {
          "class": [ns.e("item"), ns.em("item", "".concat((_b = item.id) == null ? void 0 : _b.toLowerCase())), "".concat(((_c = item.sysCss) == null ? void 0 : _c.cssName) || ""), props.semantic.semanticClass("item", {
            model: item
          })],
          "style": props.semantic.semanticStyle("item", {
            model: item
          }),
          "text": !isFlatten,
          "title": item.tooltip || item.caption,
          "type": type || buttonUtil.convertBtnType(item.buttonStyle),
          "onClick": (event) => handleClick(event, item),
          "disabled": ((_d = props.buttonsState[item.id]) == null ? void 0 : _d.disabled) || props.disabled
        }, {
          default: () => [vue.createVNode("div", {
            "class": ns.e("button-content")
          }, [item.showIcon && vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": item.sysImage,
            "class": [ns.em("button-content", "icon"), props.semantic.semanticClass("item.icon", {
              model: item
            })],
            "style": props.semantic.semanticStyle("item.icon", {
              model: item
            })
          }, null), item.showCaption && vue.createVNode("span", {
            "class": [ns.em("button-content", "caption"), props.semantic.semanticClass("item.caption", {
              model: item
            })],
            "style": props.semantic.semanticStyle("item.caption", {
              model: item
            })
          }, [item.caption])])]
        });
    };
    const renderDropdown = (items, iconName = "chevron-down-outline") => {
      const {
        id,
        caption,
        sysImage
      } = props.model;
      return vue.createVNode(vue.resolveComponent("el-dropdown"), {
        "ref": dropdown,
        "trigger": trigger.value,
        "disabled": props.disabled,
        "class": [ns.e("dropdown"), ns.em("dropdown", "".concat(buttonListStyle.value.toLowerCase()))],
        "popper-class": [ns.e("dropdown-popper"), ns.em("dropdown-popper", "".concat(buttonListStyle.value.toLowerCase())), ns.em("dropdown-popper", "".concat(id == null ? void 0 : id.toLowerCase()))],
        "popper-options": {
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 4]
            }
          }]
        },
        "onVisibleChange": (show) => {
          visible.value = show;
        }
      }, {
        default: () => {
          const item = items[firstIndex.value];
          return vue.createVNode(vue.resolveComponent("el-button-group"), null, {
            default: () => [actionGroupExtractMode === "ITEMX" && item && renderButton(item, true, buttonUtil.convertBtnType(buttonListStyle.value)), (actionGroupExtractMode !== "ITEMX" || item) && vue.createVNode(vue.resolveComponent("el-button"), {
              "disabled": props.disabled,
              "class": [ns.e("more-button"), props.semantic.semanticClass("item", {
                model: item
              })],
              "style": props.semantic.semanticStyle("item", {
                model: item
              }),
              "title": actionGroupExtractMode !== "ITEMX" ? caption || ibiz.i18n.t("app.more") : ibiz.i18n.t("app.more"),
              "type": buttonUtil.convertBtnType(buttonListStyle.value),
              "onClick": (event) => handleMoreClick(event, item)
            }, {
              default: () => [vue.createVNode("div", {
                "class": ns.e("button-content")
              }, [actionGroupExtractMode === "ITEMS" ? [vue.createVNode(vue.resolveComponent("iBizIcon"), {
                "class": [ns.em("button-content", "icon"), props.semantic.semanticClass("item.icon", {
                  model: item
                })],
                "style": props.semantic.semanticStyle("item.icon", {
                  model: item
                }),
                "icon": sysImage
              }, null), caption ? vue.createVNode("span", {
                "class": [ns.em("button-content", "caption"), props.semantic.semanticClass("item.caption", {
                  model: item
                })],
                "style": props.semantic.semanticStyle("item.caption", {
                  model: item
                })
              }, [caption]) : null] : vue.createVNode("ion-icon", {
                "name": iconName,
                "class": [ns.em("button-content", "more"), props.semantic.semanticClass("item.icon", {
                  model: item
                })],
                "style": props.semantic.semanticStyle("item.icon", {
                  model: item
                })
              }, null)])]
            })]
          });
        },
        dropdown: () => vue.createVNode("div", {
          "class": [ns.e("dropdown-popper-content"), props.semantic.semanticClass("popup", {
            model: props.model
          })],
          "style": props.semantic.semanticStyle("popup", {
            model: props.model
          })
        }, [items.map((item, index) => {
          var _a;
          if (!(((_a = props.buttonsState[item.id]) == null ? void 0 : _a.visible) === false) && (actionGroupExtractMode !== "ITEMX" || index !== firstIndex.value)) {
            return renderButton(item, false);
          }
          return null;
        })])
      });
    };
    const renderActions = () => {
      const groupDetails = details.value || [];
      const items = sliceIndex.value === -1 ? groupDetails : groupDetails.slice(0, sliceIndex.value);
      const moreItems = sliceIndex.value === -1 ? [] : groupDetails.slice(sliceIndex.value);
      return vue.createVNode("div", {
        "class": ns.e("content"),
        "ref": componentRef
      }, [items.map((item) => renderButton(item, true)), moreItems.length ? renderDropdown(moreItems, "ellipsis-horizontal") : null]);
    };
    return {
      ns,
      buttonListStyle,
      details,
      renderDropdown,
      renderActions
    };
  },
  render() {
    var _a;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.model.id), this.ns.m(this.buttonListStyle.toLowerCase()), this.ns.m((_a = this.model.actionGroupExtractMode) == null ? void 0 : _a.toLowerCase()), this.semantic.semanticClass("root")],
      "style": [this.model.cssStyle, this.semantic.semanticStyle("root")]
    }, [this.model.actionGroupExtractMode === "ITEM" || this.model.buttonListType === "BUTTONS" ? this.renderActions() : this.renderDropdown(this.details)]);
  }
});

exports.IBizButtonList = IBizButtonList;
