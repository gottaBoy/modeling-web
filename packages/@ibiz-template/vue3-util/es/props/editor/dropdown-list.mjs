import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDropdownProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridDropdownProps() {
  return { ...getDropdownProps(), ...getGridEditorCommonProps() };
}

export { getDropdownProps, getGridDropdownProps };
