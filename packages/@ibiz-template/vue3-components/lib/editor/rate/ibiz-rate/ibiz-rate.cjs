'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var lodashEs = require('lodash-es');
require('./ibiz-rate.css');

"use strict";
const IBizRate = /* @__PURE__ */ vue.defineComponent({
  name: "IBizRate",
  props: vue3Util.getRateProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("rate");
    const currentVal = vue.ref();
    const c = props.controller;
    const editorModel = c.model;
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
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
        max = lodashEs.toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.texts) {
        texts = c.toObj(editorModel.editorParams.texts);
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
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [vue.createVNode(vue.resolveComponent("el-rate"), vue.mergeProps({
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

exports.IBizRate = IBizRate;
