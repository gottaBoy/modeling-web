'use strict';

var common = require('./common.cjs');

"use strict";
function getDataPickerProps() {
  return { ...common.getEditorProps(), value: [String, Array, Object, Number] };
}
function getGridDataPickerProps() {
  return { ...getDataPickerProps(), ...common.getGridEditorCommonProps() };
}

exports.getDataPickerProps = getDataPickerProps;
exports.getGridDataPickerProps = getGridDataPickerProps;
