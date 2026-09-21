import { defineComponent, ref, watch, createVNode, resolveComponent } from 'vue';
import { getRawProps, getEditorEmits, useNamespace, useFocusAndBlur } from '@ibiz-template/vue3-util';
import './ibiz-preset-rawitem.css';

"use strict";
const IBizPresetRawitem = /* @__PURE__ */ defineComponent({
  name: "IBizPresetRawitem",
  props: getRawProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("preset-rawitem");
    const c = props.controller;
    const editorModel = c.model;
    const {
      componentRef: editorRef
    } = useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    const type = c.model.predefinedType;
    const content = ref("");
    watch(() => props.value, (newVal, oldVal) => {
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
      content = createVNode(resolveComponent("iBizRawItem"), {
        "content": this.content,
        "type": "IMAGE"
      }, null);
    } else if (this.type === "FIELD_TEXT_DYNAMIC") {
      content = createVNode(resolveComponent("iBizRawItem"), {
        "content": this.content,
        "type": "TEXT"
      }, null);
    } else {
      content = createVNode("div", null, [ibiz.i18n.t("editor.preset.ibizPresetRawitem.noSupportType", {
        type: this.type
      })]);
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.disabled ? this.ns.m("disabled") : "", this.readonly ? this.ns.m("readonly") : ""],
      "ref": "editorRef"
    }, [content]);
  }
});

export { IBizPresetRawitem };
