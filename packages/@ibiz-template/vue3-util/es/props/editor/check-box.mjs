import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCheckboxProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridCheckboxProps() {
  return { ...getCheckboxProps(), ...getGridEditorCommonProps() };
}

export { getCheckboxProps, getGridCheckboxProps };
