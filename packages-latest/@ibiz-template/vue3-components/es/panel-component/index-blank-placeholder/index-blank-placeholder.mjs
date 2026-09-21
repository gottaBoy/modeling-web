import { isVNode, defineComponent, createVNode, resolveComponent, computed } from 'vue';
import { useNamespace, useSemanticNode, onRouteChange } from '@ibiz-template/vue3-util';
import './index-blank-placeholder.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IndexBlankPlaceholder = /* @__PURE__ */ defineComponent({
  name: "IBizIndexBlankPlaceholder",
  props: {
    /**
     * @description 空白占位模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 空白占位控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("index-blank-placeholder");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    if (c.routeDepth) {
      onRouteChange((args) => {
        c.setVisible(!args.currentKey);
      }, c.routeDepth + 1);
    }
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
        "layoutPos": props.modelData.layoutPos,
        "state": props.controller.state,
        "class": this.semanticClass("item", {
          props
        }),
        "style": this.semanticStyle("item", {
          props
        })
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

export { IndexBlankPlaceholder };
