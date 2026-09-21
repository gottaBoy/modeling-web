import { defineComponent, computed, createVNode, resolveComponent, mergeProps } from 'vue';
import { getCheckboxProps, getEditorEmits, useNamespace, useAutoFocusBlur, useFocusAndBlur } from '@ibiz-template/vue3-util';
import './ibiz-checkbox.css';

"use strict";
const IBizCheckbox = /* @__PURE__ */ defineComponent({
  name: "IBizCheckbox",
  props: getCheckboxProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a, _b;
    const ns = useNamespace("checkbox");
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
      editorModel,
      currentVal,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [createVNode(resolveComponent("el-checkbox"), mergeProps({
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.disabled || this.readonly
    }, this.$attrs), null)]);
  }
});

export { IBizCheckbox };
