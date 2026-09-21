import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getArrayProps() {
  return { ...getEditorProps(), value: [Array, Array] };
}
function getGridArrayProps() {
  return { ...getArrayProps(), ...getGridEditorCommonProps() };
}

export { getArrayProps, getGridArrayProps };
