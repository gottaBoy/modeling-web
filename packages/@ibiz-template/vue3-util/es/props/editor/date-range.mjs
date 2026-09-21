import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDateRangeProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridDateRangeProps() {
  return { ...getDateRangeProps(), ...getGridEditorCommonProps() };
}

export { getDateRangeProps, getGridDateRangeProps };
