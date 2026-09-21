import { VTooltip, setApp } from './tooltip/tooltip.mjs';
import { IBizCommon } from './common/index.mjs';
import { vChildClass } from './child-class/child-class.mjs';
import { vChildStyle } from './child-style/child-style.mjs';

"use strict";
const IBizDirectives = {
  install: (v) => {
    v.use(IBizCommon);
    v.directive("tooltip", VTooltip);
    v.directive("child-class", vChildClass);
    v.directive("child-style", vChildStyle);
    setApp(v);
  }
};

export { IBizDirectives };
