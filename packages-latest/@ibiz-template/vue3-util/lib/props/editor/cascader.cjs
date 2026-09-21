'use strict';

var common = require('./common.cjs');

"use strict";
function getCascaderProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridCascaderProps() {
  return { ...getCascaderProps(), ...common.getGridEditorCommonProps() };
}

exports.getCascaderProps = getCascaderProps;
exports.getGridCascaderProps = getGridCascaderProps;
