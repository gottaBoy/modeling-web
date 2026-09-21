import { defineComponent, createVNode, resolveComponent, mergeProps } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './coop-alert.css';

"use strict";
const IBizCoopAlert = /* @__PURE__ */ defineComponent({
  name: "IBizCoopAlert",
  props: {
    title: {
      type: String
    },
    type: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const ns = useNamespace("coop-alert");
    return {
      ns
    };
  },
  render() {
    if (!this.title) {
      return;
    }
    return createVNode(resolveComponent("el-alert"), mergeProps({
      "class": this.ns.b()
    }, this.$props), null);
  }
});

export { IBizCoopAlert };
