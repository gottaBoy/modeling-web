import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getAutoCompleteProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridAutoCompleteProps() {
  return { ...getAutoCompleteProps(), ...getGridEditorCommonProps() };
}

export { getAutoCompleteProps, getGridAutoCompleteProps };
