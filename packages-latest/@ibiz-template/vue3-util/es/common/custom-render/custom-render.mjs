import { defineComponent, createVNode, resolveComponent } from 'vue';
import { ScriptFactory, PredefinedControlRender } from '@ibiz-template/runtime';
import { fixJsonString } from '@ibiz-template/core';
import '../../use/index.mjs';
import './custom-render.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
const IBizCustomRender = /* @__PURE__ */ defineComponent({
  name: "IBizCustomRender",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("custom-render");
    const handleHtmlEvent = async (e, eventName) => {
      e.stopPropagation();
      const scriptCode = e.target.getAttribute(eventName);
      const data = e.target.getAttribute("data");
      const context = props.controller.context.clone();
      const _context = e.target.getAttribute("context");
      if (_context) {
        Object.assign(context, fixJsonString(_context));
      }
      const params = {
        ...props.controller.params
      };
      const _params = e.target.getAttribute("params");
      if (_params) {
        Object.assign(params, fixJsonString(_params));
      }
      if (scriptCode) {
        await ScriptFactory.asyncExecScriptFn({
          ...props.controller.getEventArgs(),
          context,
          params,
          data: data ? fixJsonString(data) : null
        }, scriptCode);
      }
    };
    const getControlRender = () => {
      var _a, _b, _c;
      const controlRenders = (_a = props.controller) == null ? void 0 : _a.model.controlRenders;
      if (!controlRenders || controlRenders.length === 0) {
        return void 0;
      }
      const noDataRender = controlRenders.find((item) => item.id === PredefinedControlRender.EMPTYPANEL);
      if (!noDataRender)
        return void 0;
      if (noDataRender.renderType === "LAYOUTPANEL_MODEL" && noDataRender.layoutPanelModel) {
        const htmlCode = ScriptFactory.execScriptFn({
          ...props.controller.getEventArgs()
        }, noDataRender.layoutPanelModel, {
          isAsync: false
        });
        return createVNode("div", {
          "innerHTML": htmlCode,
          "onClick": (e) => handleHtmlEvent(e, "click"),
          "onDblclick": (e) => handleHtmlEvent(e, "dbclick"),
          "class": [ns.b(), ns.e((_b = noDataRender.renderName) == null ? void 0 : _b.toLowerCase())]
        }, null);
      }
      if (noDataRender.renderType === "LAYOUTPANEL" && noDataRender.layoutPanel) {
        return createVNode(resolveComponent("iBizControlShell"), {
          "class": [ns.b(), ns.e((_c = noDataRender.renderName) == null ? void 0 : _c.toLowerCase())],
          "params": props.controller.params,
          "context": props.controller.context,
          "modelData": noDataRender.layoutPanel
        }, null);
      }
    };
    return {
      ns,
      getControlRender
    };
  },
  render() {
    return this.getControlRender();
  }
});

export { IBizCustomRender };
