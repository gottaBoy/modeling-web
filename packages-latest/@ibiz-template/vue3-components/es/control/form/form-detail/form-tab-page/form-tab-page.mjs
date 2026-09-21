import { isVNode, defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective } from 'vue';
import { useNamespace, useSemanticNode, useController } from '@ibiz-template/vue3-util';
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.form);
    useController(props.controller);
    return {
      ns,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return withDirectives(createVNode(resolveComponent("iBizRow"), {
      "class": [this.ns.b(), this.semanticClass("tabpage", {
        tabPage: this.controller
      }), this.ns.m(this.modelData.codeName), ...this.controller.containerClass],
      "style": this.semanticStyle("tabpage", {
        tabPage: this.controller
      }),
      "layout": this.modelData.layout,
      "element-loading-text": this.controller.state.loadingText,
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
    }), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { FormTabPage, FormTabPage as default };
