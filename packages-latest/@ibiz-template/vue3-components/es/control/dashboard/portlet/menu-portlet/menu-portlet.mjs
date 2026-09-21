import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { ControlType, MenuPortletController } from '@ibiz-template/runtime';

"use strict";
const MenuPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizMenuPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: MenuPortletController,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.dashboard);
    const menu = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === ControlType.APP_MENU;
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
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [this.menu && createVNode(resolveComponent("iBizAppMenuPortletControl"), {
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

export { MenuPortlet };
