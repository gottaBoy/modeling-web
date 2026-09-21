import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getStepperProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridStepperProps() {
  return { ...getStepperProps(), ...getGridEditorCommonProps() };
}

export { getGridStepperProps, getStepperProps };
