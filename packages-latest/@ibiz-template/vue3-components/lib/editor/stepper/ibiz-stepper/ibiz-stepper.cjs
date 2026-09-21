'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
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
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const editorModel = c.model;
    const currentVal = vue.ref(null);
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.decrease"),
      selector: ".el-input-number__decrease"
    }, {
      class: semanticClass("editor.increase"),
      selector: ".el-input-number__increase"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.decrease"),
      selector: ".el-input-number__decrease"
    }, {
      style: semanticStyle("editor.increase"),
      selector: ".el-input-number__increase"
    }];
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
      c,
      ns,
      max,
      min,
      step,
      inputRef,
      precision,
      currentVal,
      childClass,
      childStyle,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      onFocus,
      onBlur,
      handleChange
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      content = qxUtil.isNilOrEmpty(this.currentVal) ? "" : "".concat(this.currentVal);
    } else {
      content = [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-input-number"), vue.mergeProps({
        "ref": "inputRef",
        "class": [this.ns.e("content"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content"),
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
      }, this.$attrs), null), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]])];
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [content]);
  }
});

exports.IBizStepper = IBizStepper;
