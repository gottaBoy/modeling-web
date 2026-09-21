import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './commons/index.mjs';
import './bi-report.css';
import { IBizBINumberReport } from './commons/bi-number-report/bi-number-report.mjs';

"use strict";
const BIReport = /* @__PURE__ */ defineComponent({
  name: "IBizBIReport",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("bi-report");
    const generator = c.generator;
    const reportType = generator.reportType;
    return {
      c,
      ns,
      reportType
    };
  },
  render() {
    if (!this.c.state.biReport)
      return;
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.reportType === "NUMBER" ? createVNode(IBizBINumberReport, {
      "model": this.c.state.biReport.model,
      "data": this.c.state.biReport.data
    }, null) : createVNode(resolveComponent("iBizControlShell"), {
      "isSimple": true,
      "context": this.c.context,
      "data": this.c.state.biReport.data,
      "modelData": this.c.state.biReport.model,
      "style": this.c.state.biReport.options.vars,
      "class": this.c.state.biReport.options.classList
    }, null)]);
  }
});

export { BIReport };
