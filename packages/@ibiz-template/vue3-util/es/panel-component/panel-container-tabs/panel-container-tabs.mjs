import { defineComponent, h, resolveComponent } from 'vue';
import '../../use/index.mjs';
import './panel-container-tabs.css';
import { PanelContainerController } from '../panel-container/panel-container.controller.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelContainerTabs = /* @__PURE__ */ defineComponent({
  name: "IBizPanelContainerTabs",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelContainerController,
      required: true
    }
  },
  setup() {
    const ns = useNamespace("panel-container-tabs");
    return {
      ns
    };
  },
  render() {
    return h(resolveComponent("IBizPanelContainer"), {
      ...this.$props,
      ...this.$attrs,
      class: this.ns.b()
    }, this.$slots);
  }
});

export { PanelContainerTabs };
