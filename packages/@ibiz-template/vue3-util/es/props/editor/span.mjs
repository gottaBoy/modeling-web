import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getSpanProps() {
  return { ...getEditorProps(), value: [String, Number, Object, Array] };
}
function getGridSpanProps() {
  return { ...getSpanProps(), ...getGridEditorCommonProps() };
}

export { getGridSpanProps, getSpanProps };
