import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCascaderProps() {
  return { ...getEditorProps(), value: String };
}
function getGridCascaderProps() {
  return { ...getCascaderProps(), ...getGridEditorCommonProps() };
}

export { getCascaderProps, getGridCascaderProps };
