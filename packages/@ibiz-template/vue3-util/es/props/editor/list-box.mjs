import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getListBoxProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridListBoxProps() {
  return { ...getListBoxProps(), ...getGridEditorCommonProps() };
}

export { getGridListBoxProps, getListBoxProps };
