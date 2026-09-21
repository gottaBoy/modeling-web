'use strict';

var common = require('./common.cjs');

"use strict";
function getDatePickerProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridDatePickerProps() {
  return { ...getDatePickerProps(), ...common.getGridEditorCommonProps() };
}

exports.getDatePickerProps = getDatePickerProps;
exports.getGridDatePickerProps = getGridDatePickerProps;
