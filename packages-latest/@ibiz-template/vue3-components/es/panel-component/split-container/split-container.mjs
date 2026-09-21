import { defineComponent, withDirectives, createVNode, resolveComponent, resolveDirective, computed } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import { SplitContainerController } from './split-container.controller.mjs';
import './split-container.css';

"use strict";
const SplitContainer = /* @__PURE__ */ defineComponent({
  name: "IBizSplitContainer",
  props: {
    /**
     * @description 分割容器容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 分割容器控制器
     */
    controller: {
      type: SplitContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("split-container");
    const {
      id
    } = props.modelData;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("hidden-trigger", props.controller.state.isHiddenTrigger)];
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
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return withDirectives(createVNode("div", {
      "class": [this.classArr, this.semanticClass("root")],
      "style": this.semanticStyle("root"),
      "element-loading-text": this.controller.state.loadingText
    }, [createVNode(resolveComponent("iBizSplit"), {
      "modelValue": this.controller.state.splitValue,
      "onUpdate:modelValue": ($event) => this.controller.state.splitValue = $event,
      "mode": this.controller.splitMode,
      "semantic": {
        left: {
          class: this.semanticClass("left"),
          style: this.semanticStyle("left")
        },
        right: {
          class: this.semanticClass("right"),
          style: this.semanticStyle("right")
        },
        top: {
          class: this.semanticClass("top"),
          style: this.semanticStyle("top")
        },
        bottom: {
          class: this.semanticClass("bottom"),
          style: this.semanticStyle("bottom")
        },
        divider: {
          class: this.semanticClass("divider"),
          style: this.semanticStyle("divider")
        }
      }
    }, {
      left: () => defaultSlots[0],
      right: () => defaultSlots[1],
      top: () => defaultSlots[0],
      bottom: () => defaultSlots[1]
    })]), [[resolveDirective("loading"), this.controller.state.loading]]);
  }
});

export { SplitContainer };
