'use strict';

var common = require('./common.cjs');

"use strict";
function getMapPickerProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridMapPickerProps() {
  return { ...getMapPickerProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridMapPickerProps = getGridMapPickerProps;
exports.getMapPickerProps = getMapPickerProps;
