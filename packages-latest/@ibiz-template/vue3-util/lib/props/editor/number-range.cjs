'use strict';

var common = require('./common.cjs');

"use strict";
function getNumberRangeProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridNumberRangeProps() {
  return { ...getNumberRangeProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridNumberRangeProps = getGridNumberRangeProps;
exports.getNumberRangeProps = getNumberRangeProps;
