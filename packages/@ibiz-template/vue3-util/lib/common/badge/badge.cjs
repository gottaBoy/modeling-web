'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./badge.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizBadge = /* @__PURE__ */ vue.defineComponent({
  name: "IBizBadge",
  props: {
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: "danger"
    },
    max: {
      type: Number,
      default: 99
    },
    counterMode: {
      type: Number
    }
  },
  setup() {
    const ns = namespace.useNamespace("badge");
    return {
      ns
    };
  },
  render() {
    if (!this.value && this.value !== 0) {
      return;
    }
    if (this.counterMode === 1 && this.value <= 0) {
      return;
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.type)]
    }, [this.value > this.max ? "".concat(this.max, "+") : this.value]);
  }
});

exports.IBizBadge = IBizBadge;
