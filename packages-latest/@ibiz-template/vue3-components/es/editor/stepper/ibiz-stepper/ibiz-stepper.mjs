import { defineComponent, withDirectives, createVNode, resolveComponent, mergeProps, resolveDirective, ref, computed, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getStepperProps } from '@ibiz-template/vue3-util';
import { isNilOrEmpty } from 'qx-util';
import { toNumber } from 'lodash-es';
import './ibiz-stepper.css';

"use strict";
const IBizStepper = /* @__PURE__ */ defineComponent({
  name: "IBizStepper",
  props: getStepperProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("stepper");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const editorModel = c.model;
    const currentVal = ref(null);
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
        step = toNumber(editorModel.editorParams.stepvalue);
      }
      if (editorModel.editorParams.precision) {
        precision = toNumber(editorModel.editorParams.precision);
      }
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
      }
    }
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(() => props.value, (newVal, oldVal) => {
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
    const inputRef = ref();
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
      content = isNilOrEmpty(this.currentVal) ? "" : "".concat(this.currentVal);
    } else {
      content = [withDirectives(createVNode(resolveComponent("el-input-number"), mergeProps({
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
      }, this.$attrs), null), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])];
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [content]);
  }
});

export { IBizStepper };
