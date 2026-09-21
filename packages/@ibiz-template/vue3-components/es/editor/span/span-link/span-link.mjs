import { defineComponent, ref, watch, computed, createVNode } from 'vue';
import { getSpanProps, getEditorEmits, useNamespace, useFocusAndBlur } from '@ibiz-template/vue3-util';
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
      openLinkView,
      curValue,
      editorRef,
      showFormDefaultContent
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent)],
      "ref": "editorRef"
    }, [createVNode("a", {
      "onClick": this.openLinkView
    }, [this.curValue])]);
  }
});

export { IBizSpanLink };
