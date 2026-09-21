import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getStepperProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
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
    const editorModel = c.model;
    const currentVal = ref(null);
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
      content = [createVNode(resolveComponent("el-input-number"), mergeProps({
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
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)]
    }, [content]);
  }
});

export { IBizStepper };
