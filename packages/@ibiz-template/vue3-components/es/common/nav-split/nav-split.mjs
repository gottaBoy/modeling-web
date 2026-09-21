import { defineComponent, ref, computed, nextTick, watch, onMounted, onBeforeUnmount, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './nav-split.css';

"use strict";
const IBizNavSplit = /* @__PURE__ */ defineComponent({
  name: "IBizNavSplit",
  props: {
    modelValue: {
      type: [Number, String],
      default: 0.5
    },
    mode: {
      validator: (value) => {
        return ["horizontal", "vertical"].includes(value);
      },
      default: "horizontal"
    },
    min: {
      type: [Number, String],
      default: 0.2
    },
    max: {
      type: [Number, String],
      default: 0.8
    }
  },
  emits: ["update:modelValue", "on-move-start", "on-moving", "on-move-end"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("nav-split");
    const outerWrapper = ref(null);
    const offset = ref(0);
    const oldOffset = ref(0);
    const isMoving = ref(false);
    const computedMin = ref(0);
    const computedMax = ref(0);
    const currentValue = ref(0.5);
    const initOffset = ref(0);
    const wrapperClasses = computed(() => [ns.b("wrapper"), ns.is("no-select", isMoving.value)]);
    const paneClasses = computed(() => [ns.b("pane"), isMoving.value ? ns.bm("pane", "moving") : ""]);
    const isHorizontal = computed(() => props.mode === "horizontal");
    const anotherOffset = computed(() => 100 - offset.value);
    const valueIsPx = computed(() => typeof props.modelValue === "string");
    const offsetSize = computed(() => isHorizontal.value ? "offsetWidth" : "offsetHeight");
    const px2percent = (numerator, denominator) => {
      return parseFloat(numerator) / parseFloat(denominator);
    };
    const getComputedThresholdValue = (type) => {
      const size = outerWrapper.value[offsetSize.value];
      if (valueIsPx.value) {
        return typeof props[type] === "string" ? props[type] : size * props[type];
      }
      return typeof props[type] === "string" ? px2percent(props[type], size) : props[type];
    };
    const getMax = (value1, value2) => {
      if (valueIsPx.value)
        return "".concat(Math.max(parseFloat(value1), parseFloat(value2)), "px");
      return Math.max(value1, value2);
    };
    const getMin = (value1, value2) => {
      if (valueIsPx.value)
        return "".concat(Math.min(parseFloat(value1), parseFloat(value2)), "px");
      return Math.min(value1, value2);
    };
    const getAnotherOffset = (value) => {
      let res = 0;
      if (valueIsPx.value)
        res = "".concat(outerWrapper.value[offsetSize.value] - parseFloat(value), "px");
      else
        res = 1 - value;
      return res;
    };
    const handleMove = (e) => {
      const pageOffset = isHorizontal.value ? e.pageX : e.pageY;
      const moveOffset = pageOffset - initOffset.value;
      const outerWidth = outerWrapper.value[offsetSize.value];
      let value = valueIsPx.value ? "".concat(parseFloat(oldOffset.value) + moveOffset, "px") : px2percent(outerWidth * oldOffset.value + moveOffset, outerWidth);
      const anotherValue = getAnotherOffset(value);
      if (parseFloat(anotherValue) > parseFloat(computedMax.value)) {
        value = getAnotherOffset(getMin(anotherValue, computedMax.value));
      }
      if (parseFloat(anotherValue) <= parseFloat(computedMin.value)) {
        value = getAnotherOffset(getMax(anotherValue, computedMin.value));
      }
      Object.assign(e, {
        atMin: props.modelValue === computedMin.value,
        atMax: valueIsPx.value ? getAnotherOffset(props.modelValue) === computedMax.value : getAnotherOffset(props.modelValue).toFixed(5) === computedMax.value.toFixed(5)
      });
      emit("update:modelValue", value);
      emit("on-moving", e);
    };
    const handleUp = () => {
      isMoving.value = false;
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      emit("on-move-end");
    };
    const handleMousedown = (e) => {
      initOffset.value = isHorizontal.value ? e.pageX : e.pageY;
      oldOffset.value = props.modelValue;
      isMoving.value = true;
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      emit("on-move-start");
    };
    const computeOffset = () => {
      nextTick(() => {
        computedMin.value = getComputedThresholdValue("min");
        computedMax.value = getComputedThresholdValue("max");
        const denominator = outerWrapper.value[offsetSize.value];
        const outerWrapperValue = parseFloat(denominator);
        const defaultValue = (valueIsPx.value ? px2percent(props.modelValue, outerWrapperValue) : props.modelValue) * 1e4 / 100;
        const reverseValue = defaultValue * 100 / 1e4 * outerWrapperValue;
        const diffValue = outerWrapperValue - reverseValue;
        const maxValue = parseFloat(computedMax.value);
        const minValue = parseFloat(computedMin.value);
        if (Math.round(diffValue) >= minValue && Math.round(diffValue) <= maxValue) {
          offset.value = defaultValue;
        } else if (Math.round(diffValue) < minValue) {
          const leftWidth = outerWrapperValue - minValue;
          offset.value = leftWidth / outerWrapperValue * 1e4 / 100;
          emit("update:modelValue", "".concat(leftWidth, "px"));
        } else {
          const leftWidth = outerWrapperValue - maxValue;
          offset.value = leftWidth / outerWrapperValue * 1e4 / 100;
          emit("update:modelValue", "".concat(leftWidth, "px"));
        }
      });
    };
    watch(() => props.modelValue, (val) => {
      if (val !== currentValue.value) {
        currentValue.value = val;
        computeOffset();
      }
    });
    onMounted(() => {
      nextTick(() => {
        computeOffset();
      });
      window.addEventListener("resize", computeOffset);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", computeOffset);
    });
    return {
      ns,
      outerWrapper,
      offset,
      wrapperClasses,
      paneClasses,
      isHorizontal,
      anotherOffset,
      handleMousedown,
      handleMove
    };
  },
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return createVNode("div", {
      "class": this.wrapperClasses,
      "ref": "outerWrapper"
    }, [this.isHorizontal ? createVNode("div", {
      "class": this.ns.m("horizontal")
    }, [createVNode("div", {
      "style": {
        width: "".concat(this.offset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "left")]
    }, [(_b = (_a = this.$slots).left) == null ? void 0 : _b.call(_a)]), createVNode("div", {
      "style": {
        left: "".concat(this.offset, "%")
      },
      "class": this.ns.b("trigger-con"),
      "onMousedown": (e) => this.handleMousedown(e)
    }, [((_d = (_c = this.$slots).trigger) == null ? void 0 : _d.call(_c)) || createVNode(resolveComponent("iBizSplitTrigger"), {
      "mode": "vertical"
    }, null)]), createVNode("div", {
      "style": {
        width: "".concat(this.anotherOffset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "right")]
    }, [(_f = (_e = this.$slots).right) == null ? void 0 : _f.call(_e)])]) : createVNode("div", {
      "class": this.ns.m("vertical")
    }, [createVNode("div", {
      "style": {
        bottom: "".concat(this.anotherOffset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "top")]
    }, [(_h = (_g = this.$slots).top) == null ? void 0 : _h.call(_g)]), createVNode("div", {
      "style": {
        top: "".concat(this.offset, "%")
      },
      "class": this.ns.b("trigger-con"),
      "onMousedown": (e) => this.handleMousedown(e)
    }, [((_j = (_i = this.$slots).trigger) == null ? void 0 : _j.call(_i)) || createVNode(resolveComponent("iBizSplitTrigger"), {
      "mode": "horizontal"
    }, null)]), createVNode("div", {
      "style": {
        top: "".concat(this.offset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "bottom")]
    }, [(_l = (_k = this.$slots).bottom) == null ? void 0 : _l.call(_k)])])]);
  }
});

export { IBizNavSplit };
