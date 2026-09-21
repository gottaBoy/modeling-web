'use strict';

var common = require('./common.cjs');

"use strict";
function getCheckboxListProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridCheckboxListProps() {
  return { ...getCheckboxListProps(), ...common.getGridEditorCommonProps() };
}

exports.getCheckboxListProps = getCheckboxListProps;
exports.getGridCheckboxListProps = getGridCheckboxListProps;
