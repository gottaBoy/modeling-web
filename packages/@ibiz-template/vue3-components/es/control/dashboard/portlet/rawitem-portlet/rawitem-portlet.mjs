import { isVNode, defineComponent, createVNode, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { RawItemPortletController } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const RawItemPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizRawItemPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: RawItemPortletController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const rawItem = props.modelData;
    return {
      ns,
      rawItem
    };
  },
  render() {
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, _isSlot(_slot = h(resolveComponent("iBizRawItem"), {
      rawItem: this.rawItem
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { RawItemPortlet };
