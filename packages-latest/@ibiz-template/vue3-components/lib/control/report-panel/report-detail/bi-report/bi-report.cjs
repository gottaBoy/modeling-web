'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./commons/index.cjs');
require('./bi-report.css');
var biNumberReport = require('./commons/bi-number-report/bi-number-report.cjs');

"use strict";
const BIReport = /* @__PURE__ */ vue.defineComponent({
  name: "IBizBIReport",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("bi-report");
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
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.reportType === "NUMBER" ? vue.createVNode(biNumberReport.IBizBINumberReport, {
      "model": this.c.state.biReport.model,
      "data": this.c.state.biReport.data
    }, null) : vue.createVNode(vue.resolveComponent("iBizControlShell"), {
      "isSimple": true,
      "context": this.c.context,
      "data": this.c.state.biReport.data,
      "modelData": this.c.state.biReport.model,
      "style": this.c.state.biReport.options.vars,
      "class": this.c.state.biReport.options.classList
    }, null)]);
  }
});

exports.BIReport = BIReport;
