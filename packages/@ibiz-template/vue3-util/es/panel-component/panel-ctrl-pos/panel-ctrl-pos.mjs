import { defineComponent, inject, createVNode } from 'vue';
import '../../use/index.mjs';
import './panel-ctrl-pos.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelCtrlPos = /* @__PURE__ */ defineComponent({
  name: "IBizPanelCtrlPos",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ctx = inject("ctx");
    ctx.evt.on("onRegister", (name, c) => {
      if (name === props.modelData.id) {
        props.controller.bindControl(c);
      }
    });
    const ns = useNamespace("panel-ctrl-pos");
    return {
      ns
    };
  },
  render() {
    const {
      state
    } = this.controller;
    let content;
    if (this.$slots.default) {
      content = this.$slots.default();
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("hidden", !state.visible)]
    }, [content || (ibiz.env.dev ? ibiz.i18n.t("vue3Util.panelComponent.noProvidedSlot", {
      id: this.modelData.id
    }) : "")]);
  }
});

export { PanelCtrlPos };
