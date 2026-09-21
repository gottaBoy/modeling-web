'use strict';

var common = require('./common.cjs');

"use strict";
function getDataPickerProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Array, Object, Number]
  };
}
function getGridDataPickerProps() {
  return { ...getDataPickerProps(), ...common.getGridEditorCommonProps() };
}

exports.getDataPickerProps = getDataPickerProps;
exports.getGridDataPickerProps = getGridDataPickerProps;
