import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './bi-report-panel.css';

"use strict";
const BIReportPanel = /* @__PURE__ */ defineComponent({
  name: "IBizBIReportPanel",
  props: {
    controller: {
      type: Object
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("bi-report-panel");
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
    return createVNode("div", {
      "class": this.ns.e("container")
    }, [createVNode(resolveComponent("iBizBIReportContent"), {
      "mode": "CONTENT",
      "context": this.c.context,
      "viewParams": this.c.params,
      "config": this.generator && this.generator.config,
      "onInit": (args) => {
        this.generator && this.generator.init(args);
      },
      "onReportChartChange": (args) => {
        this.generator && this.generator.init(args);
      }
    }, null)]);
  }
});

export { BIReportPanel };
