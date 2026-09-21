'use strict';

var common = require('./common.cjs');

"use strict";
function getStepperProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridStepperProps() {
  return { ...getStepperProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridStepperProps = getGridStepperProps;
exports.getStepperProps = getStepperProps;
