import { defineComponent, createVNode, inject } from 'vue';
import '../../use/index.mjs';
import './panel-ctrl-pos.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';
import { useSemanticNode } from '../../use/use-semantic-node/use-semantic-node.mjs';

"use strict";
const PanelCtrlPos = /* @__PURE__ */ defineComponent({
  name: "IBizPanelCtrlPos",
  props: {
    /**
     * @description 面板部件占位模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 面板部件占位控制器
     */
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-ctrl-pos");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller);
    const ctx = inject("ctx");
    ctx.evt.on("onRegister", (name, c) => {
      if (name === props.modelData.id) {
        props.controller.bindControl(c);
      }
    });
    return {
      ns,
      semanticClass,
      semanticStyle
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
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("root"), ...this.controller.containerClass, this.ns.is("hidden", !state.visible)],
      "style": this.semanticStyle("root")
    }, [content || (ibiz.env.dev ? ibiz.i18n.t("vue3Util.panelComponent.noProvidedSlot", {
      id: this.modelData.id
    }) : "")]);
  }
});

export { PanelCtrlPos };
