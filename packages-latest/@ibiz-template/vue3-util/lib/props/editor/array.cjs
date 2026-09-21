'use strict';

var common = require('./common.cjs');

"use strict";
function getArrayProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [Array, Array]
  };
}
function getGridArrayProps() {
  return { ...getArrayProps(), ...common.getGridEditorCommonProps() };
}

exports.getArrayProps = getArrayProps;
exports.getGridArrayProps = getGridArrayProps;
