import { defineComponent, createVNode, mergeProps } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './common-extend-menu.css';
import { ExtendButtonMenu } from '../extend-button-menu/extend-button-menu.mjs';
import { ExtendStandardMenu } from '../extend-standard-menu/extend-standard-menu.mjs';

"use strict";
const CommonExtendMenu = /* @__PURE__ */ defineComponent({
  name: "IBizCommonExtendMenu",
  components: {
    ExtendButtonMenu,
    ExtendStandardMenu
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
    const ns = useNamespace("common-extend-menu");
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
    let content = createVNode(ExtendButtonMenu, mergeProps({
      "items": this.items,
      "menuItemsState": this.menuItemsState,
      "providers": this.providers,
      "position": this.position,
      "layoutMode": this.layoutMode,
      "layout": this.layout,
      "onMenuItemClick": this.handleMenuItemClick
    }, this.$attrs), null);
    if (((_a = this.renderMode) == null ? void 0 : _a.toLocaleUpperCase()) === "MENU") {
      content = createVNode(ExtendStandardMenu, mergeProps({
        "items": this.items,
        "menuItemsState": this.menuItemsState,
        "providers": this.providers,
        "position": this.position,
        "layoutMode": this.layoutMode,
        "layout": this.layout,
        "onMenuItemClick": this.handleMenuItemClick
      }, this.$attrs), null);
    }
    return createVNode("div", {
      "class": this.ns.b()
    }, [content]);
  }
});

export { CommonExtendMenu };
