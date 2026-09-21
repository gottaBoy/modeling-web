'use strict';

var vue = require('vue');
var core = require('@ibiz-template/core');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var extendMenuBase_util = require('../extend-menu-base.util.cjs');
require('./extend-standard-menu.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const ellipsisSvg = () => {
  return vue.createVNode("ion-icon", {
    "name": "ellipsis-horizontal"
  }, null);
};
function renderMenuItem(_params) {
  var _a, _b, _c, _d;
  const {
    isFirst,
    menu,
    collapse,
    ns,
    menuAlign,
    menuItemsState,
    semantic
  } = _params;
  if (!menu.id || menuItemsState && !((_a = menuItemsState[menu.id]) == null ? void 0 : _a.visible)) {
    return;
  }
  if (menu.itemType === "MENUITEM") {
    let content;
    if (!(isFirst && collapse)) {
      content = [menu.sysImage ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [ns.e("icon"), semantic.semanticClass("item.icon", {
          item: menu
        })],
        "style": semantic.semanticStyle("item.icon", {
          item: menu
        }),
        "icon": menu.sysImage
      }, null) : null, vue.createVNode("span", {
        "class": [ns.e("caption"), semantic.semanticClass("item.caption", {
          item: menu
        })],
        "style": semantic.semanticStyle("item.caption", {
          item: menu
        })
      }, [menu.caption])];
    } else {
      content = [menu.sysImage ? vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [ns.e("icon"), semantic.semanticClass("item.icon", {
          item: menu
        })],
        "style": semantic.semanticStyle("item.icon", {
          item: menu
        }),
        "icon": menu.sysImage
      }, null) : vue.createVNode("span", {
        "class": [ns.e("caption"), semantic.semanticClass("item.caption", {
          item: menu
        })],
        "style": semantic.semanticStyle("item.caption", {
          item: menu
        })
      }, [(_b = menu.caption) == null ? void 0 : _b.slice(0, 1)])];
    }
    return !(isFirst && collapse) ? vue.createVNode(vue.resolveComponent("el-menu-item"), {
      "class": [ns.e("item"), "".concat(((_c = menu.sysCss) == null ? void 0 : _c.cssName) || ""), semantic.semanticClass("item", {
        item: menu
      })],
      "style": semantic.semanticStyle("item", {
        item: menu
      }),
      "index": menu.id,
      "title": core.showTitle(menu.tooltip)
    }, _isSlot(content) ? content : {
      default: () => [content]
    }) : vue.createVNode(vue.resolveComponent("el-tooltip"), {
      "class": ns.b("tooltip"),
      "content": menu.caption,
      "placement": menuAlign === "horizontal" ? "bottom" : "left",
      "theme": "light"
    }, {
      default: () => {
        var _a2;
        return [vue.createVNode(vue.resolveComponent("el-menu-item"), {
          "class": [ns.e("item"), "".concat(((_a2 = menu.sysCss) == null ? void 0 : _a2.cssName) || ""), semantic.semanticClass("item", {
            item: menu
          })],
          "style": semantic.semanticStyle("item", {
            item: menu
          }),
          "index": menu.id
        }, _isSlot(content) ? content : {
          default: () => [content]
        })];
      }
    });
  }
  if (menu.itemType === "SEPERATOR") {
    const direction = menuAlign === "horizontal" && isFirst ? "vertical" : "horizontal";
    return vue.createVNode(vue.resolveComponent("el-divider"), {
      "direction": direction,
      "class": [ns.em("separator", direction), semantic.semanticClass("divider", {
        item: menu
      })],
      "style": semantic.semanticStyle("divider", {
        item: menu
      }),
      "id": menu.id
    }, null);
  }
  if (menu.itemType === "RAWITEM") {
    return vue.createVNode(vue.resolveComponent("el-menu-item"), {
      "index": menu.id,
      "title": core.showTitle(menu.tooltip),
      "class": [ns.e("rawitem"), "".concat(((_d = menu.sysCss) == null ? void 0 : _d.cssName) || ""), semantic.semanticClass("rawitem", {
        item: menu
      })],
      "style": semantic.semanticStyle("rawitem", {
        item: menu
      })
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizRawItem"), {
        "rawItem": menu
      }, null)]
    });
  }
}
function renderSubmenu(_params) {
  var _a, _b;
  const {
    isFirst,
    menu,
    collapse,
    ns,
    menuAlign,
    menuItemsState,
    semantic
  } = _params;
  if (!menu.id || menuItemsState && !((_a = menuItemsState[menu.id]) == null ? void 0 : _a.visible)) {
    return;
  }
  return vue.createVNode(vue.resolveComponent("el-sub-menu"), {
    "class": [ns.b("submenu"), "".concat(((_b = menu.sysCss) == null ? void 0 : _b.cssName) || ""), semantic.semanticClass("submenu", {
      item: menu
    })],
    "style": semantic.semanticStyle("submenu", {
      item: menu
    }),
    "index": menu.id,
    "teleported": true,
    "popper-class": [ns.b("popup-container"), semantic.semanticClass("popup", {
      item: menu
    })]
  }, {
    default: () => menu.children && menu.children.map((item) => {
      if (item.children && item.children) {
        return renderSubmenu({
          isFirst: false,
          menu: item,
          collapse,
          ns,
          menuAlign,
          menuItemsState,
          semantic
        });
      }
      return renderMenuItem({
        isFirst: false,
        menu: item,
        collapse,
        ns,
        menuAlign,
        menuItemsState,
        semantic
      });
    }),
    title: () => {
      var _a2;
      if (collapse) {
        if (menu.sysImage) {
          return vue.createVNode(vue.resolveComponent("iBizIcon"), {
            "class": [ns.e("icon"), semantic.semanticClass("subitem.icon", {
              item: menu
            })],
            "style": semantic.semanticStyle("subitem.icon", {
              item: menu
            }),
            "icon": menu.sysImage
          }, null);
        }
        return [isFirst ? (_a2 = menu.caption) == null ? void 0 : _a2.slice(0, 1) : menu.caption, isFirst ? null : vue.createVNode("ion-icon", {
          "name": "chevron-forward-outline"
        }, null)];
      }
      return [vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [ns.e("icon"), semantic.semanticClass("subitem.icon", {
          item: menu
        })],
        "style": semantic.semanticStyle("subitem.icon", {
          item: menu
        }),
        "icon": menu.sysImage
      }, null), vue.createVNode("span", {
        "class": [ns.e("caption"), semantic.semanticClass("subitem.caption", {
          item: menu
        })],
        "style": semantic.semanticStyle("subitem.caption", {
          item: menu
        })
      }, [menu.caption])];
    }
  });
}
function renderMenuContent(_params) {
  const {
    refreshKey,
    ns,
    collapse,
    menuAlign,
    position,
    menus,
    menuItemsState,
    semantic,
    handleMenuSelect
  } = _params;
  return vue.createVNode("div", {
    "class": [ns.e("content"), ns.is("collapse", collapse), ns.is(menuAlign, !!menuAlign), ns.is(position == null ? void 0 : position.toLowerCase(), !!position), semantic.semanticClass("content")],
    "style": semantic.semanticStyle("content")
  }, [vue.createVNode(vue.resolveComponent("el-menu"), {
    "key": refreshKey,
    "popper-class": [ns.b("popper")],
    "collapse": collapse,
    "collapse-transition": false,
    "onSelect": handleMenuSelect,
    "theme": "light",
    "mode": menuAlign,
    "ellipsis-icon": () => ellipsisSvg(),
    "ellipsis": menuAlign === "horizontal"
  }, {
    default: () => {
      return menus.map((item) => {
        if (item.children && item.children.length > 0) {
          return renderSubmenu({
            isFirst: true,
            menu: item,
            collapse,
            ns,
            menuAlign,
            menuItemsState,
            semantic
          });
        }
        return renderMenuItem({
          isFirst: true,
          menu: item,
          collapse,
          ns,
          menuAlign,
          menuItemsState,
          semantic
        });
      });
    }
  })]);
}
const ExtendStandardMenu = /* @__PURE__ */ vue.defineComponent({
  name: "IBizExtendStandardMenu",
  props: {
    items: {
      type: Object,
      required: true
    },
    menuItemsState: {
      type: Object,
      required: true
    },
    providers: {
      type: Object,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    layoutMode: {
      type: String,
      required: true
    },
    layout: {
      type: Object
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
    /**
     * @description 项点击事件
     */
    menuItemClick: (_item, _event) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("extend-standard-menu");
    const defaultMenuRef = vue.ref();
    const refreshKey = vue.ref(qxUtil.createUUID());
    const collapse = vue.ref(false);
    const menuAlign = vue.computed(() => ["TOP", "BOTTOM"].includes(props.position) ? "horizontal" : "vertical");
    const menus = vue.ref(extendMenuBase_util.getMenus(props.items));
    const handleMenuSelect = async (_id, _event) => {
      const menuItem = extendMenuBase_util.findMenuItem(_id, props.items);
      if (!(menuItem == null ? void 0 : menuItem.appFuncId)) {
        ibiz.log.warn(ibiz.i18n.t("runtime.controller.control.menu.noConfigured"));
        return;
      }
      emit("menuItemClick", menuItem, _event);
    };
    return {
      ns,
      defaultMenuRef,
      refreshKey,
      collapse,
      menuAlign,
      menus,
      handleMenuSelect
    };
  },
  render() {
    return vue.createVNode("div", {
      "ref": "defaultMenuRef",
      "class": [this.ns.b(), this.ns.b(this.layoutMode.toLowerCase()), this.ns.is(this.position.toLowerCase(), true), this.ns.is(this.menuAlign, true), this.ns.is("collapse", this.collapse)]
    }, [renderMenuContent({
      isLayout: false,
      position: this.position,
      refreshKey: this.refreshKey,
      ns: this.ns,
      collapse: this.collapse,
      menuAlign: this.menuAlign,
      menus: this.menus,
      menuLayout: this.layout,
      menuItemsState: this.menuItemsState,
      handleMenuSelect: this.handleMenuSelect,
      semantic: this.semantic
    })]);
  }
});

exports.ExtendStandardMenu = ExtendStandardMenu;
