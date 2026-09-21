import { defineComponent, createVNode, computed } from 'vue';
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
      type: Number
    },
    counterMode: {
      type: Number
    }
  },
  setup(props) {
    const ns = useNamespace("badge");
    const maxValue = computed(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.type), this.ns.is("mob", ibiz.env.isMob)]
    }, [this.value > this.maxValue ? "".concat(this.maxValue, "+") : this.value]);
  }
});

export { IBizBadge };
