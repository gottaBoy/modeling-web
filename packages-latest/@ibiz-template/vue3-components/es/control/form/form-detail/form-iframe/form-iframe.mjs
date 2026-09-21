import { defineComponent, withDirectives, createVNode, resolveDirective, ref, computed } from 'vue';
import { useNamespace, useController, useSemanticNode } from '@ibiz-template/vue3-util';
import { FormIFrameController } from '@ibiz-template/runtime';
import './form-iframe.css';

"use strict";
const FormIFrame = /* @__PURE__ */ defineComponent({
  name: "IBizFormIFrame",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: FormIFrameController,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("form-iframe");
    useController(c);
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c.form);
    const loading = ref(true);
    const url = computed(() => {
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
    return withDirectives(createVNode("div", {
      "class": [this.ns.b(), this.semanticClass("iframe", {
        iframe: this.controller
      })],
      "style": this.semanticStyle("iframe", {
        iframe: this.controller
      })
    }, [createVNode("iframe", {
      "class": this.ns.e("iframe"),
      "src": this.url,
      "frameborder": "0",
      "onLoad": () => this.onLoad(),
      "onError": () => this.onLoad()
    }, null)]), [[resolveDirective("loading"), this.loading]]);
  }
});

export { FormIFrame, FormIFrame as default };
