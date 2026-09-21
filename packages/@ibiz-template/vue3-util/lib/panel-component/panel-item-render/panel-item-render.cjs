'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var panelItemRender_controller = require('./panel-item-render.controller.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelItemRender = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelItemRender",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelItemRender_controller.PanelItemRenderController,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = namespace.useNamespace("panel-item-render");
    const nsType = namespace.useNamespace("panel-".concat((_a = props.modelData.itemType) == null ? void 0 : _a.toLowerCase()));
    const {
      id
    } = props.modelData;
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), nsType.b(), ns.is("hidden", !props.controller.state.visible)];
      return result;
    });
    const htmlCode = vue.computed(() => {
      return props.controller.getPanelItemCustomHtml(props.modelData.controlRenders, props.controller.data);
    });
    return {
      ns,
      classArr,
      htmlCode
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.classArr,
      "innerHTML": this.htmlCode
    }, null);
  }
});

exports.PanelItemRender = PanelItemRender;
