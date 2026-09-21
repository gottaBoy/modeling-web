import { defineComponent, createVNode } from 'vue';
import '../../use/index.mjs';
import './badge.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const IBizBadge = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("badge");
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.type)]
    }, [this.value > this.max ? "".concat(this.max, "+") : this.value]);
  }
});

export { IBizBadge };
