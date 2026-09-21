import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getRateProps, getEditorEmits, useNamespace, useAutoFocusBlur, useFocusAndBlur } from '@ibiz-template/vue3-util';
import { toNumber } from 'lodash-es';
import './ibiz-rate.css';

"use strict";
const IBizRate = /* @__PURE__ */ defineComponent({
  name: "IBizRate",
  props: getRateProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("rate");
    const currentVal = ref();
    const c = props.controller;
    const editorModel = c.model;
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    let colors = [];
    let showText = false;
    let max = 5;
    let texts = [];
    if (editorModel.editorParams) {
      if (editorModel.editorParams.colors) {
        colors = c.toObj(editorModel.editorParams.colors);
      }
      if (editorModel.editorParams.showText) {
        showText = c.toBoolean(editorModel.editorParams.showText);
      }
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.texts) {
        texts = c.toObj(editorModel.editorParams.texts);
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
        if (!newVal) {
          currentVal.value = 0;
        } else {
          currentVal.value = newVal;
        }
      }
    }, {
      immediate: true
    });
    const handleChange = (currentValue) => {
      emit("change", currentValue);
      useInValueChange();
    };
    const {
      componentRef: editorRef
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      currentVal,
      handleChange,
      colors,
      showText,
      max,
      texts,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [createVNode(resolveComponent("el-rate"), mergeProps({
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.disabled || this.readonly,
      "max": this.max,
      "colors": this.colors,
      "showText": this.showText,
      "texts": this.texts,
      "onChange": this.handleChange
    }, this.$attrs), null)]);
  }
});

export { IBizRate };
