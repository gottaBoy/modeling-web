'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./ibiz-image-preview.css');

"use strict";
const IBizImagePreview = /* @__PURE__ */ vue.defineComponent({
  name: "IBizImagePreview",
  props: vue3Util.getUploadProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props) {
    var _a, _b;
    const ns = vue3Util.useNamespace("image-preview");
    const c = props.controller;
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c);
    let result = ((_a = c.editorParams) == null ? void 0 : _a.STOPPROPAGATION) !== "false";
    if ((_b = c.editorParams) == null ? void 0 : _b.stoppropagation) {
      result = c.editorParams.stoppropagation !== "false";
    }
    const showFormDefaultContent = vue.computed(() => {
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
    const previewList = vue.computed(() => {
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root"), this.ns.is("show-default", this.showFormDefaultContent)],
      "onClick": this.onClick,
      "style": this.semanticStyle("editor.root")
    }, [vue.createVNode(vue.resolveComponent("el-image"), vue.mergeProps({
      "fit": "contain",
      "src": this.value,
      "preview-src-list": this.previewList,
      "style": this.semanticStyle("editor.content"),
      "class": [this.ns.e("content"), this.semanticClass("editor.content")]
    }, this.$attrs), null)]);
  }
});

exports.IBizImagePreview = IBizImagePreview;
