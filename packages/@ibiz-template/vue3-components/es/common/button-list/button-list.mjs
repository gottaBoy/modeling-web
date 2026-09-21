import { isVNode, defineComponent, ref, computed, nextTick, onActivated, onDeactivated, onMounted, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { debounce } from 'lodash-es';
import './button-list.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizButtonList = /* @__PURE__ */ defineComponent({
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
    }
  },
  emits: {
    click: (_e, _actionId) => true
  },
  setup(props, {
    emit
  }) {
    const ns = useNamespace("button-list");
    const dropdown = ref();
    const componentRef = ref();
    const {
      uiactionGroup,
      actionGroupExtractMode
    } = props.model;
    const sliceIndex = ref(-1);
    const isActivated = ref(true);
    const visible = ref(false);
    const firstIndex = computed(() => {
      var _a;
      const index = (_a = uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) == null ? void 0 : _a.findIndex((item) => props.buttonsState[item.id].visible);
      return index === void 0 ? -1 : index;
    });
    const buttonStyle = computed(() => {
      const {
        itemStyle,
        detailStyle
      } = props.model;
      return itemStyle || detailStyle || "DEFAULT";
    });
    const trigger = computed(() => {
      return actionGroupExtractMode === "ITEMX" && buttonStyle.value === "STYLE2" ? "hover" : "click";
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
      nextTick(() => {
        sliceIndex.value = calcSliceIndex();
      });
    };
    onActivated(() => {
      isActivated.value = true;
    });
    onDeactivated(() => {
      isActivated.value = false;
    });
    let resizeObserver;
    onMounted(() => {
      if (actionGroupExtractMode === "ITEM") {
        handleResize = debounce(handleResize, 33.34);
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
      emit("click", e, item.uiactionId);
    };
    const handleMoreClick = (e, item) => {
      var _a, _b, _c, _d;
      e.stopPropagation();
      if (trigger.value === "hover") {
        emit("click", e, item.uiactionId);
      } else if (visible.value) {
        (_b = (_a = dropdown.value) == null ? void 0 : _a.handleClose) == null ? void 0 : _b.call(_a);
      } else {
        (_d = (_c = dropdown.value) == null ? void 0 : _c.handleOpen) == null ? void 0 : _d.call(_c);
      }
    };
    const renderButton = (item, disabled = false) => {
      var _a, _b;
      if (props.buttonsState[item.id].visible) {
        return createVNode(resolveComponent("el-button"), {
          "class": [ns.e("item"), ns.em("item", "".concat((_a = item.id) == null ? void 0 : _a.toLowerCase())), "".concat(((_b = item.sysCss) == null ? void 0 : _b.cssName) || "")],
          "title": item.tooltip || item.caption,
          "disabled": props.buttonsState[item.id].disabled || disabled,
          "onClick": (event) => handleClick(event, item)
        }, {
          default: () => [createVNode("div", {
            "class": ns.e("button-content")
          }, [item.showIcon && createVNode(resolveComponent("iBizIcon"), {
            "icon": item.sysImage,
            "class": ns.em("button-content", "icon")
          }, null), item.showCaption && createVNode("span", {
            "class": ns.em("button-content", "caption")
          }, [item.caption])])]
        });
      }
      return null;
    };
    const renderDropdown = (items, iconName = "chevron-down-outline") => {
      const {
        id,
        caption,
        sysImage
      } = props.model;
      return createVNode(resolveComponent("el-dropdown"), {
        "ref": dropdown,
        "trigger": trigger.value,
        "class": [ns.e("dropdown"), ns.em("dropdown", "".concat(buttonStyle.value.toLowerCase()))],
        "popper-class": [ns.e("dropdown-popper"), ns.em("dropdown-popper", "".concat(buttonStyle.value.toLowerCase())), ns.em("dropdown-popper", "".concat(id == null ? void 0 : id.toLowerCase()))],
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
          return createVNode(resolveComponent("el-button-group"), null, {
            default: () => [actionGroupExtractMode === "ITEMX" && item && renderButton(item, props.disabled), (actionGroupExtractMode !== "ITEMX" || item) && createVNode(resolveComponent("el-button"), {
              "disabled": props.disabled,
              "class": ns.e("more-button"),
              "title": actionGroupExtractMode !== "ITEMX" ? caption || ibiz.i18n.t("app.more") : ibiz.i18n.t("app.more"),
              "onClick": (event) => handleMoreClick(event, item)
            }, {
              default: () => [createVNode("div", {
                "class": ns.e("button-content")
              }, [actionGroupExtractMode === "ITEMS" ? [createVNode(resolveComponent("iBizIcon"), {
                "class": ns.em("button-content", "icon"),
                "icon": sysImage
              }, null), caption ? createVNode("span", {
                "class": ns.em("button-content", "caption")
              }, [caption]) : null] : createVNode("ion-icon", {
                "name": iconName,
                "class": ns.em("button-content", "more")
              }, null)])]
            })]
          });
        },
        dropdown: () => {
          let _slot2;
          return createVNode(resolveComponent("el-dropdown-menu"), null, _isSlot(_slot2 = items.map((item, index) => {
            if (props.buttonsState[item.id].visible && (actionGroupExtractMode !== "ITEMX" || index !== firstIndex.value)) {
              let _slot;
              return createVNode(resolveComponent("el-dropdown-item"), null, _isSlot(_slot = renderButton(item)) ? _slot : {
                default: () => [_slot]
              });
            }
            return null;
          })) ? _slot2 : {
            default: () => [_slot2]
          });
        }
      });
    };
    const renderActions = () => {
      const groupDetails = (uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) || [];
      const items = sliceIndex.value === -1 ? groupDetails : groupDetails.slice(0, sliceIndex.value);
      const moreItems = sliceIndex.value === -1 ? [] : groupDetails.slice(sliceIndex.value);
      return createVNode("div", {
        "class": ns.e("content"),
        "ref": componentRef
      }, [items.map((item) => renderButton(item)), moreItems.length ? renderDropdown(moreItems, "ellipsis-horizontal") : null]);
    };
    return {
      ns,
      buttonStyle,
      uiactionGroup,
      renderDropdown,
      renderActions
    };
  },
  render() {
    var _a, _b;
    const items = ((_a = this.uiactionGroup) == null ? void 0 : _a.uiactionGroupDetails) || [];
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.model.id), this.ns.m(this.buttonStyle.toLowerCase()), this.ns.m((_b = this.model.actionGroupExtractMode) == null ? void 0 : _b.toLowerCase())],
      "style": this.model.cssStyle
    }, [this.model.actionGroupExtractMode === "ITEM" ? this.renderActions() : this.renderDropdown(items)]);
  }
});

export { IBizButtonList };
