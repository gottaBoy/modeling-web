import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getRawProps() {
  return { ...getEditorProps(), value: [String, Number, Array] };
}
function getGridRawProps() {
  return { ...getRawProps(), ...getGridEditorCommonProps() };
}

export { getGridRawProps, getRawProps };
