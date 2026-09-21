import '../../use/index.mjs';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function prepareControl(c) {
  const commonNs = useNamespace("control");
  const { controlType, sysCss, codeName } = c.model;
  const typeClass = controlType.toLowerCase();
  const sysCssName = sysCss == null ? void 0 : sysCss.cssName;
  const ns = useNamespace("control-".concat(typeClass));
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

export { prepareControl };
