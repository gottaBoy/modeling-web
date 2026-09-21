import { isVNode, defineComponent, createVNode, resolveComponent, ref, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { PanelItemController } from '@ibiz-template/runtime';
import './panel-exp-header.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelExpHeader = /* @__PURE__ */ defineComponent({
  name: "IBizPanelExpHeader",
  props: {
    /**
     * @description 面板容器（导航部件头部）模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板容器（导航部件头部）控制器
     */
    controller: {
      type: PanelItemController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-exp-header");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const {
      showCaption,
      titleBarCloseMode,
      id
    } = props.modelData;
    const collapsible = titleBarCloseMode !== 0;
    const isCollapse = ref(titleBarCloseMode === 2);
    const changeCollapse = () => {
      if (collapsible) {
        isCollapse.value = !isCollapse.value;
      }
    };
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      if (showCaption === true) {
        result = [...result, ...props.controller.containerClass, showCaption && ns.m("show-header"), collapsible && ns.m("collapsible"), ns.is("collapse", collapsible && isCollapse.value), ns.is("hidden", !props.controller.state.visible)];
      }
      return result;
    });
    return {
      ns,
      isCollapse,
      classArr,
      changeCollapse,
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
      "class": [this.ns.e("content"), this.semanticClass("content")],
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
      "style": this.semanticStyle("root")
    }, [content]);
  }
});

export { PanelExpHeader };
