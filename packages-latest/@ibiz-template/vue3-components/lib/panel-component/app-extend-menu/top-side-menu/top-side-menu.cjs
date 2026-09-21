'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var topSideMenu_controller = require('./top-side-menu.controller.cjs');
require('./top-side-menu.css');

"use strict";
const TopSideMenu = /* @__PURE__ */ vue.defineComponent({
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
      type: topSideMenu_controller.TopSideMenuController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("top-side-menu");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("root")],
      "style": this.semanticStyle("root")
    }, [vue.createVNode(vue.resolveComponent("iBizCommonExtendMenu"), {
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

exports.TopSideMenu = TopSideMenu;
