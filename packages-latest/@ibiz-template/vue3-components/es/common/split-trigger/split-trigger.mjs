import { defineComponent, createVNode, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './split-trigger.css';

"use strict";
const IBizSplitTrigger = /* @__PURE__ */ defineComponent({
  name: "IBizSplitTrigger",
  props: {
    mode: String
  },
  setup(prop) {
    const ns = useNamespace("split-trigger");
    const isVertical = computed(() => prop.mode === "vertical");
    const classes = computed(() => [ns.b(), isVertical.value ? ns.m("vertical") : ns.m("horizontal")]);
    const barConClasses = computed(() => [ns.b("bar-con"), isVertical.value ? ns.bm("bar-con", "vertical") : ns.bm("bar-con", "horizontal")]);
    const items = Array(8).fill(0);
    return {
      ns,
      classes,
      barConClasses,
      items
    };
  },
  render() {
    return createVNode("div", {
      "class": this.classes
    }, [createVNode("div", {
      "class": this.barConClasses
    }, [this.items.map((_item, i) => createVNode("i", {
      "class": this.ns.b("bar"),
      "key": "trigger-".concat(i)
    }, null))])]);
  }
});

export { IBizSplitTrigger };
