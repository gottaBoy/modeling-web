import { isVNode, defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { ContainerPortletController } from '@ibiz-template/runtime';
import './container-portlet.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ContainerPortlet = /* @__PURE__ */ defineComponent({
  name: "IBizContainerPortlet",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ContainerPortletController,
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
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = createVNode(resolveComponent("iBizRow"), {
      "layout": this.modelData.layout,
      "class": this.semanticClass("portlet.container", {
        container: this.controller
      }),
      "style": this.semanticStyle("portlet.container", {
        container: this.controller
      })
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
    const classArr = [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass];
    return createVNode(resolveComponent("iBizPortletLayout"), {
      "controller": this.controller,
      "class": classArr
    }, _isSlot(content) ? content : {
      default: () => [content]
    });
  }
});

export { ContainerPortlet };
