'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('./action-toolbar.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizActionToolbar = /* @__PURE__ */ vue.defineComponent({
  name: "IBizActionToolbar",
  props: {
    actionDetails: {
      type: Array,
      required: true
    },
    actionsState: {
      type: Object,
      required: true
    },
    caption: String,
    mode: {
      type: String,
      default: "buttons"
    },
    // 分组的行为级别
    groupLevelKeys: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [50]
    },
    zIndex: {
      type: Number,
      required: true
    },
    popperClass: String,
    // 行为回调，和action-click事件互斥，二者只有一个生效，actionCallBack优先级大于行为回调
    // 二者区别在于：行为回调为同步执行（主要解决pop打开视图位置异常），action-click为异步执行（不关心执行是否完成）
    actionCallBack: {
      type: Function
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    // 是否将 popover 的下拉列表插入至 body 元素，用于按钮模式下的分组显示
    teleported: {
      type: Boolean,
      default: true
    },
    // popover 出现位置，用于按钮模式下的分组显示
    placement: {
      type: String
    },
    // 是否不换行，用于按钮模式
    nowrap: {
      type: Boolean
    }
  },
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("action-toolbar");
    const dropdownRef = vue.ref();
    const groupButtonRef = vue.ref();
    const {
      popoverVisible,
      setPopoverVisible
    } = vue3Util.usePopoverVisible(groupButtonRef, (ele) => {
      return ele.ref;
    });
    (_a = props.actionDetails) == null ? void 0 : _a.forEach((detail) => {
      if (detail.capLanguageRes && detail.capLanguageRes.lanResTag) {
        detail.caption = ibiz.i18n.t(detail.capLanguageRes.lanResTag, detail.caption);
      }
      if (detail.tooltipLanguageRes && detail.tooltipLanguageRes.lanResTag) {
        detail.tooltip = ibiz.i18n.t(detail.tooltipLanguageRes.lanResTag, detail.tooltip);
      }
    });
    const handleClick = async (detail, e) => {
      e.stopPropagation();
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
    const expandDetails = vue.ref([]);
    const groupDetails = vue.ref([]);
    if (props.actionDetails) {
      props.actionDetails.forEach((detail) => {
        if (props.groupLevelKeys.findIndex((item) => item === detail.actionLevel) !== -1) {
          groupDetails.value.push(detail);
        } else {
          expandDetails.value.push(detail);
        }
      });
    }
    const calcActionItemClass = (item) => {
      var _a2;
      const {
        actionLevel
      } = item;
      return [ns.e("item"), (_a2 = item.sysCss) == null ? void 0 : _a2.codeName, ns.em("item", "level-".concat(actionLevel))];
    };
    const popoverIndex = props.zIndex;
    const renderItemContent = (detail) => {
      var _a2, _b;
      const caption = ((_a2 = detail.refUIActionGroup) == null ? void 0 : _a2.name) || ((_b = detail.refUIActionGroup) == null ? void 0 : _b.id) || detail.caption;
      return [vue.createVNode("div", {
        "class": [ns.em("item", "icon"), ns.is("has-caption", detail.showCaption && !!detail.caption), ns.is("has-icon", detail.showIcon && !!detail.sysImage)]
      }, [detail.showIcon && detail.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": detail.sysImage
      }, null)]), vue.createVNode("div", {
        "class": [ns.em("item", "label"), ns.is("has-caption", detail.showCaption && !!detail.caption), ns.is("has-icon", detail.showIcon && !!detail.sysImage)]
      }, [caption])];
    };
    return {
      ns,
      dropdownRef,
      popoverIndex,
      groupDetails,
      expandDetails,
      groupButtonRef,
      popoverVisible,
      handleClick,
      renderItemContent,
      calcActionItemClass
    };
  },
  render() {
    var _a;
    const details = this.actionDetails || [];
    const renderDivider = (isExpand) => {
      const ishorizontal = isExpand && this.direction === "horizontal";
      return vue.createVNode(vue.resolveComponent("el-divider"), {
        "class": this.ns.e("separator"),
        "border-style": "double",
        "direction": ishorizontal ? "vertical" : "horizontal"
      }, null);
    };
    const renderActionGroup = (detail, isExpand = true) => {
      var _a2;
      const actionGroup = detail.refUIActionGroup;
      if (!((_a2 = actionGroup == null ? void 0 : actionGroup.uiactionGroupDetails) == null ? void 0 : _a2.length))
        return null;
      const pvisible = actionGroup.uiactionGroupDetails.some((item) => {
        return this.actionsState[item.id].visible;
      });
      if (!pvisible)
        return null;
      const ishorizontal = isExpand && this.direction === "horizontal";
      return [detail.addSeparator && renderDivider(isExpand), vue.createVNode(vue.resolveComponent("el-popover"), {
        "trigger": "click",
        "teleported": ishorizontal,
        "popper-class": this.ns.e("popover"),
        "placement": ishorizontal ? "bottom" : "right-start",
        "popper-options": {
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 4]
            }
          }]
        },
        "popper-style": "z-index:".concat(this.popoverIndex + 1)
      }, {
        reference: () => {
          return vue.createVNode(vue.resolveComponent("el-button"), {
            "text": true,
            "size": "small",
            "class": [...this.calcActionItemClass(detail), this.ns.e("group-item")]
          }, {
            default: () => [vue.createVNode("div", {
              "class": this.ns.em("group-item", "content")
            }, [vue.createVNode("div", {
              "class": this.ns.em("group-item", "caption")
            }, [this.renderItemContent(detail)]), vue.createVNode("ion-icon", {
              "class": this.ns.em("group-item", "icon"),
              "name": ishorizontal ? "chevron-down-outline" : "chevron-forward-outline"
            }, null)])]
          });
        },
        default: () => {
          return renderActions(actionGroup.uiactionGroupDetails || [], false);
        }
      })];
    };
    const renderActions = (items, isExpand = true) => {
      return items.map((detail) => {
        var _a2;
        if (detail.detailType === "DEUIACTIONGROUP" && detail.refUIActionGroup)
          return renderActionGroup(detail, isExpand);
        const title = isExpand && this.nowrap === true ? detail.tooltip || detail.caption : detail.tooltip;
        if ((_a2 = this.actionsState[detail.id]) == null ? void 0 : _a2.visible) {
          let _slot;
          return [detail.addSeparator && renderDivider(isExpand), vue.createVNode(vue.resolveComponent("el-button"), {
            "text": true,
            "size": "small",
            "onClick": (e) => this.handleClick(detail, e),
            "title": core.showTitle(title),
            "disabled": this.actionsState[detail.id].disabled,
            "class": this.calcActionItemClass(detail)
          }, _isSlot(_slot = this.renderItemContent(detail)) ? _slot : {
            default: () => [_slot]
          })];
        }
        return null;
      });
    };
    const renderGroup = () => {
      let _slot2;
      if (this.groupDetails.length === 0)
        return null;
      const pvisible = this.groupDetails.findIndex((item) => {
        return this.actionsState[item.id].visible === true;
      }) !== -1;
      if (!pvisible)
        return null;
      const pdisabled = this.groupDetails.findIndex((item) => {
        return this.actionsState[item.id].disabled === false;
      }) === -1;
      return [vue.createVNode(vue.resolveComponent("el-button"), {
        "size": "small",
        "text": true,
        "disabled": pdisabled,
        "ref": "groupButtonRef",
        "class": [this.ns.e("item"), this.ns.is("group", true), this.ns.is("expand", this.popoverVisible)],
        "onClick": () => {
          this.popoverVisible = !this.popoverVisible;
        }
      }, {
        icon: () => vue.createVNode("ion-icon", {
          "class": this.ns.e("icon"),
          "name": "ellipsis-vertical",
          "title": core.showTitle(ibiz.i18n.t("component.actionToolbar.more"))
        }, null)
      }), vue.createVNode(vue.resolveComponent("el-popover"), {
        "placement": this.placement || "bottom-start",
        "teleported": this.teleported,
        "virtual-ref": this.groupButtonRef,
        "visible": this.popoverVisible,
        "popper-class": this.ns.e("popover"),
        "virtual-triggering": true,
        "popper-style": "z-index:".concat(this.popoverIndex)
      }, _isSlot(_slot2 = renderActions(this.groupDetails, false)) ? _slot2 : {
        default: () => [_slot2]
      })];
    };
    if (!((_a = this.actionsState) == null ? void 0 : _a.visible))
      return;
    if (this.mode === "buttons") {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.m("buttons"), this.ns.is("nowrap", this.nowrap === true)],
        "onClick": (e) => e.stopPropagation()
      }, [renderActions(this.expandDetails), renderGroup()]);
    }
    return vue.createVNode(vue.resolveComponent("el-dropdown"), {
      "ref": "dropdownRef",
      "onCommand": (command) => this.handleClick(command, new MouseEvent("click")),
      "class": [this.ns.b(), this.ns.m("dropdown")],
      "popper-class": this.popperClass
    }, {
      default: () => vue.createVNode("span", {
        "class": this.ns.e("caption")
      }, [this.caption, vue.createVNode("ion-icon", {
        "class": this.ns.e("caption-icon"),
        "name": "ellipsis-vertical"
      }, null)]),
      dropdown: () => vue.createVNode(vue.resolveComponent("el-dropdown-menu"), null, {
        default: () => [details.length > 0 && details.map((detail) => {
          if (this.actionsState[detail.id].visible) {
            return vue.createVNode(vue.resolveComponent("el-dropdown-item"), {
              "command": detail,
              "title": core.showTitle(detail.tooltip),
              "class": this.calcActionItemClass(detail),
              "disabled": this.actionsState[detail.id].disabled
            }, {
              default: () => [detail.showIcon && detail.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
                "icon": detail.sysImage
              }, null), detail.showCaption ? detail.caption : ""]
            });
          }
          return null;
        })]
      })
    });
  }
});

exports.IBizActionToolbar = IBizActionToolbar;
