import { defineComponent, createVNode, resolveComponent } from 'vue';
import { WFStepTraceViewController } from '@ibiz-template/runtime';
import { useNamespace, useViewController } from '@ibiz-template/vue3-util';

"use strict";
const WFStepTraceView = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("view");
    const c = useViewController((...args) => new WFStepTraceViewController(...args));
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
    return createVNode("div", {
      "class": this.viewClassNames
    }, [createVNode(resolveComponent("iBizExtendActionTimeLine"), {
      "data": this.c.state.historyData
    }, null)]);
  }
});

export { WFStepTraceView };
