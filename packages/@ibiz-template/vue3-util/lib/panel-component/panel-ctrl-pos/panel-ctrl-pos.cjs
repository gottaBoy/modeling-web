'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./panel-ctrl-pos.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelCtrlPos = /* @__PURE__ */ vue.defineComponent({
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
    const ctx = vue.inject("ctx");
    ctx.evt.on("onRegister", (name, c) => {
      if (name === props.modelData.id) {
        props.controller.bindControl(c);
      }
    });
    const ns = namespace.useNamespace("panel-ctrl-pos");
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
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.m(this.modelData.id), ...this.controller.containerClass, this.ns.is("hidden", !state.visible)]
    }, [content || (ibiz.env.dev ? ibiz.i18n.t("vue3Util.panelComponent.noProvidedSlot", {
      id: this.modelData.id
    }) : "")]);
  }
});

exports.PanelCtrlPos = PanelCtrlPos;
