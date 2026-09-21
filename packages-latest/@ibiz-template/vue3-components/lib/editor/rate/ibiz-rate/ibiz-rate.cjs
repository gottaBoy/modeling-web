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
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const editorModel = c.model;
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
    const childClass = [{
      class: semanticClass("editor.rate"),
      selector: ".el-rate__item"
    }, {
      class: semanticClass("editor.label"),
      selector: ".el-rate__text"
    }];
    const childStyle = [{
      style: semanticStyle("editor.rate"),
      selector: ".el-rate__item"
    }, {
      style: semanticStyle("editor.label"),
      selector: ".el-rate__text"
    }];
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
      if (editorModel.editorParams.showtext) {
        showText = c.toBoolean(editorModel.editorParams.showtext);
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
      max,
      texts,
      colors,
      showText,
      editorRef,
      childClass,
      childStyle,
      currentVal,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      handleChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef",
      "style": this.semanticStyle("editor.root")
    }, [vue.withDirectives(vue.createVNode(vue.resolveComponent("el-rate"), vue.mergeProps({
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.disabled || this.readonly,
      "max": this.max,
      "colors": this.colors,
      "showText": this.showText,
      "texts": this.texts,
      "onChange": this.handleChange
    }, this.$attrs), null), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]])]);
  }
});

exports.IBizRate = IBizRate;
