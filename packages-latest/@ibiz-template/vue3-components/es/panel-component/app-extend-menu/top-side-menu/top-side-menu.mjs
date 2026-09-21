import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { TopSideMenuController } from './top-side-menu.controller.mjs';
import './top-side-menu.css';

"use strict";
const TopSideMenu = /* @__PURE__ */ defineComponent({
  name: "IBizTopSideMenu",
  props: {
    /**
     * @description 模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 头部菜单控制器
     */
    controller: {
      type: TopSideMenuController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("top-side-menu");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const {
      state
    } = props.controller;
    return {
      ns,
      state,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.appMenu) {
      return null;
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [createVNode(resolveComponent("iBizCommonExtendMenu"), {
      "renderMode": this.controller.rawItemParams.rendermode,
      "items": this.state.items,
      "menuItemsState": this.state.menuItemsState,
      "providers": this.controller.itemProviders,
      "position": "TOP",
      "layoutMode": this.controller.appMenu.layoutMode,
      "layout": this.controller.appMenu.layout,
      "onMenuItemClick": (item, event) => {
        this.controller.handleClickMenuItem(item, event);
      },
      "semantic": {
        semanticClass: this.semanticClass,
        semanticStyle: this.semanticStyle
      }
    }, null)]);
  }
});

export { TopSideMenu };
