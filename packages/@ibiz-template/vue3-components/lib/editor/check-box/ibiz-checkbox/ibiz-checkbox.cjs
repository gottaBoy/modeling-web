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
    var _a, _b;
    const ns = vue3Util.useNamespace("checkbox");
    const c = props.controller;
    const editorModel = c.model;
    let selectValue = 1;
    let nullValue = 0;
    if ((_a = editorModel.editorParams) == null ? void 0 : _a.selectValue) {
      selectValue = editorModel.editorParams.selectValue;
    }
    if ((_b = editorModel.editorParams) == null ? void 0 : _b.nullValue) {
      nullValue = editorModel.editorParams.nullValue;
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
      editorModel,
      currentVal,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [vue.createVNode(vue.resolveComponent("el-checkbox"), vue.mergeProps({
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.disabled || this.readonly
    }, this.$attrs), null)]);
  }
});

exports.IBizCheckbox = IBizCheckbox;
