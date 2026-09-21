'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./span-link.css');

"use strict";
const IBizSpanLink = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSpanLink",
  props: vue3Util.getSpanProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("span-link");
    const c = props.controller;
    const curValue = vue.ref("");
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        curValue.value = "".concat(newVal);
      }
    }, {
      immediate: true
    });
    const openLinkView = async () => {
      await c.openLinkView(props.data);
    };
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    return {
      ns,
      openLinkView,
      curValue,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [vue.createVNode("a", {
      "onClick": this.openLinkView
    }, [this.curValue])]);
  }
});

exports.IBizSpanLink = IBizSpanLink;
