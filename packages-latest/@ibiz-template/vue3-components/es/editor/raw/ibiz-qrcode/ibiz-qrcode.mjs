import { defineComponent, createVNode, resolveComponent, ref, watch } from 'vue';
import { useNamespace, useSemanticNode, getEditorEmits, getRawProps } from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import './ibiz-qrcode.css';

"use strict";
const IBizQrcode = /* @__PURE__ */ defineComponent({
  name: "IBizQrcode",
  props: getRawProps(),
  emits: getEditorEmits(),
  setup(props, {
    attrs
  }) {
    const ns = useNamespace("qrcode");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const dataUrl = ref("");
    watch(() => props.value, async (newVal, oldVal) => {
      let text = "";
      if (newVal !== oldVal) {
        if (isNil(newVal)) {
          text = "";
        } else {
          text = "".concat(newVal);
        }
      }
      if (text) {
        const qrCode = ibiz.qrcodeUtil.createQrcode(text, {
          margin: 8,
          ...attrs
        });
        const element = await qrCode._getElement();
        dataUrl.value = element.toDataURL();
      }
    }, {
      immediate: true
    });
    return {
      ns,
      dataUrl,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    let content = createVNode(resolveComponent("van-icon"), {
      "class": [this.ns.e("no-img"), this.ns.e("content"), this.semanticClass("editor.content")],
      "size": this.$attrs.width || 100,
      "style": this.semanticStyle("editor.content"),
      "name": "photo-fail"
    }, null);
    if (this.dataUrl) {
      content = createVNode("img", {
        "class": [this.ns.e("img"), this.ns.e("content"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content"),
        "src": this.dataUrl,
        "alt": ""
      }, null);
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root")],
      "style": this.semanticStyle("editor.root")
    }, [content]);
  }
});

export { IBizQrcode };
