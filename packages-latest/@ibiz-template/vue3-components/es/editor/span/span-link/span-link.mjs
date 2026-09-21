import { defineComponent, createVNode, ref, watch, computed } from 'vue';
import { useNamespace, useSemanticNode, useFocusAndBlur, getEditorEmits, getSpanProps } from '@ibiz-template/vue3-util';
import './span-link.css';

"use strict";
const IBizSpanLink = /* @__PURE__ */ defineComponent({
  name: "IBizSpanLink",
  props: getSpanProps(),
  emits: getEditorEmits(),
  setup(props, {
    emit
  }) {
    const ns = useNamespace("span-link");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const curValue = ref("");
    watch(() => props.value, (newVal, oldVal) => {
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
    } = useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    return {
      ns,
      curValue,
      editorRef,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      openLinkView
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef",
      "style": this.semanticStyle("editor.root")
    }, [createVNode("a", {
      "class": [this.ns.e("content"), this.semanticClass("editor.content")],
      "style": this.semanticStyle("editor.content"),
      "onClick": this.openLinkView
    }, [this.curValue])]);
  }
});

export { IBizSpanLink };
