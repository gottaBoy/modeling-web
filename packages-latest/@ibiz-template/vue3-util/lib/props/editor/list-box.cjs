'use strict';

var common = require('./common.cjs');

"use strict";
function getListBoxProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridListBoxProps() {
  return { ...getListBoxProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridListBoxProps = getGridListBoxProps;
exports.getListBoxProps = getListBoxProps;
