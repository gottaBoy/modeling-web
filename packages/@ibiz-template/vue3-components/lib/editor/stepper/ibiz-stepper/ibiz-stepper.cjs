'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
require('./ibiz-stepper.css');

"use strict";
const IBizStepper = /* @__PURE__ */ vue.defineComponent({
  name: "IBizStepper",
  props: vue3Util.getStepperProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("stepper");
    const c = props.controller;
    const editorModel = c.model;
    const currentVal = vue.ref(null);
    let step = 1;
    let precision = 0;
    let max = Infinity;
    let min = -Infinity;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.stepvalue) {
        step = lodashEs.toNumber(editorModel.editorParams.stepvalue);
      }
      if (editorModel.editorParams.precision) {
        precision = lodashEs.toNumber(editorModel.editorParams.precision);
      }
      if (editorModel.editorParams.maxvalue) {
        max = lodashEs.toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = lodashEs.toNumber(editorModel.editorParams.minvalue);
      }
    }
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const number = Number(newVal);
        currentVal.value = Number.isNaN(number) ? 0 : number;
      }
    }, {
      immediate: true
    });
    const handleChange = (e) => {
      emit("change", e);
    };
    const inputRef = vue.ref();
    const onFocus = () => {
      emit("focus");
    };
    const onBlur = () => {
      emit("blur");
    };
    return {
      ns,
      c,
      currentVal,
      handleChange,
      inputRef,
      step,
      precision,
      max,
      min,
      onFocus,
      onBlur,
      showFormDefaultContent
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      content = "".concat(this.currentVal);
    } else {
      content = [vue.createVNode(vue.resolveComponent("el-input-number"), vue.mergeProps({
        "ref": "inputRef",
        "modelValue": this.currentVal,
        "onUpdate:modelValue": ($event) => this.currentVal = $event,
        "placeholder": this.c.placeHolder,
        "precision": this.precision,
        "min": this.min,
        "max": this.max,
        "step": this.step,
        "disabled": this.disabled,
        "onChange": this.handleChange,
        "onFocus": this.onFocus,
        "onBlur": this.onBlur
      }, this.$attrs), null)];
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)]
    }, [content]);
  }
});

exports.IBizStepper = IBizStepper;
