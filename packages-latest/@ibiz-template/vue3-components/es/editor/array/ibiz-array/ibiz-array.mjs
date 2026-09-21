import { isVNode, defineComponent, createVNode, withDirectives, resolveComponent, mergeProps, resolveDirective, ref, computed, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getArrayProps } from '@ibiz-template/vue3-util';
import { createUUID } from 'qx-util';
import { toNumber } from 'lodash-es';
import './ibiz-array.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const IBizArray = /* @__PURE__ */ defineComponent({
  name: "IBizArray",
  props: getArrayProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("array");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const editorModel = c.model;
    const getItemChildClass = (params) => {
      return [{
        class: semanticClass("editor.item.input", params),
        selector: ".el-input__inner"
      }, {
        class: semanticClass("editor.item.add", params),
        selector: ".".concat(ns.b("add-icon"))
      }, {
        class: semanticClass("editor.item.remove", params),
        selector: ".".concat(ns.b("remove-icon"))
      }, {
        class: semanticClass("editor.item.prefix", params),
        selector: ".el-input__prefix"
      }, {
        class: semanticClass("editor.item.suffix", params),
        selector: ".el-input__suffix"
      }];
    };
    const getItemChildStyle = (params) => {
      return [{
        style: semanticStyle("editor.item.input", params),
        selector: ".el-input__inner"
      }, {
        style: semanticStyle("editor.item.add", params),
        selector: ".".concat(ns.b("add-icon"))
      }, {
        style: semanticStyle("editor.item.remove", params),
        selector: ".".concat(ns.b("remove-icon"))
      }, {
        style: semanticStyle("editor.item.prefix", params),
        selector: ".el-input__prefix"
      }, {
        style: semanticStyle("editor.item.suffix", params),
        selector: ".el-input__suffix"
      }];
    };
    let editorStyle = "default";
    let size = "default";
    let limit = 0;
    let maxLength;
    let showWordLimit = false;
    let prepend = "";
    let append = "";
    let target = "_blank";
    const items = ref([]);
    if (editorModel.editorParams) {
      if (editorModel.editorParams.editorStyle) {
        editorStyle = editorModel.editorParams.editorStyle;
      }
      if (editorModel.editorParams.editorstyle) {
        editorStyle = editorModel.editorParams.editorstyle;
      }
      if (editorModel.editorParams.size) {
        size = editorModel.editorParams.size;
      }
      if (editorModel.editorParams.limit) {
        limit = toNumber(editorModel.editorParams.limit);
      }
      if (editorModel.editorParams.maxLength) {
        maxLength = toNumber(editorModel.editorParams.maxLength);
      }
      if (editorModel.editorParams.maxlength) {
        maxLength = toNumber(editorModel.editorParams.maxlength);
      }
      if (editorModel.editorParams.showWordLimit) {
        showWordLimit = c.toBoolean(editorModel.editorParams.showWordLimit);
      }
      if (editorModel.editorParams.showwordlimit) {
        showWordLimit = c.toBoolean(editorModel.editorParams.showwordlimit);
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
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    watch(() => props.value, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        if (items.value.length === 0) {
          const tempItems = newVal.map((value) => {
            return {
              value,
              key: createUUID()
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
        key: createUUID(),
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
      c,
      ns,
      type,
      size,
      limit,
      items,
      append,
      target,
      prepend,
      maxLength,
      editorStyle,
      semanticClass,
      semanticStyle,
      showWordLimit,
      showFormDefaultContent,
      getUrl,
      onBlur,
      onFocus,
      addItem,
      removeItem,
      handleKeyUp,
      handleInput,
      handleChange,
      getItemChildClass,
      getItemChildStyle
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "style": this.semanticStyle("editor.root")
    }, [this.items.length === 0 ? createVNode("ion-icon", {
      "name": "add-outline",
      "onClick": this.addItem,
      "class": [this.ns.b("add-icon"), this.semanticClass("editor.item.add")],
      "style": this.semanticStyle("editor.item.add")
    }, null) : this.items.map((item, index) => {
      return withDirectives(createVNode("div", {
        "key": item.key,
        "class": [this.ns.b("item"), this.semanticClass("editor.item")],
        "style": this.semanticStyle("editor.item")
      }, [this.editorStyle === "default" ? createVNode(resolveComponent("el-input"), mergeProps({
        "type": this.type,
        "size": this.size,
        "modelValue": item.value,
        "onUpdate:modelValue": ($event) => item.value = $event,
        "placeholder": this.c.placeHolder,
        "disabled": this.disabled,
        "readonly": this.readonly,
        "onBlur": this.onBlur,
        "onFocus": this.onFocus,
        "onKeyup": this.handleKeyUp,
        "onChange": (val) => this.handleChange(val, index),
        "onInput": (val) => this.handleInput(val, index)
      }, this.$attrs), null) : createVNode(resolveComponent("el-tooltip"), {
        "trigger": "hover",
        "placement": "bottom",
        "popper-class": [this.ns.b("tooltip"), this.semanticClass("editor.item.popup", {
          item
        })],
        "popper-style": this.semanticStyle("editor.popup.item", {
          item
        })
      }, {
        default: () => {
          return createVNode(resolveComponent("el-input"), mergeProps({
            "type": this.type,
            "size": this.size,
            "modelValue": item.value,
            "onUpdate:modelValue": ($event) => item.value = $event,
            "placeholder": this.c.placeHolder,
            "disabled": this.disabled,
            "readonly": this.readonly,
            "maxlength": Object.is(this.editorStyle, "url") ? this.maxLength : null,
            "show-word-limit": Object.is(this.editorStyle, "url") ? this.showWordLimit : null,
            "onBlur": this.onBlur,
            "onFocus": this.onFocus,
            "onChange": (val) => this.handleChange(val, index),
            "onInput": (val) => this.handleInput(val, index),
            "onKeyup": this.handleKeyUp
          }, this.$attrs), {
            prefix: () => {
              if (Object.is(this.editorStyle, "url") && this.prepend)
                return this.prepend;
              return null;
            },
            suffix: () => {
              if (Object.is(this.editorStyle, "url") && this.append)
                return this.append;
              return null;
            }
          });
        },
        content: () => {
          let _slot;
          if (this.editorStyle === "img")
            return createVNode(resolveComponent("el-image"), {
              "fit": "contain",
              "src": item.value,
              "class": [this.ns.be("tooltip", "content"), this.semanticClass("editor.item.tooltip", {
                item
              })],
              "style": this.semanticStyle("editor.item.tooltip", {
                item
              })
            }, null);
          return createVNode(resolveComponent("el-link"), {
            "target": this.target,
            "href": this.getUrl(item.value),
            "class": [this.ns.be("tooltip", "content"), this.semanticClass("editor.item.tooltip", {
              item
            })],
            "style": this.semanticStyle("editor.item.tooltip", {
              item
            })
          }, _isSlot(_slot = this.getUrl(item.value)) ? _slot : {
            default: () => [_slot]
          });
        }
      }), !(this.disabled || this.readonly) && createVNode("div", {
        "class": this.ns.b("icons")
      }, [(!this.limit || this.items.length < this.limit) && createVNode("ion-icon", {
        "name": "add",
        "class": [this.ns.b("add-icon"), this.semanticClass("editor.add")],
        "style": this.semanticStyle("editor.add"),
        "onClick": () => this.addItem(index + 1)
      }, null), createVNode("ion-icon", {
        "name": "remove",
        "class": [this.ns.b("remove-icon"), this.semanticClass("editor.remove")],
        "style": this.semanticStyle("editor.remove"),
        "onClick": () => this.removeItem(index)
      }, null)])]), [[resolveDirective("child-class"), this.getItemChildClass({
        item,
        index
      })], [resolveDirective("child-style"), this.getItemChildStyle({
        item,
        index
      })]]);
    })]);
  }
});

export { IBizArray };
