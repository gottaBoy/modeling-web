'use strict';

var common = require('./common.cjs');

"use strict";
function getCheckboxProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridCheckboxProps() {
  return { ...getCheckboxProps(), ...common.getGridEditorCommonProps() };
}

exports.getCheckboxProps = getCheckboxProps;
exports.getGridCheckboxProps = getGridCheckboxProps;
