'use strict';

var common = require('./common.cjs');

"use strict";
function getRawProps() {
  return { ...common.getEditorProps(), value: [String, Number, Array] };
}
function getGridRawProps() {
  return { ...getRawProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridRawProps = getGridRawProps;
exports.getRawProps = getRawProps;
