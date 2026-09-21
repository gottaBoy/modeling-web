"use strict";
function applyStyle(el, childStyle) {
  if (!childStyle || !childStyle.length)
    return;
  childStyle.forEach((child) => {
    const elements = el.querySelectorAll(
      child.selector
    );
    if (!elements.length)
      return;
    const styles = child.style;
    if (!styles)
      return;
    elements.forEach((element) => {
      Object.entries(styles).forEach(([key, value]) => {
        if (value != null) {
          element.style[key] = value;
        }
      });
    });
  });
}
const vChildStyle = {
  mounted(el, binding) {
    var _a;
    applyStyle(el, (_a = binding.value) != null ? _a : void 0);
  },
  updated(el, binding) {
    var _a;
    applyStyle(el, (_a = binding.value) != null ? _a : void 0);
  }
};

export { vChildStyle };
