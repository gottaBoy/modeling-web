'use strict';

var common = require('./common.cjs');

"use strict";
function getAutoCompleteProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridAutoCompleteProps() {
  return { ...getAutoCompleteProps(), ...common.getGridEditorCommonProps() };
}

exports.getAutoCompleteProps = getAutoCompleteProps;
exports.getGridAutoCompleteProps = getGridAutoCompleteProps;
