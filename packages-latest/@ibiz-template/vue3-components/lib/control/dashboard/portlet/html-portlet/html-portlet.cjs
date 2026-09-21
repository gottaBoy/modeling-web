'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./html-portlet.css');

"use strict";
const HtmlPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizHtmlPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.HtmlPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.dashboard);
    return {
      ns,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return vue.createVNode(vue.resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, {
      default: () => [vue.createVNode("iframe", {
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

exports.HtmlPortlet = HtmlPortlet;
