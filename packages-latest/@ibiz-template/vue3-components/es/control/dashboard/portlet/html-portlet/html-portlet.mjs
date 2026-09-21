import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.dashboard);
    return {
      ns,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [createVNode("iframe", {
        "class": this.semanticClass("portlet.html", {
          html: this.controller
        }),
        "style": this.semanticStyle("portlet.html", {
          html: this.controller
        }),
        "src": this.modelData.pageUrl
      }, null)]
    });
  }
});

export { HtmlPortlet };
