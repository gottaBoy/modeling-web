import { isVNode, defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective, computed } from 'vue';
import '../../../use/index.mjs';
import { ScrollContainerItemController } from './scroll-container-item.controller.mjs';
import './scroll-container-item.css';
import { useNamespace } from '../../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ScrollContainerItem = /* @__PURE__ */ defineComponent({
  name: "IBizScrollContainerItem",
  props: {
    /**
     * @description 面板滚动容器项模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板滚动容器项控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const classArr = computed(() => {
      const result = [ns.b(), ns.m(id), ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    return {
      ns,
      classArr,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return withDirectives(createVNode(resolveComponent("iBizRow"), {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "layout": {
        layout: "FLEX"
      },
      "element-loading-text": this.controller.state.loadingText
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      props.modelData.layoutPos.layout = "FLEX";
      return createVNode(resolveComponent("iBizCol"), {
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        }),
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    }), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { ScrollContainerItem };
