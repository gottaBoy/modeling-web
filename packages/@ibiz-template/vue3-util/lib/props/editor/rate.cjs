'use strict';

var common = require('./common.cjs');

"use strict";
function getRateProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridRateProps() {
  return { ...getRateProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridRateProps = getGridRateProps;
exports.getRateProps = getRateProps;
