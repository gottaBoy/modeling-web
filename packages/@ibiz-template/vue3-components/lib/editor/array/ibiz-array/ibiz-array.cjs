'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-array.css');
var qxUtil = require('qx-util');
var lodashEs = require('lodash-es');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizArray = /* @__PURE__ */ vue.defineComponent({
  name: "IBizArray",
  props: vue3Util.getArrayProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("array");
    const c = props.controller;
    const editorModel = c.model;
    let editorStyle = "default";
    let size = "default";
    let limit = 0;
    let maxLength;
    let showWordLimit = false;
    let prepend = "";
    let append = "";
    let target = "_blank";
    const items = vue.ref([]);
    if (editorModel.editorParams) {
      if (editorModel.editorParams.editorStyle) {
        editorStyle = editorModel.editorParams.editorStyle;
      }
      if (editorModel.editorParams.size) {
        size = editorModel.editorParams.size;
      }
      if (editorModel.editorParams.limit) {
        limit = lodashEs.toNumber(editorModel.editorParams.limit);
      }
      if (editorModel.editorParams.maxLength) {
        maxLength = lodashEs.toNumber(editorModel.editorParams.maxLength);
      }
      if (editorModel.editorParams.showWordLimit) {
        showWordLimit = c.toBoolean(editorModel.editorParams.showWordLimit);
      }
      if (editorModel.editorParams.prepend) {
        prepend = editorModel.editorParams.prepend;
      }
      if (editorModel.editorParams.append) {
        append = editorModel.editorParams.append;
      }
      if (editorModel.editorParams.target) {
        target = editorModel.editorParams.target;
      }
    }
    const dataType = editorModel.dataType;
    const type = Object.is(dataType, "NUMBER") || Object.is(dataType, "INTEGER") ? "number" : "text";
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        if (items.value.length === 0) {
          const tempItems = newVal.map((value) => {
            return {
              value,
              key: qxUtil.createUUID()
            };
          });
          items.value = tempItems;
        }
      }
    }, {
      immediate: true
    });
    const getUrl = (value) => {
      let tempValue = value;
      if (tempValue) {
        if (prepend) {
          tempValue = prepend + tempValue;
        }
        if (append) {
          tempValue += append;
        }
      }
      return tempValue;
    };
    const onEmit = (eventName = "blur") => {
      const result = items.value.map((item) => item.value);
      if (eventName === c.triggerMode) {
        emit("change", result);
      }
    };
    const addItem = (index) => {
      if (props.disabled || props.readonly) {
        return;
      }
      const tempLink = {
        key: qxUtil.createUUID(),
        value: null
      };
      if (index) {
        items.value.splice(index, 0, tempLink);
      } else {
        items.value.push(tempLink);
      }
      onEmit();
    };
    const removeItem = (index) => {
      items.value.splice(index, 1);
      onEmit();
    };
    const handleChange = (value, index) => {
      items.value[index].value = value;
      onEmit();
    };
    const handleInput = (value, index) => {
      items.value[index].value = value;
      onEmit("input");
    };
    const onBlur = (e) => {
      emit("blur", e);
    };
    const onFocus = (e) => {
      emit("focus", e);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    return {
      ns,
      c,
      editorStyle,
      type,
      size,
      limit,
      maxLength,
      showWordLimit,
      prepend,
      append,
      target,
      items,
      getUrl,
      addItem,
      removeItem,
      handleChange,
      handleInput,
      onBlur,
      onFocus,
      handleKeyUp,
      showFormDefaultContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)]
    }, [this.items.length === 0 ? vue.createVNode("ion-icon", {
      "class": this.ns.b("add-icon"),
      "name": "add-outline",
      "onClick": this.addItem
    }, null) : this.items.map((item, index) => {
      return vue.createVNode("div", {
        "class": this.ns.b("item"),
        "key": item.key
      }, [this.editorStyle === "default" ? vue.createVNode(vue.resolveComponent("el-input"), vue.mergeProps({
        "type": this.type,
        "size": this.size,
        "modelValue": item.value,
        "onUpdate:modelValue": ($event) => item.value = $event,
        "placeholder": this.c.placeHolder,
        "disabled": this.disabled,
        "onBlur": this.onBlur,
        "onFocus": this.onFocus,
        "onKeyup": this.handleKeyUp,
        "onChange": (val) => this.handleChange(val, index),
        "onInput": (val) => this.handleInput(val, index)
      }, this.$attrs), null) : vue.createVNode(vue.resolveComponent("el-tooltip"), {
        "placement": "bottom",
        "trigger": "hover"
      }, {
        default: () => {
          return vue.createVNode(vue.resolveComponent("el-input"), vue.mergeProps({
            "type": this.type,
            "size": this.size,
            "modelValue": item.value,
            "onUpdate:modelValue": ($event) => item.value = $event,
            "placeholder": this.c.placeHolder,
            "disabled": this.disabled,
            "maxlength": Object.is(this.editorStyle, "url") ? this.maxLength : null,
            "show-word-limit": Object.is(this.editorStyle, "url") ? this.showWordLimit : null,
            "onBlur": this.onBlur,
            "onFocus": this.onFocus,
            "onChange": (val) => this.handleChange(val, index),
            "onInput": (val) => this.handleInput(val, index),
            "onKeyup": this.handleKeyUp
          }, this.$attrs), {
            prefix: () => {
              if (Object.is(this.editorStyle, "url") && this.prepend) {
                return this.prepend;
              }
              return null;
            },
            suffix: () => {
              if (Object.is(this.editorStyle, "url") && this.append) {
                return this.append;
              }
              return null;
            }
          });
        },
        content: () => {
          let _slot;
          if (this.editorStyle === "img") {
            return vue.createVNode(vue.resolveComponent("el-image"), {
              "fit": "contain",
              "src": item.value
            }, null);
          }
          return vue.createVNode(vue.resolveComponent("el-link"), {
            "href": this.getUrl(item.value),
            "target": this.target
          }, _isSlot(_slot = this.getUrl(item.value)) ? _slot : {
            default: () => [_slot]
          });
        }
      }), !(this.disabled || this.readonly) && vue.createVNode("div", {
        "class": this.ns.b("icons")
      }, [(!this.limit || this.items.length < this.limit) && vue.createVNode("ion-icon", {
        "class": this.ns.b("add-icon"),
        "name": "add",
        "onClick": () => this.addItem(index + 1)
      }, null), vue.createVNode("ion-icon", {
        "class": this.ns.b("remove-icon"),
        "name": "remove",
        "onClick": () => this.removeItem(index)
      }, null)])]);
    })]);
  }
});

exports.IBizArray = IBizArray;
