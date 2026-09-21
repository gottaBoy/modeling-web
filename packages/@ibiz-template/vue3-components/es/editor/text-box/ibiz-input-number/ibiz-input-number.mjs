import { defineComponent, ref, computed, watch, createVNode, resolveComponent, mergeProps } from 'vue';
import { getInputNumberProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-input-number.css';
import { isNilOrEmpty } from 'qx-util';
import { toNumber } from 'lodash-es';

"use strict";
const IBizInputNumber = /* @__PURE__ */ defineComponent({
  name: "IBizInputNumber",
  props: getInputNumberProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("input-number");
    const enablethousands = ref(false);
    const c = props.controller;
    const editorModel = c.model;
    const currentVal = ref(null);
    let max = Infinity;
    let min = -Infinity;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
      }
      if (editorModel.editorParams.enablethousands) {
        enablethousands.value = JSON.parse(editorModel.editorParams.enablethousands);
      }
    }
    const isEditable = ref(false);
    const editorRef = ref();
    const showFormDefaultContent = computed(() => {
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
      return num.toLocaleString("en-US", options);
    };
    const convertToNumber = (str) => {
      const stringWithoutCommas = str.replace(/,/g, "");
      const originalNumber = parseFloat(stringWithoutCommas);
      return originalNumber;
    };
    watch(() => props.value, (newVal, oldVal) => {
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
    const currentFormatVal = computed(() => {
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
    watch(editorRef, (newVal) => {
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
      currentVal,
      handleChange,
      onFocus,
      onBlur,
      editorRef,
      handleKeyUp,
      isEditable,
      setEditable,
      showFormDefaultContent,
      max,
      min,
      currentFormatVal,
      enablethousands,
      onInput
    };
  },
  render() {
    const {
      unitName
    } = this.c.parent;
    let content = null;
    if (this.readonly) {
      content = isNilOrEmpty(this.currentVal) ? "" : "".concat(this.currentFormatVal);
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
      content = [!this.enablethousands ? createVNode(resolveComponent("el-input-number"), mergeProps({
        "ref": "editorRef",
        "class": [this.ns.b("input")],
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
      }, this.$attrs), null) : createVNode(resolveComponent("el-input"), mergeProps({
        "ref": "editorRef",
        "class": [this.ns.b("input")],
        "model-value": this.currentVal,
        "onInput": this.onInput,
        "placeholder": this.c.placeHolder,
        "disabled": this.disabled,
        "onFocus": this.onFocus,
        "onBlur": this.onBlur,
        "onKeyup": this.handleKeyUp
      }, this.$attrs), null), unitName && createVNode("i", {
        "class": this.ns.e("unit")
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
      return createVNode("div", {
        "class": this.ns.b("form-default-content")
      }, [this.currentVal || this.currentVal === 0 ? this.currentFormatVal + unit : ibiz.config.common.emptyText]);
    };
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("editable", this.isEditable), this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.showFormDefaultContent && formDefaultContent(), content]);
  }
});

export { IBizInputNumber };
