'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('../common/index.cjs');
var tooltip = require('../common/tooltip/tooltip.cjs');

"use strict";
let APP = null;
function setApp(app) {
  APP = app;
}
function isValidPlacement(key) {
  return Object.values(vue3Util.TooltipPlacement).includes(key);
}
function normalizeOptions(value, _arg, modifiers) {
  const options = typeof value === "string" || !("content" in value) ? {
    content: value
  } : value;
  if (modifiers) {
    for (const key in modifiers) {
      if (modifiers[key] && isValidPlacement(key)) {
        options.placement = key;
        break;
      }
    }
  }
  return options;
}
function createTooltipVNode(triggerEl, options) {
  const { content, ...args } = options;
  const ns = vue3Util.useNamespace("tooltip");
  const props = {
    args,
    virtualRef: triggerEl
  };
  return vue.createVNode(tooltip.IBizTooltip, props, {
    default: () => {
      if (typeof content === "string")
        return vue.h("div", {
          class: "".concat(ns.e("custom")),
          innerHTML: content
        });
      return content;
    }
  });
}
function destroyTooltip(el) {
  if (el._tooltip) {
    el._tooltip.cleanup();
    delete el._tooltip;
  }
}
function initTooltip(el, binding) {
  if (el._tooltip)
    destroyTooltip(el);
  const options = normalizeOptions(
    binding.value,
    binding.arg,
    binding.modifiers
  );
  if (options.disabled)
    return;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const vnode = createTooltipVNode(el, options);
  if (APP)
    vnode.appContext = APP._context;
  vue.render(vnode, container);
  el._tooltip = {
    id: "tooltip-".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9)),
    options,
    container,
    vnode,
    cleanup: () => {
      if (container && container.parentNode) {
        vue.render(null, container);
        container.parentNode.removeChild(container);
      }
    }
  };
}
const VTooltip = {
  mounted(el, binding) {
    initTooltip(el, binding);
  },
  updated(el, binding) {
    initTooltip(el, binding);
  },
  unmounted(el) {
    if (el._tooltip) {
      el._tooltip.cleanup();
      delete el._tooltip;
    }
  }
};

exports.VTooltip = VTooltip;
exports.default = VTooltip;
exports.setApp = setApp;
