import { defineComponent, createVNode, resolveComponent, mergeProps, computed } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useFocusAndBlur, getEditorEmits, getCheckboxProps } from '@ibiz-template/vue3-util';
import './ibiz-checkbox.css';

"use strict";
const IBizCheckbox = /* @__PURE__ */ defineComponent({
  name: "IBizCheckbox",
  props: getCheckboxProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a, _b, _c, _d;
    const ns = useNamespace("checkbox");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
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
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    const currentVal = computed({
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
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
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
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef",
      "style": this.semanticStyle("editor.root")
    }, [createVNode(resolveComponent("el-checkbox"), mergeProps({
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.disabled || this.readonly
    }, this.$attrs), null)]);
  }
});

export { IBizCheckbox };
