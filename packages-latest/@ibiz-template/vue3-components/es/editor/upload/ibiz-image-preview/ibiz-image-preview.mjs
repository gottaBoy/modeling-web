import { defineComponent, createVNode, resolveComponent, mergeProps, computed } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getUploadProps } from '@ibiz-template/vue3-util';
import './ibiz-image-preview.css';

"use strict";
const IBizImagePreview = /* @__PURE__ */ defineComponent({
  name: "IBizImagePreview",
  props: getUploadProps(),
  emits: getEditorEmits(),
  setup(props) {
    var _a, _b;
    const ns = useNamespace("image-preview");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    let result = ((_a = c.editorParams) == null ? void 0 : _a.STOPPROPAGATION) !== "false";
    if ((_b = c.editorParams) == null ? void 0 : _b.stoppropagation) {
      result = c.editorParams.stoppropagation !== "false";
    }
    const showFormDefaultContent = computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    const onClick = (event) => {
      if (result) {
        event.stopPropagation();
      }
    };
    const previewList = computed(() => {
      if (!result) {
        return [];
      }
      return [props.value];
    });
    return {
      c,
      ns,
      previewList,
      semanticClass,
      semanticStyle,
      showFormDefaultContent,
      onClick
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "onClick": this.onClick,
      "style": this.semanticStyle("editor.root")
    }, [createVNode(resolveComponent("el-image"), mergeProps({
      "fit": "contain",
      "src": this.value,
      "preview-src-list": this.previewList,
      "style": this.semanticStyle("editor.content"),
      "class": [this.ns.e("content"), this.semanticClass("editor.content")]
    }, this.$attrs), null)]);
  }
});

export { IBizImagePreview };
