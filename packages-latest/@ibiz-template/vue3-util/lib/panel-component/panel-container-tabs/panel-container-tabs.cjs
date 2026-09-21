'use strict';

var runtime = require('@ibiz-template/runtime');
var vue = require('vue');
require('../../use/index.cjs');
require('./panel-container-tabs.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const PanelContainerTabs = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelContainerTabs",
  props: {
    /**
     * @description 分页容器模型
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 分页容器控制器
     */
    controller: {
      type: runtime.PanelContainerController,
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
