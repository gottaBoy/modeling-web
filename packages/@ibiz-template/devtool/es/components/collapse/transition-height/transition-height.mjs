import { ref, nextTick, onMounted, watch, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './transition-height.css';

"use strict";
const TransitionHeight = /* @__PURE__ */ defineComponent({
  name: "TransitionHeight",
  props: {
    // 布尔值show标识关闭还是展开
    show: Boolean
  },
  setup(props) {
    const ns = useNamespace("transition-height");
    const transitionWrap = ref();
    const height = ref(0);
    onMounted(() => {
      nextTick(() => {
        height.value = transitionWrap.value.offsetHeight;
        transitionWrap.value.style.height = props.show ? "".concat(height.value, "px") : 0;
      });
    });
    watch(() => props.show, (newVal) => {
      if (transitionWrap.value) {
        transitionWrap.value.style.height = newVal ? "".concat(height.value, "px") : 0;
      }
    });
    return {
      ns,
      transitionWrap,
      height
    };
  },
  render() {
    var _a, _b;
    return createVNode("div", {
      "class": this.ns.b(),
      "ref": "transitionWrap"
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]);
  }
});

export { TransitionHeight, TransitionHeight as default };
