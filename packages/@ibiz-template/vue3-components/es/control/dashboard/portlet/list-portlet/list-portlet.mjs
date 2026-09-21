import { isVNode, defineComponent, onMounted, onBeforeUnmount, createVNode, resolveComponent, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ListPortletController, ControlType } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ListPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizListPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ListPortletController,
      required: true
    }
  },
  setup(props) {
    var _a, _b;
    const ns = useNamespace("portlet-".concat((_a = props.modelData.portletType) == null ? void 0 : _a.toLowerCase()));
    const list = (_b = props.modelData.controls) == null ? void 0 : _b.find((item) => {
      return item.controlType === ControlType.LIST;
    });
    let timerTag;
    onMounted(() => {
      const timer = props.controller.model.timer;
      if (timer && timer > 0) {
        timerTag = setInterval(() => {
          props.controller.refresh();
        }, timer);
      }
    });
    onBeforeUnmount(() => {
      clearInterval(timerTag);
    });
    return {
      ns,
      list
    };
  },
  render() {
    let _slot;
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    const {
      context,
      params
    } = this.controller;
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, _isSlot(_slot = h(resolveComponent("IBizControlShell"), {
      context,
      params,
      modelData: this.list
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ListPortlet };
