'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./bi-report-panel.css');

"use strict";
const BIReportPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizBIReportPanel",
  props: {
    controller: {
      type: Object
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("bi-report-panel");
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
    return vue.createVNode("div", {
      "class": this.ns.e("container")
    }, [vue.createVNode(vue.resolveComponent("iBizBIReportContent"), {
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

exports.BIReportPanel = BIReportPanel;
