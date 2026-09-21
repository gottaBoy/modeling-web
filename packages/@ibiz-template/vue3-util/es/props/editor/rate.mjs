import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getRateProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridRateProps() {
  return { ...getRateProps(), ...getGridEditorCommonProps() };
}

export { getGridRateProps, getRateProps };
