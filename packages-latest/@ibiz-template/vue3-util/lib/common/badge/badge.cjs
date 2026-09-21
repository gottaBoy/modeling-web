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
      type: Number
    },
    counterMode: {
      type: Number
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("badge");
    const maxValue = vue.computed(() => {
      if (props.max) {
        return props.max;
      }
      return ibiz.config.common.counterMaxValue;
    });
    return {
      ns,
      maxValue
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
      "class": [this.ns.b(), this.ns.m(this.type), this.ns.is("mob", ibiz.env.isMob)]
    }, [this.value > this.maxValue ? "".concat(this.maxValue, "+") : this.value]);
  }
});

exports.IBizBadge = IBizBadge;
