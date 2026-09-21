'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-input-number.css');
var qxUtil = require('qx-util');
var lodashEs = require('lodash-es');

"use strict";
const IBizInputNumber = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInputNumber",
  props: vue3Util.getInputNumberProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("input-number");
    const enablethousands = vue.ref(false);
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    const editorModel = c.model;
    const currentVal = vue.ref(null);
    const childClass = [{
      class: semanticClass("editor.input"),
      selector: ".el-input__inner"
    }];
    const childStyle = [{
      style: semanticStyle("editor.input"),
      selector: ".el-input__inner"
    }];
    let max = Infinity;
    let min = -Infinity;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.maxvalue) {
        max = lodashEs.toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = lodashEs.toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.enablethousands) {
        enablethousands.value = JSON.parse(editorModel.editorParams.enablethousands);
      }
    }
    const isEditable = vue.ref(false);
    const editorRef = vue.ref();
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const numberconvertToStr = (num, decimalPlaces = 0) => {
      const options = {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      };
      return num == null ? void 0 : num.toLocaleString("en-US", options);
    };
    const convertToNumber = (str) => {
      const stringWithoutCommas = str.replace(/,/g, "");
      const originalNumber = parseFloat(stringWithoutCommas);
      return originalNumber;
    };
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const number = newVal != null && !Object.is(newVal, "") ? Number(newVal) : null;
        if (!enablethousands.value) {
          currentVal.value = Number.isNaN(number) ? null : number;
        } else {
          currentVal.value = Number.isNaN(number) ? null : numberconvertToStr(number, c.precision ? c.precision : 0);
        }
      }
    }, {
      immediate: true
    });
    const currentFormatVal = vue.computed(() => {
      if (!enablethousands.value) {
        if (currentVal.value || currentVal.value === 0) {
          return props.controller.formatValue(currentVal.value);
        }
      } else if (currentVal.value || currentVal.value === 0) {
        return numberconvertToStr(Number(currentVal.value), c.precision ? c.precision : 0);
      }
      return "";
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
    const handleChange = (e, eventName = "blur") => {
      if (eventName === c.triggerMode) {
        emit("change", e);
      }
    };
    vue.watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal) {
        const input = newVal.$el.getElementsByTagName("input")[0];
        input.focus();
      }
    });
    const onFocus = (e) => {
      emit("focus", e);
      setEditable(true);
    };
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };
    const debouncedOnInput = debounce((value) => {
      let data = null;
      if (typeof value === "string") {
        data = convertToNumber(value);
      }
      emit("change", data);
    }, 300);
    const onBlur = (e) => {
      emit("blur", e);
      if (enablethousands.value) {
        debouncedOnInput(currentVal.value);
      }
      setEditable(false);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    const onInput = (value) => {
      currentVal.value = value;
    };
    return {
      ns,
      c,
      max,
      min,
      editorRef,
      childClass,
      childStyle,
      currentVal,
      isEditable,
      semanticClass,
      semanticStyle,
      enablethousands,
      currentFormatVal,
      showFormDefaultContent,
      onBlur,
      onFocus,
      onInput,
      handleKeyUp,
      setEditable,
      handleChange
    };
  },
  render() {
    const {
      unitName
    } = this.c.parent;
    let content = null;
    if (this.readonly) {
      content = qxUtil.isNilOrEmpty(this.currentVal) ? "" : "".concat(this.currentFormatVal);
      if (unitName) {
        if (this.c.emptyHiddenUnit) {
          if (content) {
            content += unitName;
          }
        } else {
          content += unitName;
        }
      }
    } else {
      content = [!this.enablethousands ? vue.withDirectives(vue.createVNode(vue.resolveComponent("el-input-number"), vue.mergeProps({
        "ref": "editorRef",
        "class": [this.ns.b("input"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content"),
        "model-value": this.currentVal,
        "placeholder": this.c.placeHolder,
        "min": this.min,
        "max": this.max,
        "precision": this.c.precision,
        "disabled": this.disabled,
        "controls": false,
        "onChange": (val) => this.handleChange(val, "blur"),
        "onInput": (value) => this.handleChange(value, "input"),
        "onFocus": this.onFocus,
        "onBlur": this.onBlur,
        "onKeyup": this.handleKeyUp
      }, this.$attrs), null), [[vue.resolveDirective("child-class"), this.childClass], [vue.resolveDirective("child-style"), this.childStyle]]) : vue.createVNode(vue.resolveComponent("el-input"), vue.mergeProps({
        "ref": "editorRef",
        "class": [this.ns.b("input"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content"),
        "model-value": this.currentVal,
        "onInput": this.onInput,
        "placeholder": this.c.placeHolder,
        "disabled": this.disabled,
        "onFocus": this.onFocus,
        "onBlur": this.onBlur,
        "onKeyup": this.handleKeyUp
      }, this.$attrs), null), unitName && vue.createVNode("i", {
        "class": [this.ns.e("unit"), this.semanticClass("editor.unit")],
        "style": this.semanticStyle("editor.unit")
      }, [unitName])];
    }
    const formDefaultContent = () => {
      let unit = "";
      if (unitName) {
        if (this.c.emptyHiddenUnit) {
          if (this.currentFormatVal) {
            unit = unitName;
          }
        } else {
          unit = unitName;
        }
      }
      return vue.createVNode("div", {
        "class": [this.ns.b("form-default-content"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content")
      }, [this.currentVal || this.currentVal === 0 ? this.currentFormatVal + unit : vue.createVNode(vue.resolveComponent("iBizEditorEmptyText"), {
        "showPlaceholder": this.c.emptyShowPlaceholder,
        "placeHolder": this.c.placeHolder
      }, null)]);
    };
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent(), content]);
  }
});

exports.IBizInputNumber = IBizInputNumber;
