'use strict';

var common = require('./common.cjs');

"use strict";
function getListBoxProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridListBoxProps() {
  return { ...getListBoxProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridListBoxProps = getGridListBoxProps;
exports.getListBoxProps = getListBoxProps;
