import { computed, provide, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './devtool-collapse.css';

"use strict";
const DevToolCollapse = /* @__PURE__ */ defineComponent({
  name: "DevToolCollapse",
  props: {
    accordion: {
      type: Boolean,
      default: false
      // 默认不开启（可展开多个）
    },
    // 父组件v-model传参，子组件props中key为'value'接收，'input'事件更改
    value: {
      type: Array,
      // 手风琴模式的数组项只能有一个，反之可以有多个
      default() {
        return [];
      }
    }
  },
  emits: ["input", "change"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("devtool-collapse");
    const openArr = computed(() => {
      return props.value;
    });
    const updateVModel = (name, isOpen) => {
      const i = openArr.value.indexOf(name);
      i > -1 ? openArr.value.splice(i, 1) : openArr.value.push(name);
      emit("input", openArr.value);
      emit("change", name, isOpen);
    };
    provide("collapse", {
      updateVModel,
      openArr
    });
    return {
      ns,
      openArr,
      updateVModel
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "class": this.ns.b()
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]);
  }
});

export { DevToolCollapse, DevToolCollapse as default };
