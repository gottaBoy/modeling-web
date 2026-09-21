'use strict';

var common = require('./common.cjs');

"use strict";
function getDropdownProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridDropdownProps() {
  return { ...getDropdownProps(), ...common.getGridEditorCommonProps() };
}

exports.getDropdownProps = getDropdownProps;
exports.getGridDropdownProps = getGridDropdownProps;
