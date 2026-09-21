'use strict';

var common = require('./common.cjs');

"use strict";
function getDatePickerProps() {
  return {
    ...common.getEditorProps(),
    /**
     * 值
     * @description 编辑器的值
     */
    value: [String, Number]
  };
}
function getGridDatePickerProps() {
  return { ...getDatePickerProps(), ...common.getGridEditorCommonProps() };
}

exports.getDatePickerProps = getDatePickerProps;
exports.getGridDatePickerProps = getGridDatePickerProps;
