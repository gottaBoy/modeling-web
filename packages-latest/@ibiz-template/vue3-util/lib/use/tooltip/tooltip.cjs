'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');

"use strict";
var TooltipPlacement = /* @__PURE__ */ ((TooltipPlacement2) => {
  TooltipPlacement2["TOP"] = "top";
  TooltipPlacement2["TOP_START"] = "top-start";
  TooltipPlacement2["TOP_END"] = "top-end";
  TooltipPlacement2["BOTTOM"] = "bottom";
  TooltipPlacement2["BOTTOM_START"] = "bottom-start";
  TooltipPlacement2["BOTTOM_END"] = "bottom-end";
  TooltipPlacement2["LEFT"] = "left";
  TooltipPlacement2["LEFT_START"] = "left-start";
  TooltipPlacement2["LEFT_END"] = "left-end";
  TooltipPlacement2["RIGHT"] = "right";
  TooltipPlacement2["RIGHT_START"] = "right-start";
  TooltipPlacement2["RIGHT_END"] = "right-end";
  return TooltipPlacement2;
})(TooltipPlacement || {});
var TooltipTrigger = /* @__PURE__ */ ((TooltipTrigger2) => {
  TooltipTrigger2["HOVER"] = "hover";
  TooltipTrigger2["CLICK"] = "click";
  TooltipTrigger2["FOCUS"] = "focus";
  TooltipTrigger2["CONTEXTMENU"] = "contextmenu";
  return TooltipTrigger2;
})(TooltipTrigger || {});
function renderTooltip(data, model, ctrl, tooltipId = "".concat(((_a) => (_a = model.id) == null ? void 0 : _a.toLowerCase())(), "_tooltip")) {
  const options = {
    content: "",
    disabled: true,
    placement: "top" /* TOP */
  };
  const { controlRenders = [], id } = model;
  const defaultTooltip = "".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip");
  let render = controlRenders.find((renderItem) => renderItem.id === tooltipId);
  if (!render && tooltipId !== defaultTooltip)
    render = controlRenders.find(
      (renderItem) => renderItem.id === defaultTooltip
    );
  if (render) {
    if (render.renderType === "LAYOUTPANEL_MODEL" && render.layoutPanelModel) {
      let renderCode = render.layoutPanelModel;
      if (!renderCode.includes("return"))
        renderCode = "return (".concat(renderCode, ")");
      options.content = runtime.ScriptFactory.execScriptFn(
        {
          ...ctrl.getEventArgs(),
          data,
          model
        },
        renderCode,
        { isAsync: false }
      );
      options.disabled = false;
    } else if (render.renderType === "LAYOUTPANEL" && render.layoutPanel) {
      options.content = vue.h(vue.resolveComponent("IBizControlShell"), {
        data,
        params: ctrl.params,
        context: ctrl.context,
        modelData: render.layoutPanel
      });
      options.disabled = false;
    }
  }
  return options;
}

exports.TooltipPlacement = TooltipPlacement;
exports.TooltipTrigger = TooltipTrigger;
exports.renderTooltip = renderTooltip;
