'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./user-report-panel.css');

"use strict";
const UserReportPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizUserReportPanel",
  props: {
    controller: {
      type: Object
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("user-report-panel");
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
    return vue.createVNode("div", {
      "class": this.ns.e("container")
    }, [vue.createVNode(vue.resolveComponent("iBizRelationshipDesign"), {
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

exports.UserReportPanel = UserReportPanel;
