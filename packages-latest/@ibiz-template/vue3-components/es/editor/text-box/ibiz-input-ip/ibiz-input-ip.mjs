import { defineComponent, createVNode, resolveComponent, createTextVNode, computed, ref, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getInputIpProps } from '@ibiz-template/vue3-util';
import './ibiz-input-ip.css';

"use strict";
const IBizInputIP = /* @__PURE__ */ defineComponent({
  name: "IBizInputIP",
  props: getInputIpProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("input-ip");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const activeElement = ref(false);
    const isAllBlur = ref(false);
    const splitIp = (ip) => {
      const parts = ip.split(".");
      return [parts[0] || "", parts[1] || "", parts[2] || "", parts[3] || ""];
    };
    const joinIp = (parts) => {
      return parts.join(".");
    };
    const isValidIp = (parts) => {
      return parts.every((part) => {
        if (!part) {
          return false;
        }
        return /^(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])$/.test(part);
      });
    };
    const ipSegments = ref(splitIp(props.value || ""));
    const ipInputs = ref([]);
    const handleInput = (value, index) => {
      var _a;
      value = value.replace(/[^0-9]/g, "").slice(0, 3);
      if (value) {
        const num = parseInt(value, 10);
        if (num > 255) {
          value = "255";
        } else {
          value = "".concat(num);
        }
      }
      ipSegments.value[index] = value;
      const target = ipInputs.value[index];
      const input = target == null ? void 0 : target.input;
      if (ipSegments.value[index].length === 3 && index < 3 && input && input.selectionStart === ipSegments.value[index].length && input.selectionEnd === ipSegments.value[index].length) {
        const ipInput = ipInputs.value[index + 1];
        if (ipInput) {
          ipInput.focus();
          (_a = ipInput.input) == null ? void 0 : _a.setSelectionRange(0, ipSegments.value[index + 1].length);
        }
      }
      if (isValidIp(ipSegments.value)) {
        emit("change", joinIp(ipSegments.value));
      }
    };
    const handleKeydown = (event, index) => {
      var _a, _b, _c, _d, _e;
      if (event.key === "Enter") {
        emit("enter", event);
        return;
      }
      if (/^[0-9]$/.test(event.key)) {
        const input = event.target;
        if (input && ipSegments.value[index].length === 3 && input.selectionStart === input.selectionEnd) {
          event.preventDefault();
          if (index < 3 && input.selectionEnd === ipSegments.value[index].length) {
            const nextIndex = index + 1;
            const nextInput = ipInputs.value[nextIndex];
            if (nextInput) {
              nextInput.focus();
              (_a = nextInput.input) == null ? void 0 : _a.setSelectionRange(0, ipSegments.value[nextIndex].length);
            }
          }
        }
        return;
      }
      if (event.key === ".") {
        event.preventDefault();
        const input = event.target;
        if (input && index < 3 && input.selectionStart === input.selectionEnd && input.selectionEnd !== 0 && ipSegments.value[index].length) {
          const nextIndex = index + 1;
          const nextInput = ipInputs.value[nextIndex];
          if (nextInput) {
            nextInput.focus();
            (_b = nextInput.input) == null ? void 0 : _b.setSelectionRange(0, ipSegments.value[nextIndex].length);
          }
        }
        return;
      }
      if (event.key === "Backspace") {
        const input = event.target;
        if (input && index > 0 && input.selectionStart === 0 && input.selectionEnd === 0) {
          event.preventDefault();
          const prevIndex = index - 1;
          const prevValue = ipSegments.value[prevIndex];
          const prevInput = ipInputs.value[prevIndex];
          if (prevValue.length > 0) {
            ipSegments.value[prevIndex] = prevValue.slice(0, -1);
          }
          if (prevInput) {
            prevInput.focus();
            (_c = prevInput.input) == null ? void 0 : _c.setSelectionRange(ipSegments.value[prevIndex].length, ipSegments.value[prevIndex].length);
          }
        }
      }
      if (event.key === "ArrowLeft") {
        const input = event.target;
        if (input && index > 0 && input.selectionStart === 0 && input.selectionEnd === 0) {
          event.preventDefault();
          const prevIndex = index - 1;
          const prevInput = ipInputs.value[prevIndex];
          if (prevInput) {
            prevInput.focus();
            (_d = prevInput.input) == null ? void 0 : _d.setSelectionRange(ipSegments.value[prevIndex].length, ipSegments.value[prevIndex].length);
          }
        }
      }
      if (event.key === "ArrowRight") {
        const input = event.target;
        if (input && index < 3 && input.selectionStart === ipSegments.value[index].length && input.selectionEnd === ipSegments.value[index].length) {
          event.preventDefault();
          const nextIndex = index + 1;
          const nextInput = ipInputs.value[nextIndex];
          if (nextInput) {
            nextInput.focus();
            (_e = nextInput.input) == null ? void 0 : _e.setSelectionRange(0, 0);
          }
        }
      }
    };
    const handleFocus = () => {
      activeElement.value = true;
      if (isAllBlur.value) {
        isAllBlur.value = false;
        emit("focus");
      }
    };
    const handleBlur = () => {
      activeElement.value = false;
      setTimeout(() => {
        if (!activeElement.value) {
          isAllBlur.value = true;
          emit("blur");
        }
      }, 0);
    };
    watch(() => props.value, (newVal) => {
      ipSegments.value = splitIp(newVal || "");
    });
    watch(() => ipInputs.value[0], (input) => {
      if (props.autoFocus && input) {
        input.focus();
      }
    });
    return {
      c,
      ns,
      ipInputs,
      ipSegments,
      semanticClass,
      semanticStyle,
      activeElement,
      showFormDefaultContent,
      joinIp,
      handleBlur,
      handleInput,
      handleFocus,
      handleKeydown
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      content = this.value;
    } else {
      content = createVNode("div", {
        "class": [this.ns.b("content"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content")
      }, [this.ipSegments.map((segment, index) => {
        return [createVNode(resolveComponent("el-input"), {
          "maxlength": 4,
          "model-value": segment,
          "class": [this.ns.e("input"), this.semanticClass("editor.input")],
          "style": this.semanticStyle("editor.input"),
          "disabled": this.disabled,
          "readonly": this.readonly,
          "ref": (el) => {
            if (el) {
              this.ipInputs[index] = el;
            } else {
              this.ipInputs[index] = void 0;
            }
          },
          "onInput": (value) => this.handleInput(value, index),
          "onKeydown": (e) => this.handleKeydown(e, index),
          "onFocus": this.handleFocus,
          "onBlur": this.handleBlur
        }, null), index < 3 && createVNode("span", {
          "class": [this.ns.b("dot"), this.ns.e("separator"), this.semanticClass("editor.separator")],
          "style": this.semanticStyle("editor.separator")
        }, [createTextVNode(".")])];
      })]);
    }
    const formDefaultContent = createVNode("div", {
      "class": [this.ns.b("form-default-content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content")
    }, [this.ipSegments.some((segment) => segment) ? this.joinIp(this.ipSegments) : createVNode(resolveComponent("iBizEditorEmptyText"), {
      "showPlaceholder": this.c.emptyShowPlaceholder,
      "placeHolder": this.c.placeHolder
    }, null)]);
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("focus", this.activeElement && !this.disabled && !this.readonly)],
      "style": this.semanticStyle("editor.root")
    }, [this.showFormDefaultContent && formDefaultContent, content]);
  }
});

export { IBizInputIP };
