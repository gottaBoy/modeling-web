import { isVNode, defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective, computed } from 'vue';
import { PanelContainerController } from '@ibiz-template/runtime';
import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelTabPage = /* @__PURE__ */ defineComponent({
  name: "IBizPanelTabPage",
  props: {
    /**
     * @description 面板分页模型
     */
    modelData: {
      // IPanelTabPage 不能使用 IPanelTabPage模型 否则会类型报错
      type: Object,
      required: true
    },
    /**
     * @description 面板分页控制器
     */
    controller: {
      type: PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-tab-page");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
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
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "layout": this.modelData.layout,
      "element-loading-text": this.controller.state.loadingText
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      return createVNode(resolveComponent("iBizCol"), {
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        }),
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

export { PanelTabPage };
