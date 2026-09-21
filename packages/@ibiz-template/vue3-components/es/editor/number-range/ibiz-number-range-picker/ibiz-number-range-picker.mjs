import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getNumberRangeProps, getEditorEmits, useNamespace, useAutoFocusBlur, useFocusAndBlur } from '@ibiz-template/vue3-util';
import './ibiz-number-range-picker.css';
import { toNumber } from 'lodash-es';

"use strict";
const IBizNumberRangePicker = /* @__PURE__ */ defineComponent({
  name: "IBizNumberRangePicker",
  props: getNumberRangeProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("number-range-picker");
    const c = props.controller;
    const editorModel = c.model;
    const {
      useInFocusAndBlur,
      useInValueChange
    } = useAutoFocusBlur(props, emit);
    let max = Infinity;
    let min = -Infinity;
    let precision = 0;
    let valueSeparator = "-";
    const startPlaceHolder = editorModel.placeHolder ? editorModel.placeHolder.split(";")[0] || "" : "";
    const endPlaceHolder = editorModel.placeHolder ? editorModel.placeHolder.split(";")[1] || "" : "";
    let rangeSeparator = "~";
    if (editorModel.editorParams) {
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.precision) {
        precision = toNumber(editorModel.editorParams.precision);
      }
      if (editorModel.editorParams.valueSeparator) {
        valueSeparator = editorModel.editorParams.valueSeparator;
      }
      if (editorModel.editorParams.rangeSeparator) {
        rangeSeparator = editorModel.editorParams.rangeSeparator;
      }
    }
    const refFormItem = ref([]);
    const editorItems = editorModel.editorItems;
    if (editorItems && editorItems.length > 0) {
      const editorItemNames = editorItems.map((item) => item.id);
      refFormItem.value = editorItemNames;
    }
    const minValue = ref(null);
    const maxValue = ref(null);
    const isEditable = ref(false);
    const editorRef = ref();
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal && typeof newVal === "string") {
        minValue.value = newVal.split(valueSeparator)[0] ? Number(newVal.split(valueSeparator)[0]) : null;
        maxValue.value = newVal.split(valueSeparator)[1] ? Number(newVal.split(valueSeparator)[1]) : null;
      }
    }, {
      immediate: true
    });
    const setEditable = (flag) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };
    const onEmit = (eventName, value, valueName) => {
      if (eventName === c.triggerMode) {
        emit("change", value, valueName);
      }
    };
    const handleChange = (value, index, eventName = "blur") => {
      if (index === 0) {
        minValue.value = value;
      } else if (index === 1) {
        maxValue.value = value;
      }
      if (minValue.value !== null && maxValue.value !== null) {
        onEmit(eventName, [minValue.value, maxValue.value].join(valueSeparator));
        setEditable(false);
        useInValueChange();
      }
      if (refFormItem.value) {
        const valueName = refFormItem.value[index];
        onEmit(eventName, value, valueName);
        useInValueChange();
      }
    };
    const {
      componentRef
    } = useFocusAndBlur(() => emit("focus"), () => useInFocusAndBlur());
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      if (minValue.value !== null && maxValue.value !== null) {
        emit("blur", e);
        setEditable(false);
      }
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const valueText = computed(() => {
      if (typeof minValue.value === "number" && typeof maxValue.value === "number") {
        return "".concat(minValue.value).concat(rangeSeparator).concat(maxValue.value);
      }
      return null;
    });
    return {
      ns,
      c,
      refFormItem,
      minValue,
      maxValue,
      handleChange,
      max,
      min,
      precision,
      valueSeparator,
      startPlaceHolder,
      endPlaceHolder,
      rangeSeparator,
      componentRef,
      editorRef,
      handleKeyUp,
      onFocus,
      onBlur,
      valueText,
      isEditable,
      setEditable,
      showFormDefaultContent
    };
  },
  render() {
    const editContent = createVNode("div", {
      "class": this.ns.b("input")
    }, [createVNode(resolveComponent("el-input-number"), mergeProps({
      "ref": "editorRef",
      "min": this.min,
      "modelValue": this.minValue,
      "disabled": this.disabled,
      "readonly": this.readonly,
      "precision": this.controller.model.precision,
      "placeholder": this.startPlaceHolder,
      "controls": false,
      "onChange": (val) => this.handleChange(val, 0),
      "onInput": (val) => this.handleChange(val, 0, "input"),
      "onKeyup": this.handleKeyUp,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur
    }, this.$attrs), null), createVNode("div", {
      "class": this.ns.b("separator")
    }, [this.rangeSeparator]), createVNode(resolveComponent("el-input-number"), mergeProps({
      "min": typeof this.minValue === "number" ? this.minValue + 1 : -Infinity,
      "max": this.max,
      "modelValue": this.maxValue,
      "disabled": this.disabled,
      "readonly": this.readonly,
      "precision": this.controller.model.precision,
      "placeholder": this.endPlaceHolder,
      "controls": false,
      "onChange": (val) => this.handleChange(val, 1),
      "onInput": (val) => this.handleChange(val, 1, "input"),
      "onKeyup": this.handleKeyUp,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur
    }, this.$attrs), null)]);
    const readonlyContent = createVNode("div", {
      "class": (this.ns.b(), this.ns.m("readonly"))
    }, [this.valueText]);
    const formDefaultContent = createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.valueText ? [createVNode("div", {
      "class": this.ns.b("default-min")
    }, [this.minValue]), createVNode("div", {
      "class": this.ns.b("default-separator")
    }, [this.rangeSeparator]), createVNode("div", {
      "class": this.ns.b("default-max")
    }, [this.maxValue])] : ibiz.config.common.emptyText]);
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "componentRef"
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

export { IBizNumberRangePicker };
