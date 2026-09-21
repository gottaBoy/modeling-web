'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./category-label.css');

"use strict";
const CategoryLabel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCategoryLabel",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  emits: ["select"],
  setup() {
    const ns = vue3Util.useNamespace("emoji-category-label");
    return {
      ns
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.name]);
  }
});

exports.CategoryLabel = CategoryLabel;
