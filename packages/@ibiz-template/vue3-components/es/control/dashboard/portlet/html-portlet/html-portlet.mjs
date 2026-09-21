import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { HtmlPortletController } from '@ibiz-template/runtime';
import './html-portlet.css';

"use strict";
const HtmlPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizHtmlPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: HtmlPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    return {
      ns
    };
  },
  render() {
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [createVNode("iframe", {
        "src": this.modelData.pageUrl
      }, null)]
    });
  }
});

export { HtmlPortlet };
