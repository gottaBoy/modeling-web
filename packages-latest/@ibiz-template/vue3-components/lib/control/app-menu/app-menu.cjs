'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var runtime = require('@ibiz-template/runtime');
var vueRouter = require('vue-router');
var customMenuDesign = require('./custom-menu-design/custom-menu-design.cjs');
require('./app-menu.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
function renderAttrs(model, params) {
  const attrs = {};
  runtime.filterPresetAttrs(model.controlAttributes).forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
        ...params
      });
    }
  });
  return attrs;
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
const AppMenuControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizAppMenuControl",
  props: {
    /**
     * @description 菜单模型数据
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
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 是否折叠
     */
    collapse: {
      type: Boolean
    },
    /**
     * @description 当前路径（已弃用）
     */
    currentPath: {
      type: String
    }
  },
  setup(props) {
    const c = vue3Util.useControlController((...args) => new runtime.AppMenuController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const saveConfigs = vue.ref([]);
    const defaultActive = vue.ref("");
    const defaultOpens = vue.ref([]);
    const route = vueRouter.useRoute();
    const key = vue.ref(qxUtil.createUUID());
    const menuRef = vue.ref();
    const hasScroll = vue.ref(false);
    const hideSeparator = vue.ref([]);
    const calcCurMenu = () => {
      const allItems = c.getAllItems();
      return allItems.find((item) => {
        var _a;
        if (item.itemType !== "MENUITEM" || !item.appFuncId)
          return false;
        if (ibiz.config.appMenu.echoMode === "VIEW") {
          const app = ibiz.hub.getApp(item.appId);
          if (!app)
            return false;
          const func = app.getAppFunc(item.appFuncId);
          if (func && func.appViewId && (route == null ? void 0 : route.params.view2)) {
            return func.appViewId.split(".")[1] === route.params.view2;
          }
        } else {
          if (!route) {
            return false;
          }
          const routePath = vue3Util.route2routePath(route);
          if (routePath.pathNodes.length > 1)
            return item.id === ((_a = routePath.pathNodes[1].params) == null ? void 0 : _a.srfmenuitem);
        }
        return false;
      });
    };
    const onClick = async (id, event) => {
      const activeMenu = calcCurMenu();
      if (activeMenu && activeMenu.id === id)
        return;
      defaultActive.value = id;
      const menu = c.getAllItems().find((m) => m.id === id);
      if ((menu == null ? void 0 : menu.itemType) === "RAWITEM" || c.runMode === "DESIGN") {
        return;
      }
      await c.onClickMenuItem(id, event);
    };
    if (c.runMode !== "DESIGN") {
      vue.watch(() => route == null ? void 0 : route.params.view2, (newVal, oldVal) => {
        if (newVal !== oldVal && ibiz.config.appMenu.enableEcho) {
          const activeMenu = calcCurMenu();
          defaultActive.value = activeMenu ? activeMenu.id : "";
        }
      });
    }
    c.evt.on("onCreated", async () => {
      saveConfigs.value = c.saveConfigs;
      const defaultActiveMenuItem = c.getDefaultOpenMenuItem();
      if (defaultActiveMenuItem && !(route == null ? void 0 : route.params.view2) && !(route == null ? void 0 : route.fullPath.includes("404"))) {
        defaultActive.value = defaultActiveMenuItem.id;
        onClick(defaultActive.value);
      } else if (ibiz.config.appMenu.enableEcho) {
        const activeMenu = calcCurMenu();
        defaultActive.value = activeMenu ? activeMenu.id : "";
      }
      const defaultOpensArr = c.getAllItems().filter((item) => {
        return item.expanded && !item.hidden;
      });
      if (defaultOpensArr.length > 0) {
        defaultOpensArr.forEach((item) => {
          defaultOpens.value.push(item.id);
        });
      }
      hideSeparator.value = runtime.formatSeparator("APPMENU", c.model.appMenuItems, c.state.menuItemsState, saveConfigs.value);
    });
    const menuMode = vue.computed(() => {
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
    vue.onMounted(() => {
      calcScroll();
    });
    vue.watch(() => props.collapse, () => {
      vue.nextTick(() => {
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
    const isShowCollapse = vue.computed(() => {
      if (c.view.model.mainMenuAlign === "LEFT" || c.view.model.mainMenuAlign === void 0) {
        return true;
      }
      return false;
    });
    const computeSeparator = () => {
      var _a;
      (_a = c.model.appMenuItems) == null ? void 0 : _a.forEach((item) => {
        c.initMenuItemState(item);
      });
      hideSeparator.value = runtime.formatSeparator("APPMENU", c.model.appMenuItems, c.state.menuItemsState, saveConfigs.value);
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
      return vue.createVNode("ion-icon", {
        "name": "ellipsis-horizontal"
      }, null);
    };
    const renderGroupmenu = (menu) => {
      const {
        id = "",
        sysCss,
        caption,
        tooltip,
        sysImage,
        counterId,
        appMenuItems = []
      } = menu;
      return vue.createVNode(vue.resolveComponent("el-menu-item-group"), {
        "title": core.showTitle(tooltip),
        "class": [ns.b("groupmenu"), semanticClass("groupmenu", {
          item: menu
        }), "".concat((sysCss == null ? void 0 : sysCss.cssName) || "")],
        "style": semanticStyle("groupmenu", {
          item: menu
        })
      }, {
        title: () => {
          const provider = c.itemProviders[id];
          if (provider && provider.renderText)
            return provider.renderText(menu, c);
          return [sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "class": [ns.e("icon"), semanticClass("groupitem.icon", {
              item: menu
            })],
            "style": semanticStyle("groupitem.icon", {
              item: menu
            }),
            "icon": sysImage
          }, null), vue.createVNode("span", {
            "class": [ns.e("caption"), semanticClass("groupitem.caption", {
              item: menu
            })],
            "style": semanticStyle("groupitem.caption", {
              item: menu
            })
          }, [caption]), counterId ? vue.createVNode(vue.resolveComponent("iBizBadge"), {
            "class": [ns.e("counter"), semanticClass("subitem.counter", {
              item: menu
            })],
            "style": semanticStyle("subitem.counter", {
              item: menu
            }),
            "value": c.state.counterData[counterId]
          }, null) : null];
        },
        default: () => appMenuItems.map((item) => renderMenu(false, item))
      });
    };
    const renderSubmenu = (isFirst, menu) => {
      var _a, _b, _c;
      if (c.model.appMenuStyle === "EXTVIEW1" && !isFirst)
        return renderGroupmenu(menu);
      const {
        id = "",
        sysCss,
        tooltip,
        caption,
        sysImage,
        counterId,
        appMenuItems = []
      } = menu;
      return vue.createVNode(vue.resolveComponent("el-sub-menu"), {
        "index": id,
        "teleported": true,
        "popper-class": [ns.b("popup-container"), ns.be("popup-container", (_a = c.model.appMenuStyle) == null ? void 0 : _a.toLowerCase()), ns.b("".concat(c.model.codeName.toLowerCase(), "--popper")), "".concat(((_b = c.model.sysCss) == null ? void 0 : _b.cssName) ? "".concat((_c = c.model.sysCss) == null ? void 0 : _c.cssName, "--popper") : ""), "".concat((sysCss == null ? void 0 : sysCss.cssName) ? "".concat(sysCss == null ? void 0 : sysCss.cssName, "--popper") : ""), semanticClass("popup", {
          item: menu
        })],
        "title": core.showTitle(tooltip),
        "style": semanticStyle("submenu", {
          item: menu
        }),
        "class": [ns.b("submenu"), semanticClass("submenu", {
          item: menu
        }), "".concat((sysCss == null ? void 0 : sysCss.cssName) || "")]
      }, {
        default: () => appMenuItems.map((item) => renderMenu(false, item)),
        title: () => {
          const provider = c.itemProviders[id];
          if (provider && provider.renderText)
            return provider.renderText(menu, c);
          if (props.collapse) {
            if (sysImage)
              return vue.createVNode(vue.resolveComponent("iBizIcon"), {
                "class": [ns.e("icon"), semanticClass("subitem.icon", {
                  item: menu
                })],
                "style": semanticStyle("subitem.icon", {
                  item: menu
                }),
                "icon": sysImage
              }, null);
            return [isFirst ? caption == null ? void 0 : caption.slice(0, 1) : caption, isFirst ? null : vue.createVNode("ion-icon", {
              "name": "chevron-forward-outline"
            }, null)];
          }
          return [sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "class": [ns.e("icon"), semanticClass("subitem.icon", {
              item: menu
            })],
            "style": semanticStyle("subitem.icon", {
              item: menu
            }),
            "icon": sysImage
          }, null), vue.createVNode("span", {
            "class": [ns.e("caption"), semanticClass("subitem.caption", {
              item: menu
            })],
            "style": semanticStyle("subitem.caption", {
              item: menu
            })
          }, [caption]), counterId ? vue.createVNode(vue.resolveComponent("iBizBadge"), {
            "class": [ns.e("counter"), semanticClass("subitem.counter", {
              item: menu
            })],
            "style": semanticStyle("subitem.counter", {
              item: menu
            }),
            "value": c.state.counterData[counterId]
          }, null) : null];
        }
      });
    };
    const renderMenuItem = (isFirst, menu) => {
      const {
        id = "",
        sysCss,
        caption,
        tooltip,
        sysImage,
        counterId,
        appFuncId
      } = menu;
      let content = null;
      const provider = c.itemProviders[id];
      if (provider && provider.renderText) {
        content = provider.renderText(menu, c);
      } else if (!(isFirst && props.collapse)) {
        content = [sysImage ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": [ns.e("icon"), semanticClass("item.icon", {
            item: menu
          })],
          "style": semanticStyle("item.icon", {
            item: menu
          }),
          "icon": sysImage
        }, null) : null, vue.createVNode("span", {
          "class": [ns.e("caption"), semanticClass("item.caption", {
            item: menu
          })],
          "style": semanticStyle("item.caption", {
            item: menu
          })
        }, [caption]), counterId ? vue.createVNode(vue.resolveComponent("iBizBadge"), {
          "class": [ns.e("counter"), semanticClass("item.counter", {
            item: menu
          })],
          "style": semanticStyle("item.counter", {
            item: menu
          }),
          "value": c.state.counterData[counterId]
        }, null) : null];
      } else {
        content = [sysImage ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
          "class": [ns.e("icon"), semanticClass("item.icon", {
            item: menu
          })],
          "style": semanticStyle("item.icon", {
            item: menu
          }),
          "icon": sysImage
        }, null) : caption == null ? void 0 : caption.slice(0, 1)];
      }
      return !(isFirst && props.collapse) ? vue.createVNode(vue.resolveComponent("el-menu-item"), {
        "index": id,
        "disabled": !appFuncId,
        "title": core.showTitle(tooltip),
        "class": [ns.e("item"), semanticClass("item", {
          item: menu
        }), "".concat((sysCss == null ? void 0 : sysCss.cssName) || "")],
        "style": semanticStyle("item", {
          item: menu
        })
      }, _isSlot(content) ? content : {
        default: () => [content]
      }) : vue.createVNode(vue.resolveComponent("el-tooltip"), {
        "theme": "light",
        "placement": "left",
        "content": tooltip,
        "class": ns.b("tooltip")
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("el-menu-item"), {
          "index": id,
          "disabled": !appFuncId,
          "class": [ns.e("item"), semanticClass("item", {
            item: menu
          }), "".concat((sysCss == null ? void 0 : sysCss.cssName) || "")],
          "style": semanticStyle("item", {
            item: menu
          })
        }, _isSlot(content) ? content : {
          default: () => [content]
        })]
      });
    };
    const renderSeperator = (isFirst, menu) => {
      const direction = c.view.model.mainMenuAlign === "TOP" && isFirst ? "vertical" : "horizontal";
      return vue.createVNode(vue.resolveComponent("el-divider"), {
        "id": menu.id,
        "direction": direction,
        "class": [ns.em("separator", direction), semanticClass("divider", {
          item: menu
        })],
        "style": semanticStyle("divider", {
          item: menu
        })
      }, null);
    };
    const renderRawitem = (menu) => {
      const {
        id,
        sysCss,
        tooltip
      } = menu;
      return vue.createVNode(vue.resolveComponent("el-menu-item"), {
        "index": id,
        "title": core.showTitle(tooltip),
        "class": [ns.e("rawitem"), semanticClass("rawitem", {
          item: menu
        }), "".concat((sysCss == null ? void 0 : sysCss.cssName) || "")],
        "style": semanticStyle("rawitem", {
          item: menu
        })
      }, {
        default: () => [vue.createVNode(vue.resolveComponent("iBizRawItem"), {
          "rawItem": menu
        }, null)]
      });
    };
    const renderMenu = (isFirst, menu) => {
      const {
        id,
        itemType,
        appMenuItems
      } = menu;
      if (!id || !c.state.menuItemsState[id].visible || !getMenuCustomVisible(id, saveConfigs.value, hideSeparator.value))
        return;
      if (appMenuItems == null ? void 0 : appMenuItems.length)
        return renderSubmenu(isFirst, menu);
      if (itemType === "MENUITEM")
        return renderMenuItem(isFirst, menu);
      if (itemType === "SEPERATOR")
        return renderSeperator(isFirst, menu);
      if (itemType === "RAWITEM")
        return renderRawitem(menu);
    };
    return {
      c,
      ns,
      key,
      menuRef,
      menuMode,
      hasScroll,
      saveConfigs,
      defaultOpens,
      defaultActive,
      isShowCollapse,
      onClick,
      renderMenu,
      ellipsisSvg,
      configSaves,
      configReset,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "ref": "menuRef",
      "class": [this.ns.b(), this.semanticClass("root"), this.ns.m(this.menuMode), this.ns.b("".concat(this.c.model.codeName.toLowerCase())), this.ns.b((_a = this.c.model.appMenuStyle) == null ? void 0 : _a.toLowerCase()), this.ns.is("collapse", this.collapse), this.ns.is("show-collapse", this.isShowCollapse), this.ns.is("show-menu-design", this.c.model.enableCustomized), this.ns.is("scroll", this.hasScroll), "".concat(((_b = this.c.model.sysCss) == null ? void 0 : _b.cssName) || "")],
      "style": this.semanticStyle("root"),
      "controller": this.c
    }, {
      default: () => {
        var _a2;
        return [this.c.state.isCreated && vue.createVNode(vue.resolveComponent("el-menu"), vue.mergeProps({
          "key": this.key,
          "class": [this.ns.e("content"), this.semanticClass("content")],
          "style": this.semanticStyle("content"),
          "popper-class": [this.ns.b("popper"), this.ns.b("".concat(this.c.model.codeName.toLowerCase(), "--popper")), "".concat(((_a2 = this.c.model.sysCss) == null ? void 0 : _a2.cssName) ? "".concat(this.c.model.sysCss.cssName, "--popper") : ""), this.semanticClass("popup")],
          "default-active": this.defaultActive,
          "default-openeds": this.defaultOpens,
          "collapse": this.collapse,
          "collapse-transition": false,
          "onSelect": this.onClick,
          "theme": "light",
          "mode": this.menuMode,
          "ellipsis-icon": () => this.ellipsisSvg(),
          "ellipsis": this.menuMode === "horizontal"
        }, this.$attrs, renderAttrs(this.c.model, {
          ...this.c.getEventArgs()
        })), {
          default: () => {
            var _a3;
            return (_a3 = this.c.model.appMenuItems) == null ? void 0 : _a3.map((menu) => this.renderMenu(true, menu));
          }
        }), this.c.model.enableCustomized && vue.createVNode(customMenuDesign.MenuDesign, {
          "class": [this.ns.b("menu-set"), this.ns.is("collapse", this.collapse), this.ns.is("horizontal", this.c.view.model.mainMenuAlign === "TOP"), this.semanticClass("design")],
          "style": this.semanticStyle("design"),
          "controller": this.c,
          "onSaved": this.configSaves,
          "onReset": this.configReset
        }, null), this.isShowCollapse && vue.createVNode("div", {
          "class": [this.ns.b("collapse-icon"), this.semanticClass("collapse"), this.ns.is("collapse", this.collapse)],
          "style": this.semanticStyle("collapse"),
          "onClick": () => {
            this.c.view.call(runtime.ViewCallTag.TOGGLE_COLLAPSE);
          }
        }, [vue.createVNode("ion-icon", {
          "name": "menu-collapse"
        }, null)])];
      }
    });
  }
});

exports.AppMenuControl = AppMenuControl;
