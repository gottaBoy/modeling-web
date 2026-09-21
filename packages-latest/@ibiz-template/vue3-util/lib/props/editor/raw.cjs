'use strict';

var common = require('./common.cjs');

"use strict";
function getRawProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number, Array]
  };
}
function getGridRawProps() {
  return { ...getRawProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridRawProps = getGridRawProps;
exports.getRawProps = getRawProps;
