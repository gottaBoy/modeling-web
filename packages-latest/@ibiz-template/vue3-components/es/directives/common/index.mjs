import { IBizTooltip } from './tooltip/tooltip.mjs';

"use strict";
const IBizCommon = {
  install: (v) => {
    v.component(IBizTooltip.name, IBizTooltip);
  }
};

export { IBizCommon, IBizTooltip };
