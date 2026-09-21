'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
const GridGroupColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridGroupColumn",
  props: {
    controller: {
      type: runtime.GridGroupColumnController,
      required: true
    },
    row: {
      type: runtime.GridRowState,
      required: true
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("grid-group-column");
    return {
      ns
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, null);
  }
});

exports.GridGroupColumn = GridGroupColumn;
exports.default = GridGroupColumn;
