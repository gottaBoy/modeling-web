'use strict';

var vue = require('vue');
require('../../use/index.cjs');
require('./panel-container-tabs.css');
var panelContainer_controller = require('../panel-container/panel-container.controller.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelContainerTabs = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelContainerTabs",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelContainer_controller.PanelContainerController,
      required: true
    }
  },
  setup() {
    const ns = namespace.useNamespace("panel-container-tabs");
    return {
      ns
    };
  },
  render() {
    return vue.h(vue.resolveComponent("IBizPanelContainer"), {
      ...this.$props,
      ...this.$attrs,
      class: this.ns.b()
    }, this.$slots);
  }
});

exports.PanelContainerTabs = PanelContainerTabs;
