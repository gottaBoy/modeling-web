import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './user-report-panel.css';

"use strict";
const UserReportPanel = /* @__PURE__ */ defineComponent({
  name: "IBizUserReportPanel",
  props: {
    controller: {
      type: Object
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("user-report-panel");
    const generator = c && c.generator;
    return {
      c,
      ns,
      generator
    };
  },
  render() {
    if (!this.c) {
      return;
    }
    const state = this.c.state;
    return createVNode("div", {
      "class": this.ns.e("container")
    }, [createVNode(resolveComponent("iBizRelationshipDesign"), {
      "data": state.data,
      "context": this.c.context,
      "params": this.c.params,
      "config": this.generator && this.generator.config.CONFIG,
      "pluginConfig": this.generator && this.generator.config.PLUGINCONFIG,
      "nodeLegendConfig": this.generator && this.generator.config.NODELEGENDCONFIG,
      "edgeLegendConfig": this.generator && this.generator.config.EDGELEGENDCONFIG,
      "hooks": this.generator && this.generator.config.HOOKS,
      "showLoading": true,
      "onInit": (args) => {
        this.generator && this.generator.init(args);
      }
    }, null)]);
  }
});

export { UserReportPanel };
