'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./categories.css');
var core = require('@ibiz-template/core');

"use strict";
const Categories = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("emoji-categories");
    const onSelect = (category) => {
      emit("select", category);
    };
    return {
      ns,
      onSelect
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.categories.map((category) => {
      return vue.createVNode("div", {
        "class": [this.ns.e("category"), this.ns.is("active", category.name === this.current)],
        "onClick": () => this.onSelect(category)
      }, [vue.createVNode("span", {
        "class": this.ns.em("category", "svg"),
        "title": core.showTitle(category.label),
        "innerHTML": category.icon
      }, null)]);
    })]);
  }
});

exports.Categories = Categories;
