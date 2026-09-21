import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getRadioProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridRadioProps() {
  return { ...getRadioProps(), ...getGridEditorCommonProps() };
}

export { getGridRadioProps, getRadioProps };
