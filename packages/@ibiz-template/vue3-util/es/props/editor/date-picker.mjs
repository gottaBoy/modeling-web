import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDatePickerProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridDatePickerProps() {
  return { ...getDatePickerProps(), ...getGridEditorCommonProps() };
}

export { getDatePickerProps, getGridDatePickerProps };
