import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getSliderProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridSliderProps() {
  return { ...getSliderProps(), ...getGridEditorCommonProps() };
}

export { getGridSliderProps, getSliderProps };
