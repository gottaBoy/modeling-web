import { isVNode, createVNode, resolveComponent, defineComponent, ref, watch, onUnmounted, computed, onMounted, nextTick, mergeProps } from 'vue';
import { RuntimeError, showTitle, findRecursiveChild } from '@ibiz-template/core';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { AppMenuController, formatSeparator, ViewCallTag } from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';
import { MenuDesign } from './custom-menu-design/custom-menu-design.mjs';
import './app-menu.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getMenus(items) {
  return items.map((item) => {
    var _a;
    const data = {
      key: item.id,
      label: item.caption,
      image: item.sysImage,
      counterId: item.counterId,
      disabled: !item.appFuncId,
      tooltip: item.tooltip,
      itemType: item.itemType,
      sysCss: item.sysCss
    };
    if ((_a = item.appMenuItems) == null ? void 0 : _a.length) {
      data.children = getMenus(item.appMenuItems);
    }
    return data;
  });
}
function renderByProvider(itemId, c) {
  const itemModel = c.allAppMenuItems.find((item) => item.id === itemId);
  if (!itemModel) {
    throw new RuntimeError(ibiz.i18n.t("control.menu.noFoundModel", {
      menuKey: itemId
    }));
  }
  const provider = c.itemProviders[itemId];
  if (!provider.renderText) {
    throw new RuntimeError(ibiz.i18n.t("control.menu.noFoundFunction", {
      menuKey: itemId
    }));
  }
  return provider.renderText(itemModel, c);
}
function findCustomMenu(_key, items) {
  let temp;
  if (items) {
    items.some((item) => {
      if (item.key === _key) {
        temp = item;
        return true;
      }
      if (item.children && item.children.length > 0) {
        temp = findCustomMenu(_key, item.children);
        if (!temp) {
          return false;
        }
        return true;
      }
      return false;
    });
  }
  return temp;
}
function getMenuCustomVisible(_key, items, hideSeparator) {
  const tag = hideSeparator.includes(_key);
  if (tag) {
    return false;
  }
  const target = findCustomMenu(_key, items);
  if (target) {
    return target.visible;
  }
  return true;
}
function renderMenuItem(isFirst, menu, collapse, ns, c, counterData, saveConfigs, hideSeparator) {
  var _a, _b;
  if (!c.state.menuItemsState[menu.key].visible) {
    return;
  }
  if (!getMenuCustomVisible(menu.key, saveConfigs, hideSeparator)) {
    return;
  }
  if (menu.itemType === "MENUITEM") {
    let content;
    const provider = c.itemProviders[menu.key];
    if (provider && provider.renderText) {
      content = renderByProvider(menu.key, c);
    } else if (!(isFirst && collapse)) {
      content = [menu.image ? createVNode(resolveComponent("iBizIcon"), {
        "class": ns.e("icon"),
        "icon": menu.image
      }, null) : null, menu.label, counterData[menu.counterId] != null ? createVNode(resolveComponent("iBizBadge"), {
        "class": ns.e("counter"),
        "value": counterData[menu.counterId]
      }, null) : null];
    } else {
      content = [menu.image ? createVNode(resolveComponent("iBizIcon"), {
        "class": ns.e("icon"),
        "icon": menu.image
      }, null) : menu.label.slice(0, 1)];
    }
    return !(isFirst && collapse) ? createVNode(resolveComponent("el-menu-item"), {
      "class": [ns.e("item"), "".concat(((_a = menu.sysCss) == null ? void 0 : _a.cssName) || "")],
      "index": menu.key,
      "disabled": menu.disabled,
      "title": showTitle(menu.tooltip)
    }, _isSlot(content) ? content : {
      default: () => [content]
    }) : createVNode(resolveComponent("el-tooltip"), {
      "class": ns.b("tooltip"),
      "content": menu.label,
      "placement": "left",
      "theme": "light"
    }, {
      default: () => {
        var _a2;
        return [createVNode(resolveComponent("el-menu-item"), {
          "class": [ns.e("item"), "".concat(((_a2 = menu.sysCss) == null ? void 0 : _a2.cssName) || "")],
          "index": menu.key,
          "disabled": menu.disabled
        }, _isSlot(content) ? content : {
          default: () => [content]
        })];
      }
    });
  }
  if (menu.itemType === "SEPERATOR") {
    const direction = c.view.model.mainMenuAlign === "TOP" && isFirst ? "vertical" : "horizontal";
    return createVNode(resolveComponent("el-divider"), {
      "direction": direction,
      "class": ns.em("separator", direction),
      "id": menu.key
    }, null);
  }
  if (menu.itemType === "RAWITEM") {
    const menuRawItem = findRecursiveChild(c.model, menu.key, {
      compareField: "id",
      childrenFields: ["appMenuItems"]
    });
    return createVNode(resolveComponent("el-menu-item"), {
      "index": menu.key,
      "title": showTitle(menu.tooltip),
      "class": [ns.e("rawitem"), "".concat(((_b = menu.sysCss) == null ? void 0 : _b.cssName) || "")]
    }, {
      default: () => [createVNode(resolveComponent("iBizRawItem"), {
        "rawItem": menuRawItem
      }, null)]
    });
  }
}
function renderSubmenu(isFirst, subMenu, collapse, ns, c, counterData, saveConfigs, hideSeparator) {
  var _a, _b, _c, _d, _e;
  if (!c.state.menuItemsState[subMenu.key].visible) {
    return;
  }
  if (!getMenuCustomVisible(subMenu.key, saveConfigs, hideSeparator)) {
    return;
  }
  return createVNode(resolveComponent("el-sub-menu"), {
    "class": [ns.b("submenu"), "".concat(((_a = subMenu.sysCss) == null ? void 0 : _a.cssName) || "")],
    "index": subMenu.key,
    "teleported": true,
    "popper-class": [ns.b("popup-container"), ns.b("".concat(c.model.codeName.toLowerCase(), "--popper")), "".concat(((_b = c.model.sysCss) == null ? void 0 : _b.cssName) ? "".concat((_c = c.model.sysCss) == null ? void 0 : _c.cssName, "--popper") : ""), "".concat(((_d = subMenu.sysCss) == null ? void 0 : _d.cssName) ? "".concat((_e = subMenu.sysCss) == null ? void 0 : _e.cssName, "--popper") : "")]
  }, {
    default: () => subMenu.children.map((item) => {
      if (item.children) {
        return renderSubmenu(false, item, collapse, ns, c, counterData, saveConfigs, hideSeparator);
      }
      return renderMenuItem(false, item, collapse, ns, c, counterData, saveConfigs, hideSeparator);
    }),
    title: () => {
      const provider = c.itemProviders[subMenu.key];
      if (provider && provider.renderText) {
        return renderByProvider(subMenu.key, c);
      }
      if (collapse) {
        if (subMenu.image) {
          return createVNode(resolveComponent("iBizIcon"), {
            "class": ns.e("icon"),
            "icon": subMenu.image
          }, null);
        }
        return [isFirst ? subMenu.label.slice(0, 1) : subMenu.label, isFirst ? null : createVNode("ion-icon", {
          "name": "chevron-forward-outline"
        }, null)];
      }
      return [createVNode(resolveComponent("iBizIcon"), {
        "class": ns.e("icon"),
        "icon": subMenu.image
      }, null), subMenu.label, counterData[subMenu.counterId] != null ? createVNode(resolveComponent("iBizBadge"), {
        "class": ns.e("counter"),
        "value": counterData[subMenu.counterId]
      }, null) : null];
    }
  });
}
const AppMenuControl = /* @__PURE__ */ defineComponent({
  name: "IBizAppMenuControl",
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
    collapse: Boolean,
    currentPath: String
  },
  setup(props) {
    const c = useControlController((...args) => new AppMenuController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const menus = ref(getMenus(c.model.appMenuItems));
    const saveConfigs = ref([]);
    const defaultActive = ref("");
    const defaultOpens = ref([]);
    const route = useRoute();
    let counter = null;
    const counterData = ref({});
    const key = ref(createUUID());
    const menuRef = ref();
    const hasScroll = ref(false);
    const hideSeparator = ref([]);
    const calcCurMenu = () => {
      const allItems = c.getAllItems();
      const app = ibiz.hub.getApp(c.context.srfappid);
      return allItems.find((item) => {
        var _a, _b;
        if (item.itemType === "MENUITEM" && item.appFuncId) {
          const func = app.getAppFunc(item.appFuncId);
          return ((_b = (_a = func == null ? void 0 : func.appViewId) == null ? void 0 : _a.split(".")) == null ? void 0 : _b[1]) === route.params.view2;
        }
        return false;
      });
    };
    const onClick = async (id, event) => {
      const activeMenu = calcCurMenu();
      if ((activeMenu == null ? void 0 : activeMenu.id) === id) {
        return;
      }
      defaultActive.value = id;
      const menu = c.getAllItems().find((m) => m.id === id);
      if ((menu == null ? void 0 : menu.itemType) === "RAWITEM" || c.runMode === "DESIGN") {
        return;
      }
      await c.onClickMenuItem(id, event);
    };
    if (c.runMode !== "DESIGN") {
      watch(() => route.params.view2, (newVal, oldVal) => {
        if (newVal !== oldVal && ibiz.config.appMenu.enableEcho) {
          const activeMenu = calcCurMenu();
          defaultActive.value = activeMenu ? activeMenu.id : "";
        }
      });
    }
    const fn = (data) => {
      counterData.value = data;
    };
    c.evt.on("onCreated", async () => {
      saveConfigs.value = c.saveConfigs;
      const allItems = c.getAllItems();
      const defaultActiveMenuItem = allItems.find((item) => {
        return item.openDefault && !item.hidden;
      });
      if (defaultActiveMenuItem && !route.params.view2 && !route.fullPath.includes("404")) {
        defaultActive.value = defaultActiveMenuItem.id;
        onClick(defaultActive.value);
      } else if (ibiz.config.appMenu.enableEcho) {
        const activeMenu = calcCurMenu();
        defaultActive.value = activeMenu ? activeMenu.id : "";
      }
      const defaultOpensArr = allItems.filter((item) => {
        return item.expanded && !item.hidden;
      });
      if (defaultOpensArr.length > 0) {
        defaultOpensArr.forEach((item) => {
          defaultOpens.value.push(item.id);
        });
      }
      hideSeparator.value = formatSeparator("APPMENU", c.model.appMenuItems, c.state.menuItemsState, saveConfigs.value);
    });
    c.evt.on("onMounted", async () => {
      const counterRefId = c.model.appCounterRefId;
      if (counterRefId) {
        counter = c.getCounter(counterRefId);
        if (counter) {
          counter.onChange(fn);
        }
      }
    });
    onUnmounted(() => {
      counter == null ? void 0 : counter.offChange(fn);
      counter == null ? void 0 : counter.destroy();
    });
    const menuMode = computed(() => {
      const model = c.view.model.mainMenuAlign;
      switch (model) {
        case "TOP":
          return "horizontal";
        default:
          return "vertical";
      }
    });
    const calcScroll = () => {
      if (menuRef.value && menuRef.value.$el.children) {
        const elMenu = menuRef.value.$el.children[0];
        if (elMenu) {
          hasScroll.value = elMenu.scrollHeight > elMenu.clientHeight;
        }
      }
    };
    onMounted(() => {
      calcScroll();
    });
    watch(() => props.collapse, () => {
      nextTick(() => {
        calcScroll();
      });
    }, {
      immediate: true
    });
    if (c.view.model.mainMenuAlign && c.view.model.mainMenuAlign !== "LEFT" && c.view.model.mainMenuAlign !== "TOP") {
      ibiz.message.warning(ibiz.i18n.t("control.menu.noSupportAlign", {
        align: c.view.model.mainMenuAlign
      }));
    }
    const isShowCollapse = computed(() => {
      if (c.view.model.mainMenuAlign === "LEFT" || c.view.model.mainMenuAlign === void 0) {
        return true;
      }
      return false;
    });
    const enableCustomized = computed(() => {
      return c.model.enableCustomized;
    });
    const computeSeparator = () => {
      var _a;
      (_a = c.model.appMenuItems) == null ? void 0 : _a.forEach((item) => {
        c.initMenuItemState(item);
      });
      hideSeparator.value = formatSeparator("APPMENU", c.model.appMenuItems, c.state.menuItemsState, saveConfigs.value);
    };
    const configSaves = (saveConfig) => {
      saveConfigs.value = saveConfig;
      computeSeparator();
    };
    const configReset = () => {
      saveConfigs.value = [];
      computeSeparator();
    };
    const ellipsisSvg = () => {
      return createVNode("ion-icon", {
        "name": "ellipsis-horizontal"
      }, null);
    };
    return {
      menuRef,
      menus,
      c,
      key,
      onClick,
      ns,
      hasScroll,
      defaultActive,
      defaultOpens,
      menuMode,
      counterData,
      saveConfigs,
      configSaves,
      configReset,
      isShowCollapse,
      enableCustomized,
      ellipsisSvg,
      hideSeparator
    };
  },
  render() {
    var _a;
    return createVNode(resolveComponent("iBizControlBase"), {
      "ref": "menuRef",
      "class": [this.ns.b(), this.ns.b("".concat(this.c.model.codeName.toLowerCase())), this.ns.m(this.menuMode), this.ns.is("collapse", this.collapse), this.ns.is("show-collapse", this.isShowCollapse), this.ns.is("show-menu-design", this.enableCustomized), this.ns.is("scroll", this.hasScroll), "".concat(((_a = this.c.model.sysCss) == null ? void 0 : _a.cssName) || "")],
      "controller": this.c
    }, {
      default: () => {
        var _a2, _b;
        return [this.c.state.isCreated && createVNode(resolveComponent("el-menu"), mergeProps({
          "key": this.key,
          "popper-class": [this.ns.b("popper"), this.ns.b("".concat(this.c.model.codeName.toLowerCase(), "--popper")), "".concat(((_a2 = this.c.model.sysCss) == null ? void 0 : _a2.cssName) ? "".concat((_b = this.c.model.sysCss) == null ? void 0 : _b.cssName, "--popper") : "")],
          "default-active": this.defaultActive,
          "default-openeds": this.defaultOpens,
          "collapse": this.collapse,
          "collapse-transition": false,
          "onSelect": this.onClick,
          "theme": "light",
          "mode": this.menuMode,
          "ellipsis-icon": () => this.ellipsisSvg(),
          "ellipsis": this.menuMode === "horizontal"
        }, this.$attrs), {
          default: () => {
            return this.menus.map((item) => {
              var _a3;
              if (((_a3 = item.children) == null ? void 0 : _a3.length) > 0) {
                return renderSubmenu(true, item, this.collapse, this.ns, this.c, this.counterData, this.saveConfigs, this.hideSeparator);
              }
              return renderMenuItem(true, item, this.collapse, this.ns, this.c, this.counterData, this.saveConfigs, this.hideSeparator);
            });
          }
        }), this.enableCustomized && createVNode(MenuDesign, {
          "class": [this.ns.b("menu-set"), this.ns.is("collapse", this.collapse), this.ns.is("horizontal", this.c.view.model.mainMenuAlign === "TOP")],
          "controller": this.c,
          "menus": this.menus,
          "onSaved": this.configSaves,
          "onReset": this.configReset
        }, null), this.isShowCollapse && createVNode("div", {
          "class": [this.ns.b("collapse-icon"), this.ns.is("collapse", this.collapse)],
          "onClick": () => {
            this.c.view.call(ViewCallTag.TOGGLE_COLLAPSE);
          }
        }, [createVNode("ion-icon", {
          "name": "menu-collapse"
        }, null)])];
      }
    });
  }
});

export { AppMenuControl };
