'use strict';

var common = require('./common.cjs');

"use strict";
function getSliderProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridSliderProps() {
  return { ...getSliderProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridSliderProps = getGridSliderProps;
exports.getSliderProps = getSliderProps;
