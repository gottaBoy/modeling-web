import { PanelContainerController } from '@ibiz-template/runtime';
import { defineComponent, h, resolveComponent } from 'vue';
import '../../use/index.mjs';
import './panel-container-tabs.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const PanelContainerTabs = /* @__PURE__ */ defineComponent({
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
