import { defineComponent, createVNode, resolveComponent, mergeProps, withDirectives, resolveDirective, ref, computed, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getDatePickerProps } from '@ibiz-template/vue3-util';
import dayjs from 'dayjs';
import './ibiz-date-picker.css';

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
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const editorModel = c.model;
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }, {
      class: semanticClass("editor.prefix"),
      selector: ".el-input__prefix"
    }, {
      class: semanticClass("editor.suffix"),
      selector: ".el-input__suffix"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }, {
      style: semanticStyle("editor.prefix"),
      selector: ".el-input__prefix"
    }, {
      style: semanticStyle("editor.suffix"),
      selector: ".el-input__suffix"
    }];
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
      case "MOBDATE_NOTIME":
        type.value = "date";
        break;
      case "DATEPICKEREX_NODAY":
      case "DATEPICKEREX_NODAY_NOSECOND":
      case "MOBDATE_NODAY":
      case "MOBDATE_NODAY_NOSECOND":
        isTimePicker.value = true;
        type.value = "time";
        break;
      case "DATEPICKEREX_HOUR":
      case "DATEPICKEREX_MINUTE":
      case "DATEPICKEREX_SECOND":
      case "DATEPICKEREX_NOSECOND":
      case "DATEPICKER":
      case "MOBDATE":
      case "MOBDATE_HOUR":
      case "MOBDATE_MINUTE":
      case "MOBDATE_SECOND":
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
      c,
      ns,
      type,
      format,
      editorRef,
      isEditable,
      childClass,
      childStyle,
      formatValue,
      editorModel,
      isTimePicker,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      onBlur,
      onFocus,
      handleChange,
      setEditable,
      handleKeyUp
    };
  },
  render() {
    const editContent = this.isTimePicker ? createVNode(resolveComponent("el-time-picker"), mergeProps({
      "ref": "editorRef",
      "class": [this.ns.b("input"), this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "popper-class": [this.ns.b("popper"), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup"),
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
      "class": [this.ns.b("input"), this.ns.e("content"), this.semanticClass("editor.content")],
      "popper-class": [this.ns.b("popper"), this.semanticClass("editor.popup")],
      "popper-style": this.semanticStyle("editor.popup"),
      "style": this.semanticStyle("editor.content"),
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
      "class": [this.ns.e("content"), this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.formatValue ? this.formatValue : createVNode(resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return withDirectives(createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.e(this.editorModel.editorType), this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "onKeyup": this.handleKeyUp
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[resolveDirective("child-class"), this.childClass], [resolveDirective("child-style"), this.childStyle]]);
  }
});

export { IBizDatePicker };
