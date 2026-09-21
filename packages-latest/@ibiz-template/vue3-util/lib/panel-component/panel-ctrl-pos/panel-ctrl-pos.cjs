'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./panel-ctrl-pos.css');
var namespace = require('../../use/namespace/namespace.cjs');
var useSemanticNode = require('../../use/use-semantic-node/use-semantic-node.cjs');

"use strict";
const PanelCtrlPos = /* @__PURE__ */ vue.defineComponent({
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
    const ns = namespace.useNamespace("panel-ctrl-pos");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode.useSemanticNode(props.controller);
    const ctx = vue.inject("ctx");
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), this.semanticClass("root"), ...this.controller.containerClass, this.ns.is("hidden", !state.visible)],
      "style": this.semanticStyle("root")
    }, [content || (ibiz.env.dev ? ibiz.i18n.t("vue3Util.panelComponent.noProvidedSlot", {
      id: this.modelData.id
    }) : "")]);
  }
});

exports.PanelCtrlPos = PanelCtrlPos;
