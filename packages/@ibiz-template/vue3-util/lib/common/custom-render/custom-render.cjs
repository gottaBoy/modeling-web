'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
require('../../use/index.cjs');
require('./custom-render.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizCustomRender = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCustomRender",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("custom-render");
    const handleHtmlEvent = async (e, eventName) => {
      e.stopPropagation();
      const scriptCode = e.target.getAttribute(eventName);
      const data = e.target.getAttribute("data");
      const context = props.controller.context.clone();
      const _context = e.target.getAttribute("context");
      if (_context) {
        Object.assign(context, core.fixJsonString(_context));
      }
      const params = {
        ...props.controller.params
      };
      const _params = e.target.getAttribute("params");
      if (_params) {
        Object.assign(params, core.fixJsonString(_params));
      }
      if (scriptCode) {
        await runtime.ScriptFactory.asyncExecScriptFn({
          ...props.controller.getEventArgs(),
          context,
          params,
          data: data ? core.fixJsonString(data) : null
        }, scriptCode);
      }
    };
    const getControlRender = () => {
      var _a, _b, _c;
      const controlRenders = (_a = props.controller) == null ? void 0 : _a.model.controlRenders;
      if (!controlRenders || controlRenders.length === 0) {
        return void 0;
      }
      const noDataRender = controlRenders.find((item) => item.id === "emptypanel");
      if (!noDataRender)
        return void 0;
      if (noDataRender.renderType === "LAYOUTPANEL_MODEL" && noDataRender.layoutPanelModel) {
        const htmlCode = runtime.ScriptFactory.execScriptFn({
          ...props.controller.getEventArgs()
        }, noDataRender.layoutPanelModel, {
          isAsync: false
        });
        return vue.createVNode("div", {
          "innerHTML": htmlCode,
          "onClick": (e) => handleHtmlEvent(e, "click"),
          "onDblclick": (e) => handleHtmlEvent(e, "dbclick"),
          "class": [ns.b(), ns.e((_b = noDataRender.renderName) == null ? void 0 : _b.toLowerCase())]
        }, null);
      }
      if (noDataRender.renderType === "LAYOUTPANEL" && noDataRender.layoutPanel) {
        return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
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

exports.IBizCustomRender = IBizCustomRender;
