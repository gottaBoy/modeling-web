import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { SplitContainerController } from './split-container.controller.mjs';
import './split-container.css';

"use strict";
const SplitContainer = /* @__PURE__ */ defineComponent({
  name: "IBizSplitContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
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
    const classArr = computed(() => {
      let result = [ns.b(), ns.m(id)];
      result = [...result, ...props.controller.containerClass, ns.is("hidden", !props.controller.state.visible), ns.is("hidden-trigger", props.controller.state.isHiddenTrigger)];
      return result;
    });
    return {
      ns,
      classArr
    };
  },
  render() {
    var _a, _b;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return createVNode("div", {
      "class": this.classArr
    }, [createVNode(resolveComponent("iBizSplit"), {
      "modelValue": this.controller.state.splitValue,
      "onUpdate:modelValue": ($event) => this.controller.state.splitValue = $event,
      "mode": this.controller.splitMode
    }, {
      left: () => defaultSlots[0],
      right: () => defaultSlots[1],
      top: () => defaultSlots[0],
      bottom: () => defaultSlots[1]
    })]);
  }
});

export { SplitContainer };
