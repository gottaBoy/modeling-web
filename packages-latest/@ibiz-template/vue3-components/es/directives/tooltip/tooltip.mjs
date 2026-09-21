import { createVNode, h, render } from 'vue';
import { TooltipPlacement, useNamespace } from '@ibiz-template/vue3-util';
import '../common/index.mjs';
import { IBizTooltip } from '../common/tooltip/tooltip.mjs';

"use strict";
let APP = null;
function setApp(app) {
  APP = app;
}
function isValidPlacement(key) {
  return Object.values(TooltipPlacement).includes(key);
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
  const ns = useNamespace("tooltip");
  const props = {
    args,
    virtualRef: triggerEl
  };
  return createVNode(IBizTooltip, props, {
    default: () => {
      if (typeof content === "string")
        return h("div", {
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
  render(vnode, container);
  el._tooltip = {
    id: "tooltip-".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9)),
    options,
    container,
    vnode,
    cleanup: () => {
      if (container && container.parentNode) {
        render(null, container);
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

export { VTooltip, VTooltip as default, setApp };
