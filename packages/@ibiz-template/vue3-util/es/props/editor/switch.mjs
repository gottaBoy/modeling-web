import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getSwitchProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridSwitchProps() {
  return { ...getSwitchProps(), ...getGridEditorCommonProps() };
}

export { getGridSwitchProps, getSwitchProps };
