'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
require('./ibiz-slider.css');

"use strict";
const IBizSlider = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSlider",
  props: vue3Util.getSliderProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("slider");
    const c = props.controller;
    const editorModel = c.model;
    const {
      valueFormat
    } = c.parent;
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
    const pieStyle = vue.ref("");
    const pieSize = vue.ref(0);
    let step = 1;
    let max = 100;
    let min = 0;
    let showStops = false;
    let range = false;
    let showInput = false;
    let showText = false;
    let format = valueFormat || "0%";
    let type = "line";
    let textItem = "";
    let pieBg = "";
    let piePercentBg = "";
    if (editorModel.editorParams) {
      if (editorModel.editorParams.stepvalue) {
        step = lodashEs.toNumber(editorModel.editorParams.stepvalue);
      }
      if (editorModel.editorParams.maxvalue) {
        max = lodashEs.toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = lodashEs.toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.showstops) {
        showStops = c.toBoolean(editorModel.editorParams.showstops);
      }
      if (editorModel.editorParams.range) {
        range = c.toBoolean(editorModel.editorParams.range);
      }
      if (editorModel.editorParams.showinput) {
        showInput = c.toBoolean(editorModel.editorParams.showinput);
      }
      if (editorModel.editorParams.showText) {
        showText = c.toBoolean(editorModel.editorParams.showText);
      }
      if (editorModel.editorParams.format) {
        format = editorModel.editorParams.format;
      }
      if (editorModel.editorParams.type) {
        type = editorModel.editorParams.type;
      }
      if (editorModel.editorParams.textItem) {
        textItem = editorModel.editorParams.textItem;
      }
      if (editorModel.editorParams.pieBg) {
        pieBg = editorModel.editorParams.pieBg;
      }
      if (editorModel.editorParams.piePercentBg) {
        piePercentBg = editorModel.editorParams.piePercentBg;
      }
    }
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const handleLineVal = (val) => {
      if (range) {
        return JSON.parse(val);
      }
      return Number(val);
    };
    const handleCircleVal = (val) => {
      return Number(val) * 100;
    };
    const handleCurVal = (val) => {
      switch (type) {
        case "line":
          return handleLineVal(val);
        case "circle":
          return handleCircleVal(val);
        case "pie":
          return handleCircleVal(val);
        default:
          return val;
      }
    };
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    const caclPieWidth = () => {
      if (editorRef.value) {
        pieSize.value = Math.min(editorRef.value.clientHeight, editorRef.value.clientWidth);
      }
    };
    const caclPieStyle = () => {
      caclPieWidth();
      pieStyle.value = "";
      if (pieSize.value > 0) {
        pieStyle.value = "height:".concat(pieSize.value, "px;width:").concat(pieSize.value, "px;min-width:unset;min-height:unset;");
      }
      if (pieBg) {
        pieStyle.value += "--ibiz-editor-slider-pie-bg:".concat(pieBg, ";");
      }
      if (piePercentBg) {
        pieStyle.value += "--ibiz-editor-slider-pie-percent-bg:".concat(piePercentBg, ";");
      }
      pieStyle.value += "animation-delay:-".concat(currentVal.value, "s;");
    };
    const currentVal = vue.ref();
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (newVal === null || newVal === void 0) {
          if (range) {
            currentVal.value = [0, 1];
          } else {
            currentVal.value = 0;
          }
          if (type === "pie") {
            caclPieStyle();
          }
        } else {
          currentVal.value = handleCurVal(newVal);
          if (type === "pie") {
            caclPieStyle();
          }
        }
      }
    }, {
      immediate: true
    });
    const calcSize = () => {
      caclPieStyle();
    };
    vue.onMounted(() => {
      if (type === "pie") {
        window.addEventListener("resize", calcSize);
        vue.nextTick(() => {
          caclPieStyle();
        });
      }
    });
    vue.onBeforeUnmount(() => {
      if (type === "pie") {
        window.removeEventListener("resize", calcSize);
      }
    });
    const textVal = vue.computed(() => {
      if (textItem) {
        const data = props.data || {};
        return ibiz.util.text.format("".concat(data[textItem]), format);
      }
      const tempCurVal = Number(currentVal.value);
      const value = Number(tempCurVal / max);
      const formatValue = ibiz.util.text.format("".concat(value), format);
      return formatValue;
    });
    const handleChange = (currentValue) => {
      if (Array.isArray(currentValue)) {
        emit("change", JSON.stringify(currentValue));
      } else {
        emit("change", currentValue);
      }
      useInValueChange();
    };
    return {
      ns,
      currentVal,
      handleChange,
      step,
      max,
      min,
      type,
      textItem,
      showStops,
      range,
      showInput,
      editorRef,
      showText,
      textVal,
      showFormDefaultContent,
      pieStyle
    };
  },
  render() {
    let content;
    if (this.type === "line") {
      content = [vue.createVNode(vue.resolveComponent("el-slider"), vue.mergeProps({
        "modelValue": this.currentVal,
        "onUpdate:modelValue": ($event) => this.currentVal = $event,
        "disabled": this.disabled || this.readonly,
        "step": this.step,
        "max": this.max,
        "min": this.min,
        "showStops": this.showStops,
        "range": this.range,
        "showInput": this.showInput,
        "onChange": this.handleChange
      }, this.$attrs), null), this.showText ? vue.createVNode("span", {
        "class": [this.ns.em("text", "val")]
      }, [this.textVal]) : null];
    }
    if (this.type === "circle") {
      content = vue.createVNode(vue.resolveComponent("el-progress"), vue.mergeProps({
        "type": this.type,
        "percentage": this.currentVal
      }, this.$attrs), {
        default: (item) => {
          if (!this.showText) {
            return "";
          }
          let text = item.percentage;
          if (this.textItem) {
            text = this.textVal;
          }
          return vue.createVNode("span", {
            "class": this.ns.em("circle", "text")
          }, [text]);
        }
      });
    }
    if (this.type === "pie") {
      content = vue.createVNode("div", {
        "class": [this.ns.e("pie-content"), this.ns.is("hundred-percent", this.currentVal >= this.max)],
        "style": this.pieStyle
      }, null);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.readonly ? this.ns.m("readonly") : "", this.showText ? this.ns.e("text") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.e(this.type)],
      "ref": "editorRef"
    }, [content]);
  }
});

exports.IBizSlider = IBizSlider;
