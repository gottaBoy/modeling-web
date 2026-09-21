import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getDatePickerProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-date-picker.css';
import dayjs from 'dayjs';

"use strict";
const IBizDatePicker = /* @__PURE__ */ defineComponent({
  name: "IBizDatePicker",
  props: getDatePickerProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("date-picker");
    const c = props.controller;
    const editorModel = c.model;
    const type = ref("date");
    const format = ref("YYYY-MM-DD");
    const isTimePicker = ref(false);
    const isEditable = ref(false);
    const editorRef = ref();
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    switch (editorModel.editorType) {
      case "DATEPICKEREX":
      case "DATEPICKEREX_NOTIME":
        type.value = "date";
        break;
      case "DATEPICKEREX_NODAY":
      case "DATEPICKEREX_NODAY_NOSECOND":
        isTimePicker.value = true;
        type.value = "time";
        break;
      case "DATEPICKEREX_HOUR":
      case "DATEPICKEREX_MINUTE":
      case "DATEPICKEREX_SECOND":
      case "DATEPICKEREX_NOSECOND":
      case "DATEPICKER":
      default:
        type.value = "datetime";
    }
    const valueFormat = c.valueFormat;
    if (valueFormat) {
      format.value = valueFormat;
    }
    const formatValue = ref();
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        const formatVal = dayjs(newVal).format(valueFormat);
        if (formatVal !== "Invalid Date") {
          formatValue.value = formatVal;
        } else {
          formatValue.value = newVal;
        }
      } else if (newVal == null) {
        formatValue.value = newVal;
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
    const handleChange = (date, _dateType) => {
      emit("change", date);
      setEditable(false);
    };
    watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const onBlur = (e) => {
      emit("blur", e);
      setEditable(false);
    };
    watch(formatValue, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit("infoTextChange", newVal);
      }
    }, {
      immediate: true
    });
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    return {
      ns,
      c,
      editorModel,
      type,
      format,
      formatValue,
      handleChange,
      editorRef,
      isTimePicker,
      onFocus,
      onBlur,
      isEditable,
      setEditable,
      showFormDefaultContent,
      handleKeyUp
    };
  },
  render() {
    const editContent = this.isTimePicker ? createVNode(resolveComponent("el-time-picker"), mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input")],
      "type": this.type,
      "format": this.format,
      "value-format": this.format,
      "placeholder": this.c.placeHolder,
      "modelValue": this.formatValue,
      "onUpdate:modelValue": ($event) => this.formatValue = $event,
      "onChange": this.handleChange,
      "disabled": this.disabled,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur
    }, this.$attrs), null) : createVNode(resolveComponent("el-date-picker"), mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input")],
      "type": this.type,
      "format": this.format,
      "value-format": this.format,
      "placeholder": this.c.placeHolder,
      "modelValue": this.formatValue,
      "onUpdate:modelValue": ($event) => this.formatValue = $event,
      "onChange": this.handleChange,
      "disabled": this.disabled,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur
    }, this.$attrs), null);
    const readonlyContent = this.formatValue;
    const formDefaultContent = createVNode("div", {
      "class": this.ns.b("form-default-content")
    }, [this.formatValue ? this.formatValue : ibiz.config.common.emptyText]);
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.e(this.editorModel.editorType), this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "onKeyup": this.handleKeyUp
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]);
  }
});

export { IBizDatePicker };
