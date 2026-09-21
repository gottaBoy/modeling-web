'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
const MenuPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMenuPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.MenuPortletController,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.dashboard);
    const menu = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === runtime.ControlType.APP_MENU;
    });
    return {
      ns,
      menu,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    const {
      context,
      params
    } = this.controller;
    return vue.createVNode(vue.resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [this.menu && vue.createVNode(vue.resolveComponent("iBizAppMenuPortletControl"), {
        "class": this.semanticClass("portlet.menu", {
          menu: this.controller
        }),
        "style": this.semanticStyle("portlet.menu", {
          menu: this.controller
        }),
        "modelData": this.menu,
        "context": context,
        "params": params
      }, null)]
    });
  }
});

exports.MenuPortlet = MenuPortlet;
