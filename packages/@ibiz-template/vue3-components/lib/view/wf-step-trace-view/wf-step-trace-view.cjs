'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');

"use strict";
const WFStepTraceView = /* @__PURE__ */ vue.defineComponent({
  name: "IBizWFStepTraceView",
  props: {
    context: Object,
    params: {
      type: Object,
      default: () => ({})
    },
    modelData: {
      type: Object,
      required: true
    },
    modal: {
      type: Object
    },
    state: {
      type: Object
    }
  },
  setup() {
    const ns = vue3Util.useNamespace("view");
    const c = vue3Util.useViewController((...args) => new runtime.WFStepTraceViewController(...args));
    const {
      viewType,
      sysCss,
      codeName
    } = c.model;
    const typeClass = viewType.toLowerCase();
    const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
    const viewClassNames = [ns.b(), ns.b(typeClass), ns.m(codeName), sysCssName];
    return {
      c,
      ns,
      viewClassNames
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.viewClassNames
    }, [vue.createVNode(vue.resolveComponent("iBizExtendActionTimeLine"), {
      "data": this.c.state.historyData
    }, null)]);
  }
});

exports.WFStepTraceView = WFStepTraceView;
