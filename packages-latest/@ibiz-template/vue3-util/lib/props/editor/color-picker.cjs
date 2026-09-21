'use strict';

var common = require('./common.cjs');

"use strict";
function getColorPickerProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridColorPickerProps() {
  return { ...getColorPickerProps(), ...common.getGridEditorCommonProps() };
}

exports.getColorPickerProps = getColorPickerProps;
exports.getGridColorPickerProps = getGridColorPickerProps;
