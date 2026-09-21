'use strict';

var common = require('./common.cjs');

"use strict";
function getInputProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridInputProps() {
  return { ...getInputProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridInputProps = getGridInputProps;
exports.getInputProps = getInputProps;
