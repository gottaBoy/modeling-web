'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');
require('./ibiz-qrcode.css');

"use strict";
const IBizQrcode = /* @__PURE__ */ vue.defineComponent({
  name: "IBizQrcode",
  props: vue3Util.getRawProps(),
  emits: vue3Util.getEditorEmits(),
  setup(props, {
    attrs
  }) {
    const ns = vue3Util.useNamespace("qrcode");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller);
    const dataUrl = vue.ref("");
    vue.watch(() => props.value, async (newVal, oldVal) => {
      let text = "";
      if (newVal !== oldVal) {
        if (ramda.isNil(newVal)) {
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
    let content = vue.createVNode(vue.resolveComponent("van-icon"), {
      "class": [this.ns.e("no-img"), this.ns.e("content"), this.semanticClass("editor.content")],
      "size": this.$attrs.width || 100,
      "style": this.semanticStyle("editor.content"),
      "name": "photo-fail"
    }, null);
    if (this.dataUrl) {
      content = vue.createVNode("img", {
        "class": [this.ns.e("img"), this.ns.e("content"), this.semanticClass("editor.content")],
        "style": this.semanticStyle("editor.content"),
        "src": this.dataUrl,
        "alt": ""
      }, null);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("editor.root")],
      "style": this.semanticStyle("editor.root")
    }, [content]);
  }
});

exports.IBizQrcode = IBizQrcode;
