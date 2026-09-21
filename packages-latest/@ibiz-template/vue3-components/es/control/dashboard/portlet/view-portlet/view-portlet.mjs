import { isVNode, defineComponent, createVNode, resolveComponent, h, onMounted, onBeforeUnmount } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { ViewPortletController } from '@ibiz-template/runtime';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ViewPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizViewPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ViewPortletController,
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
    const view = props.modelData.portletAppView;
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
      view,
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
    }, _isSlot(_slot = h(resolveComponent("IBizViewShell"), {
      class: this.semanticClass("portlet.view", {
        view: this.controller
      }),
      style: this.semanticStyle("portlet.view", {
        view: this.controller
      }),
      context,
      params,
      modelData: this.view
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ViewPortlet };
