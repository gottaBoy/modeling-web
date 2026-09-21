'use strict';

var vue = require('vue');
var sortable_esm = require('../../node_modules/.pnpm/sortablejs@1.15.6/node_modules/sortablejs/modular/sortable.esm.cjs');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var ContextMenu = require('@imengyu/vue3-context-menu');
var navTabs_controller = require('./nav-tabs.controller.cjs');
var icon = require('./icon.cjs');
require('./nav-tabs.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const NavTabs = /* @__PURE__ */ vue.defineComponent({
  name: "IBizNavTabs",
  props: {
    /**
     * @description 分页导航模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 分页导航控制器
     */
    controller: {
      type: navTabs_controller.NavTabsController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("nav-tabs");
    const c = props.controller;
    const {
      state
    } = props.controller;
    const tabsRef = vue.ref(null);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    let sortable;
    const actions = [{
      type: "ACTION",
      value: "current",
      icon: icon.CloseCurrent,
      label: ibiz.i18n.t("panelComponent.navTabs.closeCurrent")
    }, {
      type: "SEPERATOR"
    }, {
      type: "ACTION",
      value: "left",
      icon: icon.CloseLeft,
      label: ibiz.i18n.t("panelComponent.navTabs.closeLeft")
    }, {
      type: "ACTION",
      value: "right",
      icon: icon.CloseRight,
      label: ibiz.i18n.t("panelComponent.navTabs.closeRight")
    }, {
      type: "SEPERATOR"
    }, {
      type: "ACTION",
      value: "other",
      icon: icon.CloseOther,
      label: ibiz.i18n.t("panelComponent.navTabs.closeOther")
    }, {
      type: "ACTION",
      value: "all",
      icon: icon.CloseAll,
      label: ibiz.i18n.t("panelComponent.navTabs.closeAll")
    }];
    vue.watch(() => c.state.currentKey, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const findItem = c.findTabItem(newVal);
        if (findItem) {
          state.activeTab = newVal;
        }
      }
    });
    const changePage = (pane) => {
      if (state.currentKey !== pane.paneName) {
        c.onTabClick(pane.paneName);
      }
    };
    const onTabRemove = (key) => {
      c.onTabRemove("current", key);
    };
    const onContextmenu = (evt) => {
      var _a;
      let target = evt.target;
      while (target && !((_a = target.classList) == null ? void 0 : _a.contains("el-tabs__item"))) {
        target = target.parentElement;
        if (!target)
          return;
      }
      const length = c.state.tabItems.length;
      const key = target.id.replace("tab-", "");
      const index = c.state.tabItems.findIndex((tab) => tab.key === key);
      if (index === -1)
        return;
      evt.stopPropagation();
      evt.preventDefault();
      const menus = [];
      actions.forEach((action) => {
        if (action.type === "SEPERATOR") {
          menus.push({
            divided: "self"
          });
        }
        if (action.type === "ACTION") {
          const {
            value,
            label
          } = action;
          const disabled = length === 1 && value && ["left", "right", "other"].includes(value) || index === 0 && value === "left" || index === length - 1 && value === "right";
          menus.push({
            label,
            disabled,
            clickClose: true,
            icon: action.icon,
            customClass: ns.em("context-menu", "item"),
            onClick: () => c.onTabRemove(value, key)
          });
        }
      });
      if (!menus.length)
        return;
      const theme = ibiz.util.theme.getTheme();
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        items: menus,
        theme: theme.includes("dark") ? "default dark" : "default",
        customClass: ns.e("context-menu")
      });
    };
    const initSortable = () => {
      var _a, _b;
      const container = (_b = (_a = tabsRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.querySelector(".el-tabs__header .el-tabs__nav");
      if (container)
        sortable = sortable_esm.default.create(container, {
          animation: 150,
          // 动画时长
          ghostClass: "sortable-ghost",
          // 拖拽时的样式类
          onEnd: (event) => {
            const {
              oldIndex,
              newIndex
            } = event;
            if (oldIndex !== void 0 && newIndex !== void 0 && oldIndex !== newIndex)
              c.onTabOrder(oldIndex, newIndex);
          }
        });
    };
    vue.onMounted(() => {
      initSortable();
    });
    vue.onUnmounted(() => {
      sortable == null ? void 0 : sortable.destroy();
    });
    return {
      ns,
      actions,
      tabsRef,
      changePage,
      onTabRemove,
      onContextmenu,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let _slot;
    const {
      state
    } = this.controller;
    if (ibiz.config.view.disableHomeTabs)
      return;
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root"), ...this.controller.containerClass],
      "style": this.semanticStyle("root")
    }, [vue.createVNode(vue.resolveComponent("el-tabs"), {
      "closable": true,
      "type": "card",
      "ref": "tabsRef",
      "modelValue": state.activeTab,
      "onUpdate:modelValue": ($event) => state.activeTab = $event,
      "onTabClick": this.changePage,
      "onTabRemove": this.onTabRemove,
      "onContextmenu": this.onContextmenu
    }, _isSlot(_slot = state.tabItems.map((msg) => {
      const label = msg.dataInfo ? "".concat(msg.caption, " - ").concat(msg.dataInfo) : msg.caption;
      return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
        "key": msg.key,
        "label": label,
        "name": msg.key
      }, {
        label: () => {
          return vue.createVNode("div", {
            "class": [this.ns.e("item"), this.semanticClass("item", {
              item: msg
            })],
            "style": this.semanticStyle("item", {
              item: msg
            })
          }, [vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "icon": msg.sysImage,
            "class": [this.ns.em("item", "icon"), this.semanticClass("item.icon", {
              item: msg
            })],
            "style": this.semanticStyle("item.icon", {
              item: msg
            })
          }, null), vue.createVNode("div", {
            "title": core.showTitle(label),
            "class": [this.ns.em("item", "caption"), this.semanticClass("item.caption", {
              item: msg
            })],
            "style": this.semanticStyle("item.caption", {
              item: msg
            })
          }, [vue.createVNode("span", {
            "class": [this.ns.em("item", "captioninfo"), this.semanticClass("item.captioninfo", {
              item: msg
            })],
            "style": this.semanticStyle("item.captioninfo", {
              item: msg
            })
          }, [msg.caption]), msg.dataInfo && vue.createVNode("span", {
            "class": [this.ns.em("item", "captiondivider"), this.semanticClass("item.captiondivider", {
              item: msg
            })],
            "style": this.semanticStyle("item.captiondivider", {
              item: msg
            })
          }, [vue.createTextVNode("\xA0-\xA0")]), msg.dataInfo && vue.createVNode("span", {
            "class": [this.ns.em("item", "datainfo"), this.semanticClass("item.datainfo", {
              item: msg
            })],
            "style": this.semanticStyle("item.datainfo", {
              item: msg
            })
          }, [msg.dataInfo])])]);
        }
      });
    })) ? _slot : {
      default: () => [_slot]
    })]);
  }
});

exports.NavTabs = NavTabs;
