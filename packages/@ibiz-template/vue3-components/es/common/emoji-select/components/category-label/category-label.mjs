import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './category-label.css';

"use strict";
const CategoryLabel = /* @__PURE__ */ defineComponent({
  name: "IBizCategoryLabel",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  emits: ["select"],
  setup() {
    const ns = useNamespace("emoji-category-label");
    return {
      ns
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.name]);
  }
});

export { CategoryLabel };
