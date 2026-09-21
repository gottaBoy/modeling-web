'use strict';

var common = require('./common.cjs');

"use strict";
function getDateRangeProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridDateRangeProps() {
  return { ...getDateRangeProps(), ...common.getGridEditorCommonProps() };
}

exports.getDateRangeProps = getDateRangeProps;
exports.getGridDateRangeProps = getGridDateRangeProps;
