'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-color-picker.css');
var ibizColorMpickerCustom = require('../ibiz-color-mpicker-custom/ibiz-color-mpicker-custom.cjs');
var ibizColorMpickerDefault = require('../ibiz-color-mpicker-default/ibiz-color-mpicker-default.cjs');

"use strict";
const IBizColorPicker = /* @__PURE__ */ vue.defineComponent({
  name: "IBizColorPicker",
  props: vue3Util.getColorPickerProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    var _a, _b, _c, _d;
    const ns = vue3Util.useNamespace("color-picker");
    const c = props.controller;
    const currentVal = vue.ref("");
    const colorPicker = vue.ref(null);
    const multiple = ((_a = c.editorParams) == null ? void 0 : _a.MULTIPLE) === "true";
    const isCustom = ((_b = c.editorParams) == null ? void 0 : _b.CUSTOM) === "true";
    const type = (_c = c.editorParams) == null ? void 0 : _c.TYPE;
    const customColorList = ((_d = c.editorParams) == null ? void 0 : _d.CUSTOMCOLORLIST) || "";
    const predefineColors = vue.ref(["#000000", "#2C2C2C", "#50555C", "#ACB3BF", "#D0D3D9", "#C4C4C4", "#DADADA", "#E5E5E5", "#F0F0F0", "#F24E1E", "#E99C58", "#FFC700", "#FF4D00", "#FF00D6", "#D82E57", "#8E1DE8", "#0ACF83", "#18A0FB", "#A259FF", "#907CFF"]);
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (multiple) {
          if (!newVal) {
            if (isCustom) {
              currentVal.value = [];
            } else {
              currentVal.value = "";
            }
          } else {
            currentVal.value = newVal;
          }
        } else if (!newVal) {
          currentVal.value = "";
        } else {
          currentVal.value = newVal;
        }
      }
    }, {
      immediate: true
    });
    const handleChange = (e) => {
      emit("change", e);
    };
    const showPicker = (_e) => {
      setTimeout(() => {
        if (colorPicker.value) {
          colorPicker.value.show();
        }
      }, 200);
    };
    const contentStyle = vue.computed(() => {
      if (c.style) {
        return c.style;
      }
      return null;
    });
    const onFocus = (e) => {
      emit("focus", e);
    };
    const onBlur = (e) => {
      emit("blur", e);
    };
    const onChange = (value) => {
      emit("change", value);
    };
    return {
      ns,
      c,
      currentVal,
      predefineColors,
      contentStyle,
      colorPicker,
      multiple,
      isCustom,
      customColorList,
      type,
      handleChange,
      showPicker,
      onFocus,
      onBlur,
      showFormDefaultContent,
      onChange
    };
  },
  render() {
    var _a, _b;
    if (this.multiple) {
      if (this.isCustom) {
        return vue.createVNode(ibizColorMpickerCustom.IBizColorMPickerCustom, {
          "value": this.currentVal || [],
          "onChange": this.onChange,
          "readonly": this.readonly,
          "disabled": this.disabled,
          "defaultVal": this.controller.defaultVal
        }, null);
      }
      return vue.createVNode(ibizColorMpickerDefault.IBizColorMPickerDefault, {
        "value": this.currentVal || "",
        "type": this.type,
        "customColorList": this.customColorList,
        "readonly": this.readonly,
        "disabled": this.disabled,
        "onChange": this.onChange
      }, null);
    }
    let content = null;
    if (this.readonly) {
      content = "".concat((_a = this.currentVal) == null ? void 0 : _a.toString());
    } else {
      content = vue.createVNode("span", {
        "class": this.ns.b("content"),
        "style": this.contentStyle,
        "onClick": this.showPicker
      }, [vue.createVNode(vue.resolveComponent("el-color-picker"), vue.mergeProps({
        "ref": "colorPicker",
        "modelValue": this.currentVal,
        "onUpdate:modelValue": ($event) => this.currentVal = $event,
        "disabled": this.disabled,
        "onChange": this.handleChange,
        "onBlur": this.onBlur,
        "onFocus": this.onFocus,
        "size": "small",
        "predefine": this.predefineColors,
        "show-alpha": true
      }, this.$attrs), null), ((_b = this.c.editorParams) == null ? void 0 : _b.isHiddenText) === "true" ? null : vue.createVNode("span", {
        "class": this.ns.b("text")
      }, [this.currentVal])]);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": {
        color: this.currentVal || ""
      }
    }, [content]);
  }
});

exports.IBizColorPicker = IBizColorPicker;
