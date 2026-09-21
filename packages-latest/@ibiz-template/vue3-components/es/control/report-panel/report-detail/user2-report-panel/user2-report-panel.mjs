import { defineComponent, createVNode } from 'vue';
import { UIActionUtil } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import './user2-report-panel.css';

"use strict";
const User2ReportPanel = /* @__PURE__ */ defineComponent({
  name: "IBizUser2ReportPanel",
  props: {
    controller: {
      type: Object
    }
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace("user2-report-panel");
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
        UIActionUtil.exec(result[1], {
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
      return createVNode("div", {
        "class": this.ns.e("container"),
        "innerHTML": state.data,
        "onClick": (e) => {
          this.handleClick(e);
        }
      }, null);
    }
    return createVNode("div", {
      "class": this.ns.e("empty")
    }, [ibiz.i18n.t("control.common.currentNoData")]);
  }
});

export { User2ReportPanel };
