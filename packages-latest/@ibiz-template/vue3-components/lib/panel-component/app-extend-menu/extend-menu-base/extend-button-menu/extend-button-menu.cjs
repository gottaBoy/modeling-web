'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var extendMenuBase_util = require('../extend-menu-base.util.cjs');
require('./extend-button-menu.css');

"use strict";
const rightArrow = () => vue.createVNode("svg", {
  "xmlns": "http://www.w3.org/2000/svg",
  "viewBox": "0 0 1024 1024",
  "width": "1em",
  "height": "1em",
  "fill": "currentColor"
}, [vue.createVNode("path", {
  "fill": "currentColor",
  "d": "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
}, null)]);
function renderMenuItem(params) {
  var _a, _b, _c;
  const {
    ns,
    menu,
    menuAlign,
    menuItemsState,
    semantic
  } = params;
  if (!menu.id || !((_a = menuItemsState[menu.id]) == null ? void 0 : _a.visible))
    return;
  if (menu.itemType === "MENUITEM") {
    return vue.createVNode(vue.resolveComponent("el-button"), {
      "class": [ns.e("menuitem"), "".concat(((_b = menu.sysCss) == null ? void 0 : _b.cssName) || ""), semantic.semanticClass("item", {
        item: menu
      })],
      "style": semantic.semanticStyle("item", {
        item: menu
      }),
      "index": menu.id
    }, {
      default: () => [menu.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "class": [ns.e("icon"), semantic.semanticClass("item.icon", {
          item: menu
        })],
        "style": semantic.semanticStyle("item.icon", {
          item: menu
        }),
        "icon": menu.sysImage
      }, null), menu.caption && vue.createVNode("span", {
        "class": [ns.e("caption"), semantic.semanticClass("item.caption", {
          item: menu
        })],
        "style": semantic.semanticStyle("item.caption", {
          item: menu
        }),
        "title": core.showTitle(menu.tooltip)
      }, [menu.caption])]
    });
  }
  if (menu.itemType === "SEPERATOR") {
    const direction = menuAlign === "horizontal" ? "vertical" : "horizontal";
    return vue.createVNode(vue.resolveComponent("el-divider"), {
      "direction": direction,
      "class": [ns.em("separator"), ns.em("separator", direction), semantic.semanticClass("divider", {
        item: menu
      })],
      "style": semantic.semanticStyle("divider", {
        item: menu
      }),
      "id": menu.id
    }, null);
  }
  if (menu.itemType === "RAWITEM") {
    return vue.createVNode(vue.resolveComponent("el-button"), {
      "index": menu.id,
      "title": core.showTitle(menu.tooltip),
      "class": [ns.e("rawitem"), "".concat(((_c = menu.sysCss) == null ? void 0 : _c.cssName) || ""), semantic.semanticClass("rawitem", {
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
function renderMenuContent(_params) {
  const {
    ns,
    isLayout,
    menuLayout,
    position,
    menuAlign,
    menus,
    menuItemsState,
    showCascaderArrow,
    semantic,
    handleMenuItemClick,
    handleMenuItemMouseEnter,
    handleMenuItemMouseLeave
  } = _params;
  const layoutStyle = isLayout ? extendMenuBase_util.getMenuLayout(menuLayout) : {};
  return vue.createVNode(vue.resolveComponent("el-row"), {
    "class": [ns.e("content"), ns.is(menuAlign, !!menuAlign), ns.is(position == null ? void 0 : position.toLowerCase(), !!position), semantic.semanticClass("content")],
    "style": [layoutStyle, semantic.semanticStyle("content")]
  }, {
    default: () => menus.map((menu) => {
      var _a, _b;
      const menuItem = renderMenuItem({
        menu,
        ns,
        menuAlign,
        menuItemsState,
        semantic
      });
      if (!menuItem)
        return;
      const style = {};
      if (isLayout && ((_a = menu.layoutPos) == null ? void 0 : _a.layout) === "FLEX") {
        const pos = menu.layoutPos;
        Object.assign(style, {
          flexGrow: pos.grow,
          flexShrink: pos.shrink === 1 ? void 0 : pos.shrink,
          flexBasis: pos.basis
        });
      }
      const isShowArrow = !!(showCascaderArrow && menu.children);
      return vue.createVNode("div", {
        "class": [ns.em("content", "item"), ns.em("content", (_b = menu.itemType) == null ? void 0 : _b.toLowerCase()), ns.is("show-arrow", isShowArrow)],
        "style": style
      }, [vue.createVNode("div", {
        "class": ns.em("content", "item-container"),
        "onMouseenter": (_e) => handleMenuItemMouseEnter(menu, _e),
        "onMouseleave": (_e) => handleMenuItemMouseLeave(menu, _e),
        "onClick": (_e) => handleMenuItemClick(menu, _e)
      }, [menuItem]), isShowArrow && vue.createVNode("span", {
        "class": ns.em("content", "item-arrow")
      }, [rightArrow()])]);
    })
  });
}
const ExtendButtonMenu = /* @__PURE__ */ vue.defineComponent({
  name: "IBizExtendButtonMenu",
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
    menuItemClick: (item, event) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("extend-menu-button");
    const buttonMenuRef = vue.ref();
    const menuAlign = vue.computed(() => ["TOP", "BOTTOM"].includes(props.position) ? "horizontal" : "vertical");
    const isLayout = vue.computed(() => props.layoutMode !== "BORDER");
    const menus = vue.ref(extendMenuBase_util.getMenus(props.items));
    const renderCascaderContent = (_menu) => {
      return renderMenuContent({
        ns,
        menuAlign: "vertical",
        position: props.position,
        menus: _menu.children,
        menuItemsState: props.menuItemsState,
        handleMenuItemClick,
        handleMenuItemMouseEnter,
        handleMenuItemMouseLeave,
        showCascaderArrow: true,
        isLayout: false,
        semantic: props.semantic
      });
    };
    const renderBorderContent = () => {
      return renderMenuContent({
        ns,
        menuAlign: menuAlign.value,
        position: props.position,
        menus: menus.value,
        menuItemsState: props.menuItemsState,
        handleMenuItemClick,
        handleMenuItemMouseEnter,
        handleMenuItemMouseLeave,
        showCascaderArrow: true,
        isLayout: false,
        semantic: props.semantic
      });
    };
    const {
      getOverlayNum,
      clearAllCascader,
      handleMenuItemMouseEnter,
      handleMenuItemMouseLeave
    } = extendMenuBase_util.useCascaderPopover(props, ns, menuAlign, renderCascaderContent);
    let closeBorderPopover;
    if (props.layoutMode === "BORDER") {
      const borderLayout = extendMenuBase_util.useBorderLayout(buttonMenuRef, ns, props.position, menuAlign, getOverlayNum, renderBorderContent);
      closeBorderPopover = borderLayout.closeBorderPopover;
    }
    const handleMenuItemClick = async (_menu, _event) => {
      if (_menu.children)
        return;
      clearAllCascader();
      if (closeBorderPopover)
        closeBorderPopover();
      if (!_menu.appFuncId) {
        ibiz.log.warn(ibiz.i18n.t("runtime.controller.control.menu.noConfigured"));
        return;
      }
      const menuItem = extendMenuBase_util.findMenuItem(_menu.id, props.items);
      emit("menuItemClick", menuItem, _event);
    };
    return {
      ns,
      menus,
      menuAlign,
      isLayout,
      buttonMenuRef,
      handleMenuItemClick,
      handleMenuItemMouseEnter,
      handleMenuItemMouseLeave
    };
  },
  render() {
    return vue.createVNode("div", {
      "ref": "buttonMenuRef",
      "class": [this.ns.b(), this.ns.is(this.layoutMode.toLowerCase(), !!this.layoutMode), this.ns.is(this.position.toLowerCase(), !!this.position), this.ns.is(this.menuAlign, !!this.menuAlign)]
    }, [this.layoutMode !== "BORDER" && renderMenuContent({
      ns: this.ns,
      menuAlign: this.menuAlign,
      isLayout: this.isLayout,
      menuLayout: this.layout,
      position: this.position,
      menus: this.menus,
      menuItemsState: this.menuItemsState,
      handleMenuItemClick: this.handleMenuItemClick,
      handleMenuItemMouseEnter: this.handleMenuItemMouseEnter,
      handleMenuItemMouseLeave: this.handleMenuItemMouseLeave,
      semantic: this.semantic
    })]);
  }
});

exports.ExtendButtonMenu = ExtendButtonMenu;
