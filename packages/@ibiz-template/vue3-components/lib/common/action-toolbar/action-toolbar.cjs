'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./action-toolbar.css');
var core = require('@ibiz-template/core');

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
    }
  },
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("action-toolbar");
    const dropdownRef = vue.ref();
    const popoverVisible = vue.ref(false);
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
        popoverVisible.value = false;
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
    const groupButtonRef = vue.ref();
    const calcActionItemClass = (item) => {
      const {
        actionLevel
      } = item;
      return [ns.e("item"), ns.is("disabled", false), ns.em("item", "level-".concat(actionLevel))];
    };
    const popoverIndex = props.zIndex;
    return {
      ns,
      dropdownRef,
      popoverIndex,
      expandDetails,
      groupDetails,
      groupButtonRef,
      popoverVisible,
      handleClick,
      calcActionItemClass
    };
  },
  render() {
    var _a;
    const details = this.actionDetails || [];
    const renderDivider = (isExpand) => {
      return vue.createVNode(vue.resolveComponent("el-divider"), {
        "class": this.ns.e("separator"),
        "border-style": "double",
        "direction": isExpand ? "vertical" : "horizontal"
      }, null);
    };
    const renderActions = (items, isExpand = true) => {
      return items.map((detail) => {
        var _a2;
        if ((_a2 = this.actionsState[detail.id]) == null ? void 0 : _a2.visible) {
          return [detail.addSeparator && renderDivider(isExpand), vue.createVNode(vue.resolveComponent("el-button"), {
            "text": true,
            "size": "small",
            "onClick": (e) => this.handleClick(detail, e),
            "title": core.showTitle(detail.tooltip),
            "disabled": this.actionsState[detail.id].disabled,
            "class": this.calcActionItemClass(detail)
          }, {
            default: () => [vue.createVNode("div", {
              "class": [this.ns.em("item", "icon"), this.ns.is("has-caption", detail.showCaption && !!detail.caption), this.ns.is("has-icon", detail.showIcon && !!detail.sysImage)]
            }, [detail.showIcon && detail.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "icon": detail.sysImage
            }, null)]), vue.createVNode("div", {
              "class": [this.ns.em("item", "label"), this.ns.is("has-caption", detail.showCaption && !!detail.caption), this.ns.is("has-icon", detail.showIcon && !!detail.sysImage)]
            }, [detail.showCaption ? detail.caption : ""])]
          })];
        }
        return null;
      });
    };
    const renderGroup = () => {
      let _slot;
      if (this.groupDetails.length === 0) {
        return null;
      }
      const pvisible = this.groupDetails.findIndex((item) => {
        return this.actionsState[item.id].visible === true;
      }) !== -1;
      if (!pvisible) {
        return null;
      }
      const pdisabled = this.groupDetails.findIndex((item) => {
        return this.actionsState[item.id].disabled === false;
      }) === -1;
      return [vue.createVNode(vue.resolveComponent("el-button"), {
        "size": "small",
        "text": true,
        "disabled": pdisabled,
        "ref": "groupButtonRef",
        "class": [this.ns.e("item"), this.ns.is("expand", this.popoverVisible)]
      }, {
        icon: () => vue.createVNode("ion-icon", {
          "class": this.ns.e("icon"),
          "name": "ellipsis-vertical",
          "title": core.showTitle(ibiz.i18n.t("component.actionToolbar.more"))
        }, null)
      }), vue.createVNode(vue.resolveComponent("el-popover"), {
        "placement": "bottom-start",
        "virtual-ref": this.groupButtonRef,
        "trigger": "click",
        "visible": this.popoverVisible,
        "onUpdate:visible": ($event) => this.popoverVisible = $event,
        "popper-class": this.ns.e("popover"),
        "virtual-triggering": true,
        "popper-style": "z-index:".concat(this.popoverIndex)
      }, _isSlot(_slot = renderActions(this.groupDetails, false)) ? _slot : {
        default: () => [_slot]
      })];
    };
    if (!((_a = this.actionsState) == null ? void 0 : _a.visible)) {
      return;
    }
    if (this.mode === "buttons") {
      return vue.createVNode("div", {
        "class": [this.ns.b(), this.ns.m("buttons")],
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
              "class": [this.ns.e("item"), this.ns.is("disabled", false)],
              "title": core.showTitle(detail.tooltip),
              "disabled": this.actionsState[detail.id].disabled,
              "command": detail
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
