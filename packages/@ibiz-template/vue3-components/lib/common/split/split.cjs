'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./split.css');

"use strict";
const IBizSplit = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSplit",
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
      default: "30px"
    },
    max: {
      type: [Number, String],
      default: "30px"
    }
  },
  emits: ["update:modelValue", "on-move-start", "on-moving", "on-move-end"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("split");
    const outerWrapper = vue.ref(null);
    const offset = vue.ref(0);
    const oldOffset = vue.ref(0);
    const isMoving = vue.ref(false);
    const computedMin = vue.ref(0);
    const computedMax = vue.ref(0);
    const currentValue = vue.ref(0.5);
    const initOffset = vue.ref(0);
    const wrapperClasses = vue.computed(() => [ns.b("wrapper"), ns.is("no-select", isMoving.value)]);
    const paneClasses = vue.computed(() => [ns.b("pane"), isMoving.value ? ns.bm("pane", "moving") : ""]);
    const isHorizontal = vue.computed(() => props.mode === "horizontal");
    const anotherOffset = vue.computed(() => 100 - offset.value);
    const valueIsPx = vue.computed(() => typeof props.modelValue === "string");
    const offsetSize = vue.computed(() => isHorizontal.value ? "offsetWidth" : "offsetHeight");
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
      if (parseFloat(value) <= parseFloat(computedMin.value)) {
        value = getMax(value, computedMin.value);
      }
      if (parseFloat(anotherValue) <= parseFloat(computedMax.value)) {
        value = getAnotherOffset(getMax(anotherValue, computedMax.value));
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
      vue.nextTick(() => {
        computedMin.value = getComputedThresholdValue("min");
        computedMax.value = getComputedThresholdValue("max");
        offset.value = (valueIsPx.value ? px2percent(props.modelValue, outerWrapper.value[offsetSize.value]) : props.modelValue) * 1e4 / 100;
      });
    };
    vue.watch(() => props.modelValue, (val) => {
      if (val !== currentValue.value) {
        currentValue.value = val;
        computeOffset();
      }
    });
    vue.onMounted(() => {
      vue.nextTick(() => {
        computeOffset();
      });
      window.addEventListener("resize", computeOffset);
    });
    vue.onBeforeUnmount(() => {
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
      handleMousedown
    };
  },
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return vue.createVNode("div", {
      "class": this.wrapperClasses,
      "ref": "outerWrapper"
    }, [this.isHorizontal ? vue.createVNode("div", {
      "class": this.ns.m("horizontal")
    }, [vue.createVNode("div", {
      "style": {
        width: "".concat(this.offset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "left")]
    }, [(_b = (_a = this.$slots).left) == null ? void 0 : _b.call(_a)]), vue.createVNode("div", {
      "style": {
        left: "".concat(this.offset, "%")
      },
      "class": this.ns.b("trigger-con"),
      "onMousedown": (e) => this.handleMousedown(e)
    }, [((_d = (_c = this.$slots).trigger) == null ? void 0 : _d.call(_c)) || vue.createVNode(vue.resolveComponent("iBizSplitTrigger"), {
      "mode": "vertical"
    }, null)]), vue.createVNode("div", {
      "style": {
        width: "".concat(this.anotherOffset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "right")]
    }, [(_f = (_e = this.$slots).right) == null ? void 0 : _f.call(_e)])]) : vue.createVNode("div", {
      "class": this.ns.m("vertical")
    }, [vue.createVNode("div", {
      "style": {
        bottom: "".concat(this.anotherOffset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "top")]
    }, [(_h = (_g = this.$slots).top) == null ? void 0 : _h.call(_g)]), vue.createVNode("div", {
      "style": {
        top: "".concat(this.offset, "%")
      },
      "class": this.ns.b("trigger-con"),
      "onMousedown": (e) => this.handleMousedown(e)
    }, [((_j = (_i = this.$slots).trigger) == null ? void 0 : _j.call(_i)) || vue.createVNode(vue.resolveComponent("iBizSplitTrigger"), {
      "mode": "horizontal"
    }, null)]), vue.createVNode("div", {
      "style": {
        top: "".concat(this.offset, "%")
      },
      "class": [this.paneClasses, this.ns.bm("pane", "bottom")]
    }, [(_l = (_k = this.$slots).bottom) == null ? void 0 : _l.call(_k)])])]);
  }
});

exports.IBizSplit = IBizSplit;
