'use strict';

var common = require('./common.cjs');

"use strict";
function getNumberRangeProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridNumberRangeProps() {
  return { ...getNumberRangeProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridNumberRangeProps = getGridNumberRangeProps;
exports.getNumberRangeProps = getNumberRangeProps;
