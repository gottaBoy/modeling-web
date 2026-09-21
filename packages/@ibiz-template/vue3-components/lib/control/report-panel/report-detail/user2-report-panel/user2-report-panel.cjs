'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
require('./user2-report-panel.css');

"use strict";
const User2ReportPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizUser2ReportPanel",
  props: {
    controller: {
      type: Object
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = vue3Util.useNamespace("user2-report-panel");
    const generator = c && c.generator;
    const handleClick = async (e) => {
      let clickValue = e.target.getAttribute("click");
      let params = e.target.getAttribute("params");
      if (!clickValue || !c || !params) {
        return;
      }
      clickValue = clickValue.replaceAll("`", "");
      params = params.replaceAll("`", '"');
      const pattern = /\(([^)]+)\)/;
      const result = pattern.exec(clickValue);
      if (result && result[1]) {
        runtime.UIActionUtil.exec(result[1], {
          context: c.context,
          params: c.params,
          data: [JSON.parse(params)],
          view: c.view
        }, c.context.srfappid);
      }
    };
    return {
      c,
      ns,
      generator,
      handleClick
    };
  },
  render() {
    if (!this.c) {
      return;
    }
    const state = this.c.state;
    if (state.isLoaded) {
      return vue.createVNode("div", {
        "class": this.ns.e("container"),
        "innerHTML": state.data,
        "onClick": (e) => {
          this.handleClick(e);
        }
      }, null);
    }
    return vue.createVNode("div", {
      "class": this.ns.e("empty")
    }, [ibiz.i18n.t("control.common.currentNoData")]);
  }
});

exports.User2ReportPanel = User2ReportPanel;
