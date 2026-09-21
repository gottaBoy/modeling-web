'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const RawItemPortlet = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRawItemPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.RawItemPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const rawItem = props.modelData;
    return {
      ns,
      rawItem
    };
  },
  render() {
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return vue.createVNode(vue.resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, _isSlot(_slot = vue.h(vue.resolveComponent("iBizRawItem"), {
      rawItem: this.rawItem
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

exports.RawItemPortlet = RawItemPortlet;
