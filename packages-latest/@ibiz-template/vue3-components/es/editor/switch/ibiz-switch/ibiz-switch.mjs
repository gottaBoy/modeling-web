import { defineComponent, createVNode, withDirectives, resolveComponent, mergeProps, resolveDirective, ref, computed, watch } from 'vue';
import { useNamespace, useSemanticNode, useAutoFocusBlur, useFocusAndBlur, getEditorEmits, getSwitchProps } from '@ibiz-template/vue3-util';
import './ibiz-switch.css';

"use strict";
const IBizSwitch = /* @__PURE__ */ defineComponent({
  name: "IBizSwitch",
  props: getSwitchProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("switch");
    const c = props.controller;
    const editorModel = c.model;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const currentVal = ref(false);
    const childClass = [{
      class: semanticClass("editor.indicator"),
      selector: ".el-switch__core"
    }, {
      class: semanticClass("editor.active.label"),
      selector: ".el-switch__label--right"
    }, {
      class: semanticClass("editor.inactive.label"),
      selector: ".el-switch__label--left"
    }];
    const childStyle = [{
      style: semanticStyle("editor.indicator"),
      selector: ".el-switch__core"
    }, {
      style: semanticStyle("editor.active.label"),
      selector: ".el-switch__label--right"
    }, {
      style: semanticStyle("editor.inactive.label"),
      selector: ".el-switch__label--left"
    }];
    let activeText = "";
    let inactiveText = "";
    let dicData = [{
      value: 0,
      label: ""
    }, {
      value: 1,
      label: ""
    }];
    if (editorModel.editorParams) {
      if (editorModel.editorParams.dicData) {
        dicData = c.toObj(editorModel.editorParams.dicData);
      }
      if (editorModel.editorParams.dicdata) {
        dicData = c.toObj(editorModel.editorParams.dicdata);
      }
    }
    if (dicData && Array.isArray(dicData)) {
      const inactiveResult = dicData.find((item) => {
        return item.value === 0;
      });
      if (inactiveResult) {
        inactiveText = inactiveResult.label;
      }
      const activeResult = dicData.find((item) => {
        return item.value === 1;
      });
      if (activeResult) {
        activeText = activeResult.label;
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
          currentVal.value = false;
        } else {
          currentVal.value = props.value == 1;
        }
      }
    }, {
      immediate: true
    });
    const curDisabled = computed(() => {
      if (props.autoFocus) {
        return false;
      }
      return props.disabled || props.readonly;
    });
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    const handleChange = (currentValue) => {
      const emitValue = currentValue === true ? 1 : 0;
      emit("change", emitValue);
      useInValueChange();
    };
    const {
      componentRef: editorRef
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      dicData,
      editorRef,
      currentVal,
      activeText,
      childClass,
      childStyle,
      curDisabled,
      inactiveText,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      handleChange
    };
  },
  render() {
    const attts = {
      ...this.$attrs,
      title: ""
    };
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef",
      "style": this.semanticStyle("editor.root")
    }, [withDirectives(createVNode(resolveComponent("el-switch"), mergeProps({
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.curDisabled,
      "activeText": this.activeText,
      "inactiveText": this.inactiveText,
      "onChange": this.handleChange
    }, attts), null), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]])]);
  }
});

export { IBizSwitch };
