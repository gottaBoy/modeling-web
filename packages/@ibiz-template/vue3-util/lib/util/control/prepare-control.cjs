'use strict';

require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
function prepareControl(c) {
  const commonNs = namespace.useNamespace("control");
  const { controlType, sysCss, codeName } = c.model;
  const typeClass = controlType.toLowerCase();
  const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
  const ns = namespace.useNamespace("control-".concat(typeClass));
  const controlClass = [
    commonNs.b(),
    commonNs.b(typeClass),
    commonNs.m(codeName)
  ];
  if (sysCssName) {
    controlClass.push(sysCssName);
  }
  return { controlClass, ns };
}

exports.prepareControl = prepareControl;
