'use strict';

var common = require('./common.cjs');

"use strict";
function getCheckboxListProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridCheckboxListProps() {
  return { ...getCheckboxListProps(), ...common.getGridEditorCommonProps() };
}

exports.getCheckboxListProps = getCheckboxListProps;
exports.getGridCheckboxListProps = getGridCheckboxListProps;
