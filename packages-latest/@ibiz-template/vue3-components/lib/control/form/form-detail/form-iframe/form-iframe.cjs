'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
require('./form-iframe.css');

"use strict";
const FormIFrame = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormIFrame",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormIFrameController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("form-iframe");
    vue3Util.useController(c);
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(c.form);
    const loading = vue.ref(true);
    const url = vue.computed(() => {
      return c.calcIFrameUrl();
    });
    const onLoad = () => {
      loading.value = false;
    };
    return {
      ns,
      url,
      loading,
      onLoad,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    if (!this.controller.state.visible || !this.url) {
      return null;
    }
    return vue.withDirectives(vue.createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("iframe", {
        iframe: this.controller
      })],
      "style": this.semanticStyle("iframe", {
        iframe: this.controller
      })
    }, [vue.createVNode("iframe", {
      "class": this.ns.e("iframe"),
      "src": this.url,
      "frameborder": "0",
      "onLoad": () => this.onLoad(),
      "onError": () => this.onLoad()
    }, null)]), [[vue.resolveDirective("loading"), this.loading]]);
  }
});

exports.FormIFrame = FormIFrame;
exports.default = FormIFrame;
