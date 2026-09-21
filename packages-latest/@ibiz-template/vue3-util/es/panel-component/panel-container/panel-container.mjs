import { isVNode, defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, resolveDirective, computed } from 'vue';
import { PanelContainerController } from '@ibiz-template/runtime';
import '../../use/index.mjs';
import './panel-container.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelContainer = /* @__PURE__ */ defineComponent({
  name: "IBizPanelContainer",
  props: {
    /**
     * @description 面板容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板容器控制器
     */
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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible)];
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
    var _a, _b, _c;
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
    const attrs = (_c = this.$attrs) == null ? void 0 : _c.attrs;
    if (attrs && attrs.dynamictooltip) {
      const attributes = {
        ...attrs.dynamictooltip
      };
      delete attributes.content;
      return createVNode(resolveComponent("el-tooltip"), mergeProps({
        "placement": "right",
        "popper-class": this.ns.e("dynamic-tooltip")
      }, attributes), {
        default: () => {
          return createVNode("div", mergeProps({
            "class": [this.classArr, this.semanticClass("root")],
            "style": this.semanticStyle("root"),
            "onClick": () => {
              this.controller.onClick();
            }
          }, this.$attrs), [this.controller.model.cssStyle ? createVNode("style", {
            "type": "text/css"
          }, [this.controller.model.cssStyle]) : null, content]);
        },
        content: () => {
          return createVNode("div", {
            "class": [this.ns.e("dynamic-tooltip-content"), this.semanticClass("tooltip")],
            "style": this.semanticStyle("tooltip"),
            "innerHTML": attrs.dynamictooltip.content
          }, null);
        }
      });
    }
    return withDirectives(createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText,
      "onClick": (event) => this.controller.onClick(event)
    }, [this.controller.model.cssStyle ? createVNode("style", {
      "type": "text/css"
    }, [this.controller.model.cssStyle]) : null, content]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { PanelContainer };
