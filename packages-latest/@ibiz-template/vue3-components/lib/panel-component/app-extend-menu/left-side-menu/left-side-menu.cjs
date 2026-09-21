'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var leftSideMenu_controller = require('./left-side-menu.controller.cjs');
require('./left-side-menu.css');

"use strict";
const LeftSideMenu = /* @__PURE__ */ vue.defineComponent({
  name: "IBizLeftSideMenu",
  props: {
    /**
     * @description 模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 左侧菜单控制器
     */
    controller: {
      type: leftSideMenu_controller.LeftSideMenuController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("left-side-menu");
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
      "position": "LEFT",
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

exports.LeftSideMenu = LeftSideMenu;
