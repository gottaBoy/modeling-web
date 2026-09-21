'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var highLightCodeUtil = require('./high-light-code-util.cjs');
require('./high-light-code.css');

"use strict";
const IBizHighLightCode = /* @__PURE__ */ vue.defineComponent({
  name: "IBizHighLightCode",
  props: {
    code: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("high-light-code");
    const highlighted = vue.computed(() => highLightCodeUtil.highlight(props.code));
    return {
      ns,
      highlighted
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "innerHTML": this.highlighted
    }, null);
  }
});

exports.IBizHighLightCode = IBizHighLightCode;
