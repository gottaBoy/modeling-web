import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import '../../../use/index.mjs';
import { ScrollContainerItemController } from './scroll-container-item.controller.mjs';
import './scroll-container-item.css';
import { useNamespace } from '../../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ScrollContainerItem = /* @__PURE__ */ defineComponent({
  name: "IBizScrollContainerItem",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: ScrollContainerItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("scroll-container-item");
    const {
      id
    } = props.modelData;
    const classArr = computed(() => {
      const result = [ns.b(), ns.m(id), ns.is("hidden", !props.controller.state.visible)];
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
      "class": this.classArr,
      "layout": {
        layout: "FLEX"
      }
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      props.modelData.layoutPos.layout = "FLEX";
      return createVNode(resolveComponent("iBizCol"), {
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { ScrollContainerItem };
