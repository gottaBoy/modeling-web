import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getNumberRangeProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridNumberRangeProps() {
  return { ...getNumberRangeProps(), ...getGridEditorCommonProps() };
}

export { getGridNumberRangeProps, getNumberRangeProps };
