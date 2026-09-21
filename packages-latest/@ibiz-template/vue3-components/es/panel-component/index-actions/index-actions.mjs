import { isVNode, defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { useNamespace, useSemanticNode, PanelContainerController } from '@ibiz-template/vue3-util';
import './index-actions.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IndexActions = /* @__PURE__ */ defineComponent({
  name: "IBizIndexActions",
  props: {
    /**
     * @description 首页行为容器组件模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 首页行为容器组件控制器
     */
    controller: {
      type: PanelContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("index-actions");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const isCollapse = computed(() => {
      return props.controller.panel.view.state.isCollapse;
    });
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("collapse", isCollapse.value)];
      return result;
    });
    return {
      ns,
      classArr,
      isCollapse,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    let _slot;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const content = createVNode(resolveComponent("iBizRow"), {
      "slot": "content",
      "class": this.semanticClass("content"),
      "style": this.semanticStyle("content"),
      "layout": this.modelData.layout
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
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
    });
    return createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "onClick": (event) => this.controller.onClick(event)
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]);
  }
});

export { IndexActions };
