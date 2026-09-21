import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getStepperProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridStepperProps() {
  return { ...getStepperProps(), ...getGridEditorCommonProps() };
}

export { getGridStepperProps, getStepperProps };
