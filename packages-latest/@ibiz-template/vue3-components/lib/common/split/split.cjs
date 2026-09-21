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
    },
    semantic: {
      type: Object,
      default: () => ({})
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
    }, {
      immediate: true
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return vue.createVNode("div", {
      "class": this.wrapperClasses,
      "ref": "outerWrapper"
    }, [this.isHorizontal ? vue.createVNode("div", {
      "class": this.ns.m("horizontal")
    }, [vue.createVNode("div", {
      "style": [{
        width: "".concat(this.offset, "%")
      }, (_a = this.semantic.left) == null ? void 0 : _a.style],
      "class": [this.paneClasses, this.ns.bm("pane", "left"), (_b = this.semantic.left) == null ? void 0 : _b.class]
    }, [(_d = (_c = this.$slots).left) == null ? void 0 : _d.call(_c)]), vue.createVNode("div", {
      "style": [{
        left: "".concat(this.offset, "%")
      }],
      "class": [this.ns.b("trigger-con")],
      "onMousedown": (e) => this.handleMousedown(e)
    }, [((_f = (_e = this.$slots).trigger) == null ? void 0 : _f.call(_e)) || vue.createVNode(vue.resolveComponent("iBizSplitTrigger"), {
      "class": (_g = this.semantic.divider) == null ? void 0 : _g.class,
      "style": (_h = this.semantic.divider) == null ? void 0 : _h.style,
      "mode": "vertical"
    }, null)]), vue.createVNode("div", {
      "style": [{
        width: "".concat(this.anotherOffset, "%")
      }, (_i = this.semantic.right) == null ? void 0 : _i.style],
      "class": [this.paneClasses, this.ns.bm("pane", "right"), (_j = this.semantic.right) == null ? void 0 : _j.class]
    }, [(_l = (_k = this.$slots).right) == null ? void 0 : _l.call(_k)])]) : vue.createVNode("div", {
      "class": this.ns.m("vertical")
    }, [vue.createVNode("div", {
      "style": [{
        bottom: "".concat(this.anotherOffset, "%")
      }, (_m = this.semantic.top) == null ? void 0 : _m.style],
      "class": [this.paneClasses, this.ns.bm("pane", "top"), (_n = this.semantic.top) == null ? void 0 : _n.class]
    }, [(_p = (_o = this.$slots).top) == null ? void 0 : _p.call(_o)]), vue.createVNode("div", {
      "style": [{
        top: "".concat(this.offset, "%")
      }],
      "class": [this.ns.b("trigger-con")],
      "onMousedown": (e) => this.handleMousedown(e)
    }, [((_r = (_q = this.$slots).trigger) == null ? void 0 : _r.call(_q)) || vue.createVNode(vue.resolveComponent("iBizSplitTrigger"), {
      "mode": "horizontal",
      "style": (_s = this.semantic.divider) == null ? void 0 : _s.style,
      "class": (_t = this.semantic.divider) == null ? void 0 : _t.class
    }, null)]), vue.createVNode("div", {
      "style": [{
        top: "".concat(this.offset, "%")
      }, (_u = this.semantic.bottom) == null ? void 0 : _u.style],
      "class": [this.paneClasses, this.ns.bm("pane", "bottom"), (_v = this.semantic.bottom) == null ? void 0 : _v.class]
    }, [(_x = (_w = this.$slots).bottom) == null ? void 0 : _x.call(_w)])])]);
  }
});

exports.IBizSplit = IBizSplit;
