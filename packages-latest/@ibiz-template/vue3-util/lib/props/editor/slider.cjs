'use strict';

var common = require('./common.cjs');

"use strict";
function getSliderProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridSliderProps() {
  return { ...getSliderProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridSliderProps = getGridSliderProps;
exports.getSliderProps = getSliderProps;
