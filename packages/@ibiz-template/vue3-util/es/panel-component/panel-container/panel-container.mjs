import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import '../../use/index.mjs';
import { PanelContainerController } from './panel-container.controller.mjs';
import './panel-container.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelContainer = /* @__PURE__ */ defineComponent({
  name: "IBizPanelContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-container");
    const {
      id
    } = props.modelData;
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
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
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "layout": this.modelData.layout
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
    return createVNode("div", {
      "class": this.classArr,
      "onClick": () => {
        this.controller.onClick();
      }
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

export { PanelContainer };
