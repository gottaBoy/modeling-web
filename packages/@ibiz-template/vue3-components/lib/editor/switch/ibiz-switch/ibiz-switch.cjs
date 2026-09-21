'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-switch.css');

"use strict";
const IBizSwitch = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSwitch",
  props: vue3Util.getSwitchProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("switch");
    const c = props.controller;
    const editorModel = c.model;
    const currentVal = vue.ref(false);
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
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(() => props.value, (newVal, oldVal) => {
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
    const curDisabled = vue.computed(() => {
      if (props.autoFocus) {
        return false;
      }
      return props.disabled || props.readonly;
    });
    const {
      useInFocusAndBlur,
      useInValueChange
    } = vue3Util.useAutoFocusBlur(props, emit);
    const handleChange = (currentValue) => {
      const emitValue = currentValue === true ? 1 : 0;
      emit("change", emitValue);
      useInValueChange();
    };
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    return {
      ns,
      currentVal,
      curDisabled,
      activeText,
      inactiveText,
      handleChange,
      dicData,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    const attts = {
      ...this.$attrs,
      title: ""
    };
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [vue.createVNode(vue.resolveComponent("el-switch"), vue.mergeProps({
      "modelValue": this.currentVal,
      "onUpdate:modelValue": ($event) => this.currentVal = $event,
      "disabled": this.curDisabled,
      "activeText": this.activeText,
      "inactiveText": this.inactiveText,
      "onChange": this.handleChange
    }, attts), null)]);
  }
});

exports.IBizSwitch = IBizSwitch;
