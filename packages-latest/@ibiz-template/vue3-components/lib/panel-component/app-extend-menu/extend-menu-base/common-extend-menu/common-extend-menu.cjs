'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./common-extend-menu.css');
var extendButtonMenu = require('../extend-button-menu/extend-button-menu.cjs');
var extendStandardMenu = require('../extend-standard-menu/extend-standard-menu.cjs');

"use strict";
const CommonExtendMenu = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCommonExtendMenu",
  components: {
    ExtendButtonMenu: extendButtonMenu.ExtendButtonMenu,
    ExtendStandardMenu: extendStandardMenu.ExtendStandardMenu
  },
  props: {
    /**
     * @description 绘制模式，'BUTTON' | 'MENU': 按钮态(仅识别一层) | 常规菜单态
     */
    renderMode: {
      type: String,
      required: true
    },
    /**
     * @description 菜单项数据
     */
    items: {
      type: Object,
      required: true
    },
    /**
     * @description 菜单项权限数据
     */
    menuItemsState: {
      type: Object,
      required: true
    },
    /**
     * @description 菜单项适配器集合
     */
    providers: {
      type: Object,
      required: true
    },
    /**
     * @description 菜单方向
     */
    position: {
      type: String,
      required: true
    },
    /**
     * @description 菜单布局模式,现阶段仅需识别FLEX（flex布局）和BORDER（边缘布局）
     */
    layoutMode: {
      type: String,
      default: "FLEX"
    },
    /**
     * @description 菜单布局容器模型（按钮形态才识别）
     */
    layout: {
      type: Object
    }
  },
  emits: {
    /**
     * @description 项点击事件
     */
    menuItemClick: (item, event) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("common-extend-menu");
    const handleMenuItemClick = (menuItem, event) => {
      if (!menuItem || (menuItem == null ? void 0 : menuItem.itemType) === "RAWITEM") {
        return;
      }
      emit("menuItemClick", menuItem, event);
    };
    return {
      ns,
      handleMenuItemClick
    };
  },
  render() {
    var _a;
    let content = vue.createVNode(extendButtonMenu.ExtendButtonMenu, vue.mergeProps({
      "items": this.items,
      "menuItemsState": this.menuItemsState,
      "providers": this.providers,
      "position": this.position,
      "layoutMode": this.layoutMode,
      "layout": this.layout,
      "onMenuItemClick": this.handleMenuItemClick
    }, this.$attrs), null);
    if (((_a = this.renderMode) == null ? void 0 : _a.toLocaleUpperCase()) === "MENU") {
      content = vue.createVNode(extendStandardMenu.ExtendStandardMenu, vue.mergeProps({
        "items": this.items,
        "menuItemsState": this.menuItemsState,
        "providers": this.providers,
        "position": this.position,
        "layoutMode": this.layoutMode,
        "layout": this.layout,
        "onMenuItemClick": this.handleMenuItemClick
      }, this.$attrs), null);
    }
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [content]);
  }
});

exports.CommonExtendMenu = CommonExtendMenu;
