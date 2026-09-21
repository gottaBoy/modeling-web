'use strict';

var common = require('./common.cjs');

"use strict";
function getRadioProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridRadioProps() {
  return { ...getRadioProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridRadioProps = getGridRadioProps;
exports.getRadioProps = getRadioProps;
