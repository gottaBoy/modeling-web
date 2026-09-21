'use strict';

var common = require('./common.cjs');

"use strict";
function getSwitchProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridSwitchProps() {
  return { ...getSwitchProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridSwitchProps = getGridSwitchProps;
exports.getSwitchProps = getSwitchProps;
