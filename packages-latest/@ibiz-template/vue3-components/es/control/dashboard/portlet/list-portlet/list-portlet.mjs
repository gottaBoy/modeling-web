import { isVNode, defineComponent, createVNode, resolveComponent, h, onMounted, onBeforeUnmount } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { ControlType, ListPortletController } from '@ibiz-template/runtime';

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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.dashboard);
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
      list,
      semanticClass,
      semanticStyle
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
      class: this.semanticClass("portlet.list", {
        list: this.controller
      }),
      style: this.semanticStyle("portlet.list", {
        list: this.controller
      }),
      context,
      params,
      modelData: this.list
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ListPortlet };
