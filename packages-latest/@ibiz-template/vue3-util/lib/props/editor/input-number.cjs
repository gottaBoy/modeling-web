'use strict';

var common = require('./common.cjs');

"use strict";
function getInputNumberProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: Number
  };
}
function getGridInputNumberProps() {
  return { ...getInputNumberProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridInputNumberProps = getGridInputNumberProps;
exports.getInputNumberProps = getInputNumberProps;
