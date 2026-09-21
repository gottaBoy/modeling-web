import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getColorPickerProps() {
  return { ...getEditorProps(), value: String };
}
function getGridColorPickerProps() {
  return { ...getColorPickerProps(), ...getGridEditorCommonProps() };
}

export { getColorPickerProps, getGridColorPickerProps };
