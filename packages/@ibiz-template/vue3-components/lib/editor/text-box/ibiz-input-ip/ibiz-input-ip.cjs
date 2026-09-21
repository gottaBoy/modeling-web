'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-input-ip.css');

"use strict";
const IBizInputIP = /* @__PURE__ */ vue.defineComponent({
  name: "IBizInputIP",
  props: vue3Util.getInputIpProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("input-ip");
    const c = props.controller;
    const editorRef = vue.ref();
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const currentVal = vue.ref([]);
    const activeElement = vue.ref(false);
    const isAllBlur = vue.ref(false);
    const firstIp = vue.ref("");
    const secIp = vue.ref("");
    const thirdIp = vue.ref("");
    const forIp = vue.ref("");
    if (props.value) {
      const ipArr = props.value.split(".");
      currentVal.value = ipArr;
      firstIp.value = currentVal.value[0];
      secIp.value = currentVal.value[1];
      thirdIp.value = currentVal.value[2];
      forIp.value = currentVal.value[3];
    }
    const checkIpVal = (newVal, oldVal, ip, index) => {
      if (newVal === "")
        return;
      const reg = /^(([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))$/g;
      if (reg.test(newVal)) {
        currentVal.value[index] = newVal;
      } else if (ip) {
        ibiz.message.warning(ibiz.i18n.t("editor.textBox.warningMessage", {
          num: index + 1
        }));
        ip.value = oldVal;
        currentVal.value[index] = oldVal;
      }
      if (firstIp.value && secIp.value && thirdIp.value && forIp.value) {
        emit("change", "".concat(firstIp.value, ".").concat(secIp.value, ".").concat(thirdIp.value, ".").concat(forIp.value));
      }
    };
    vue.watch(firstIp, (newVal, oldVal) => {
      checkIpVal(newVal, oldVal, firstIp, 0);
    });
    vue.watch(secIp, (newVal, oldVal) => {
      checkIpVal(newVal, oldVal, secIp, 1);
    });
    vue.watch(thirdIp, (newVal, oldVal) => {
      checkIpVal(newVal, oldVal, thirdIp, 2);
    });
    vue.watch(forIp, (newVal, oldVal) => {
      checkIpVal(newVal, oldVal, forIp, 3);
    });
    vue.watch(editorRef, (newVal) => {
      if (props.autoFocus && newVal) {
        const input = newVal.$el.getElementsByTagName("input")[0];
        input.focus();
      }
    });
    const getFocus = () => {
      activeElement.value = true;
      if (isAllBlur.value) {
        isAllBlur.value = false;
        emit("focus");
      }
    };
    const blur = () => {
      activeElement.value = false;
      setTimeout(() => {
        if (!activeElement.value) {
          isAllBlur.value = true;
          emit("blur");
        }
      }, 0);
    };
    const handleKeyUp = (e) => {
      if (e && e.code === "Enter") {
        emit("enter", e);
      }
    };
    return {
      ns,
      c,
      editorRef,
      currentVal,
      getFocus,
      blur,
      firstIp,
      secIp,
      thirdIp,
      forIp,
      showFormDefaultContent,
      handleKeyUp
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)]
    }, [vue.createVNode(vue.resolveComponent("el-input"), {
      "ref": "editorRef",
      "type": "text",
      "size": "small",
      "disabled": this.disabled,
      "readonly": this.readonly,
      "onFocus": this.getFocus,
      "onBlur": this.blur,
      "onKeyup": this.handleKeyUp,
      "maxlength": 3,
      "modelValue": this.firstIp,
      "onUpdate:modelValue": ($event) => this.firstIp = $event
    }, null), vue.createTextVNode("."), vue.createVNode(vue.resolveComponent("el-input"), {
      "type": "text",
      "size": "small",
      "disabled": this.disabled,
      "readonly": this.readonly,
      "onFocus": this.getFocus,
      "onBlur": this.blur,
      "onKeyup": this.handleKeyUp,
      "maxlength": 3,
      "modelValue": this.secIp,
      "onUpdate:modelValue": ($event) => this.secIp = $event
    }, null), vue.createTextVNode("."), vue.createVNode(vue.resolveComponent("el-input"), {
      "type": "text",
      "size": "small",
      "disabled": this.disabled,
      "readonly": this.readonly,
      "onFocus": this.getFocus,
      "onBlur": this.blur,
      "onKeyup": this.handleKeyUp,
      "maxlength": 3,
      "modelValue": this.thirdIp,
      "onUpdate:modelValue": ($event) => this.thirdIp = $event
    }, null), vue.createTextVNode("."), vue.createVNode(vue.resolveComponent("el-input"), {
      "type": "text",
      "size": "small",
      "disabled": this.disabled,
      "readonly": this.readonly,
      "onFocus": this.getFocus,
      "onBlur": this.blur,
      "onKeyup": this.handleKeyUp,
      "maxlength": 3,
      "modelValue": this.forIp,
      "onUpdate:modelValue": ($event) => this.forIp = $event
    }, null)]);
  }
});

exports.IBizInputIP = IBizInputIP;
