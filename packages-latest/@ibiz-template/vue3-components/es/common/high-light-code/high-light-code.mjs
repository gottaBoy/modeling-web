import { defineComponent, createVNode, computed } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { highlight } from './high-light-code-util.mjs';
import './high-light-code.css';

"use strict";
const IBizHighLightCode = /* @__PURE__ */ defineComponent({
  name: "IBizHighLightCode",
  props: {
    code: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("high-light-code");
    const highlighted = computed(() => highlight(props.code));
    return {
      ns,
      highlighted
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b(),
      "innerHTML": this.highlighted
    }, null);
  }
});

export { IBizHighLightCode };
