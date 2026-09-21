'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-checkbox.css');

"use strict";
const IBizCheckbox = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCheckbox",
  props: vue3Util.getCheckboxProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a, _b, _c, _d;
    const ns = vue3Util.useNamespace("checkbox");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const editorModel = c.model;
    let selectValue = 1;
    let nullValue = 0;
    if ((_a = editorModel.editorParams) == null ? void 0 : _a.selectValue) {
      selectValue = editorModel.editorParams.selectValue;
    }
    if ((_b = editorModel.editorParams) == null ? void 0 : _b.selectvalue) {
      selectValue = editorModel.editorParams.selectvalue;
    }
    if ((_c = editorModel.editorParams) == null ? void 0 : _c.nullValue) {
      nullValue = editorModel.editorParams.nullValue;
    }
    if ((_d = editorModel.editorParams) == null ? void 0 : _d.nullvalue) {
      nullValue = editorModel.editorParams.nullvalue;
    }
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
    const currentVal = vue.computed({
      get() {
        if (props.value == selectValue) {
          return true;
        }
        return false;
      },
      set(val) {
        let value;
        if (val) {
          value = selectValue;
        } else {
          value = nullValue;
        }
        emit("change", value);
        useInValueChange();
      }
    });
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      editorRef,
      currentVal,
      editorModel,
      semanticClass,
      semanticStyle,
      showFormDefaultContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef",
      "style": this.semanticStyle("editor.root")
    }, [vue.createVNode(vue.resolveComponent("el-checkbox"), vue.mergeProps({
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.disabled || this.readonly
    }, this.$attrs), null)]);
  }
});

exports.IBizCheckbox = IBizCheckbox;
