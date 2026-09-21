"use strict";
const DESIGN_WIDTH = 1920;
let currentScale = 1;
const scalePopperInset = (inset, scale) => {
  return inset.split(/\s+/).map((part) => {
    if (!part || part === "auto")
      return part;
    const match = part.match(/^(-?[\d.]+)(px|rem|em|%)?$/);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2] || "px";
      return "".concat(Math.round(value / scale)).concat(unit);
    }
    return part;
  }).join(" ");
};
const fixPopperInset = (el) => {
  if (currentScale === 1)
    return;
  const inset = el.style.inset;
  if (!inset)
    return;
  if (el.dataset.zoomFixedInset === inset)
    return;
  el.dataset.zoomOriginalInset = inset;
  const fixed = scalePopperInset(inset, currentScale);
  el.style.inset = fixed;
  el.dataset.zoomFixedInset = fixed;
};
const fixContextMenuPosition = (el) => {
  if (currentScale === 1)
    return;
  const fixValue = (value) => {
    if (!value || value.startsWith("calc("))
      return value;
    const match = value.match(/^(-?[\d.]+)(px|rem|em|%)?$/);
    if (match) {
      const num = match[1];
      const unit = match[2] || "px";
      return "calc(".concat(num).concat(unit, " / ").concat(currentScale, ")");
    }
    return value;
  };
  const { left, top } = el.style;
  const fixedLeft = fixValue(left);
  const fixedTop = fixValue(top);
  if (fixedLeft !== left) {
    el.style.left = fixedLeft;
  }
  if (fixedTop !== top) {
    el.style.top = fixedTop;
  }
};
const fixPopperTransform = (el) => {
  if (currentScale === 1)
    return;
  const transform = el.style.transform;
  if (!transform)
    return;
  if (el.dataset.zoomFixedTransform === transform)
    return;
  el.dataset.zoomOriginalTransform = transform;
  const fixed = transform.replace(
    /translate3d\(\s*([^,)]+),\s*([^,)]+),\s*([^,)]+)\s*\)|translate\(\s*([^,)]+),\s*([^,)]+)\s*\)/g,
    (_, x3d, y3d, z3d, x2d, y2d) => {
      const fixAxis = (val) => {
        const part = val.trim();
        const match = part.match(/^(-?[\d.]+)(px|rem|em|%)?$/);
        if (match) {
          const num = parseFloat(match[1]);
          const unit = match[2] || "px";
          return "".concat(Math.round(num / currentScale)).concat(unit);
        }
        return part;
      };
      if (x3d !== void 0) {
        return "translate3d(".concat(fixAxis(x3d), ", ").concat(fixAxis(y3d), ", ").concat(fixAxis(z3d), ")");
      }
      return "translate(".concat(fixAxis(x2d), ", ").concat(fixAxis(y2d), ")");
    }
  );
  el.style.transform = fixed;
  el.dataset.zoomFixedTransform = fixed;
};
let popperObserver = null;
const startObservePoppers = () => {
  popperObserver = new MutationObserver((mutations) => {
    if (currentScale === 1)
      return;
    mutations.forEach((mutation) => {
      var _a, _b;
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          var _a2, _b2;
          if (node.nodeType !== Node.ELEMENT_NODE)
            return;
          const el = node;
          if ((_a2 = el.classList) == null ? void 0 : _a2.contains("el-popper")) {
            fixPopperInset(el);
            if (el.classList.contains("ibiz-form-item-container__popper") || el.classList.contains("ibiz-form-mdctrl-popper")) {
              fixPopperTransform(el);
            }
          } else if ((_b2 = el.classList) == null ? void 0 : _b2.contains("mx-context-menu")) {
            fixContextMenuPosition(el);
          }
        });
      } else if (mutation.type === "attributes" && mutation.attributeName === "style") {
        const el = mutation.target;
        if ((_a = el.classList) == null ? void 0 : _a.contains("el-popper")) {
          fixPopperInset(el);
          if (el.classList.contains("ibiz-form-item-container__popper") || el.classList.contains("ibiz-form-mdctrl-popper")) {
            fixPopperTransform(el);
          }
        } else if ((_b = el.classList) == null ? void 0 : _b.contains("mx-context-menu")) {
          fixContextMenuPosition(el);
        }
      }
    });
  });
  popperObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"]
  });
};
const setZoom = () => {
  const scale = window.innerWidth / DESIGN_WIDTH;
  currentScale = scale;
  document.body.style.zoom = String(scale);
  const appEl = document.getElementById("app");
  if (appEl) {
    appEl.style.width = "".concat(DESIGN_WIDTH, "px");
    appEl.style.height = "".concat(window.innerHeight / scale, "px");
  }
};
function startAdaptiveScreenWidth() {
  if (!ibiz.env.isAdaptiveScreenWidth) {
    return () => {
    };
  }
  window.addEventListener("resize", setZoom);
  setZoom();
  startObservePoppers();
  return () => {
    window.removeEventListener("resize", setZoom);
    document.body.style.zoom = "";
    popperObserver == null ? void 0 : popperObserver.disconnect();
    popperObserver = null;
  };
}

export { startAdaptiveScreenWidth };
