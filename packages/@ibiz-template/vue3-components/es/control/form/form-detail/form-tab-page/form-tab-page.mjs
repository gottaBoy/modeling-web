import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useController } from '@ibiz-template/vue3-util';
import './form-tab-page.css';
import { FormTabPageController } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const FormTabPage = /* @__PURE__ */ defineComponent({
  name: "IBizFormTabPage",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormTabPageController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("form-tab-page");
    useController(props.controller);
    return {
      ns
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return createVNode(resolveComponent("iBizRow"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass],
      "layout": this.modelData.layout,
      "onClick": (event) => this.controller.onClick(event)
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": c.model.layoutPos,
        "state": c.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { FormTabPage, FormTabPage as default };
