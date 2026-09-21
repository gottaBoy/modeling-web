import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { PanelItemController } from '@ibiz-template/runtime';
import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelTabPage = /* @__PURE__ */ defineComponent({
  name: "IBizPanelTabPage",
  props: {
    modelData: {
      // IPanelTabPage 不能使用 IPanelTabPage模型 否则会类型报错
      type: Object,
      required: true
    },
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-tab-page");
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    return {
      ns,
      classArr
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return createVNode(resolveComponent("iBizRow"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.classArr],
      "layout": this.modelData.layout
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

export { PanelTabPage };
