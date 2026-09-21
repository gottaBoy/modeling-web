'use strict';

var tooltip = require('./tooltip/tooltip.cjs');

"use strict";
const IBizCommon = {
  install: (v) => {
    v.component(tooltip.IBizTooltip.name, tooltip.IBizTooltip);
  }
};

exports.IBizTooltip = tooltip.IBizTooltip;
exports.IBizCommon = IBizCommon;
