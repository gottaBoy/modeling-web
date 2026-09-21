'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var dayjs = require('dayjs');
require('./ibiz-date-picker.css');

"use strict";
const IBizDatePicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDatePicker",
  props: vue3Util.getDatePickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("date-picker");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
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
    const type = vue.ref("date");
    const format = vue.ref("YYYY-MM-DD");
    const isTimePicker = vue.ref(false);
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const showFormDefaultContent = vue.computed(() => {
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
    const formatValue = vue.ref();
    vue.watch(() => props.value, (newVal, oldVal) => {
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
    vue.watch(editorRef, (newVal) => {
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
    vue.watch(formatValue, (newVal, oldVal) => {
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
    const editContent = this.isTimePicker ? vue.createVNode(vue.resolveComponent("el-time-picker"), vue.mergeProps({
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
    }, this.$attrs), null) : vue.createVNode(vue.resolveComponent("el-date-picker"), vue.mergeProps({
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
    const formDefaultContent = vue.createVNode("div", {
      "class": [this.ns.e("content"), this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.formatValue ? this.formatValue : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.e(this.editorModel.editorType), this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root"),
      "onKeyup": this.handleKeyUp
    }, [this.showFormDefaultContent && formDefaultContent, this.readonly ? readonlyContent : editContent]), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]);
  }
});

exports.IBizDatePicker = IBizDatePicker;
