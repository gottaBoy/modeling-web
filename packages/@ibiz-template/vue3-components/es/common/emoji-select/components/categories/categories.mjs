import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './categories.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const Categories = /* @__PURE__ */ defineComponent({
  name: "IBizCategories",
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => []
    },
    current: {
      type: String,
      required: true
    }
  },
  emits: ["select"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("emoji-categories");
    const onSelect = (category) => {
      emit("select", category);
    };
    return {
      ns,
      onSelect
    };
  },
  render() {
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.categories.map((category) => {
      return createVNode("div", {
        "class": [this.ns.e("category"), this.ns.is("active", category.name === this.current)],
        "onClick": () => this.onSelect(category)
      }, [createVNode("span", {
        "class": this.ns.em("category", "svg"),
        "title": showTitle(category.label),
        "innerHTML": category.icon
      }, null)]);
    })]);
  }
});

export { Categories };
