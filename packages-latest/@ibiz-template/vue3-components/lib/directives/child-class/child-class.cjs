'use strict';

"use strict";
function parseClass(cls) {
  if (!cls)
    return [];
  if (Array.isArray(cls))
    return cls.filter(Boolean);
  return cls.split(/\s+/).filter(Boolean);
}
function applyClass(el, childClass) {
  if (!childClass || !childClass.length)
    return;
  childClass.forEach((child) => {
    const elements = el.querySelectorAll(child.selector);
    if (!elements.length)
      return;
    const classes = parseClass(child.class);
    if (classes.length) {
      elements.forEach((element) => {
        classes.forEach((className) => {
          if (!element.classList.contains(className)) {
            element.classList.add(className);
          }
        });
      });
    }
  });
}
const vChildClass = {
  mounted(el, binding) {
    var _a;
    applyClass(el, (_a = binding.value) != null ? _a : void 0);
  },
  updated(el, binding) {
    var _a;
    applyClass(el, (_a = binding.value) != null ? _a : void 0);
  }
};

exports.vChildClass = vChildClass;
