'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-preset-rawitem.css');

"use strict";
const IBizPresetRawitem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPresetRawitem",
  props: vue3Util.getRawProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("preset-rawitem");
    const c = props.controller;
    const editorModel = c.model;
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    const type = c.model.predefinedType;
    const content = vue.ref("");
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        content.value = newVal;
      }
    }, {
      immediate: true
    });
    return {
      ns,
      editorModel,
      editorRef,
      type,
      content
    };
  },
  render() {
    let content = null;
    if (this.type === "FIELD_IMAGE") {
      content = vue.createVNode(vue.resolveComponent("iBizRawItem"), {
        "content": this.content,
        "type": "IMAGE"
      }, null);
    } else if (this.type === "FIELD_TEXT_DYNAMIC") {
      content = vue.createVNode(vue.resolveComponent("iBizRawItem"), {
        "content": this.content,
        "type": "TEXT"
      }, null);
    } else {
      content = vue.createVNode("div", null, [ibiz.i18n.t("editor.preset.ibizPresetRawitem.noSupportType", {
        type: this.type
      })]);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : ""],
      "ref": "editorRef"
    }, [content]);
  }
});

exports.IBizPresetRawitem = IBizPresetRawitem;
