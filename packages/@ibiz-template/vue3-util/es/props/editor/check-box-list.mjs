import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCheckboxListProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridCheckboxListProps() {
  return { ...getCheckboxListProps(), ...getGridEditorCommonProps() };
}

export { getCheckboxListProps, getGridCheckboxListProps };
