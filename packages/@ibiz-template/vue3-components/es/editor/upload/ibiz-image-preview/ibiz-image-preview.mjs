import { defineComponent, computed, createVNode, resolveComponent, mergeProps } from 'vue';
import { getUploadProps, getEditorEmits, useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-image-preview.css';

"use strict";
const IBizImagePreview = /* @__PURE__ */ defineComponent({
  name: "IBizImagePreview",
  props: getUploadProps(),
  emits: getEditorEmits(),
  setup(props) {
    var _a;
    const ns = useNamespace("image-preview");
    const c = props.controller;
    const result = ((_a = c.editorParams) == null ? void 0 : _a.STOPPROPAGATION) !== "false";
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
      ns,
      c,
      showFormDefaultContent,
      previewList,
      onClick
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("show-default", this.showFormDefaultContent)],
      "onClick": this.onClick
    }, [createVNode(resolveComponent("el-image"), mergeProps({
      "fit": "contain",
      "src": this.value,
      "preview-src-list": this.previewList
    }, this.$attrs), null)]);
  }
});

export { IBizImagePreview };
