import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCodeProps() {
  return {
    ...getEditorProps(),
    value: String,
    language: {
      type: String
    },
    theme: {
      type: String
    }
  };
}
function getGridCodeProps() {
  return { ...getCodeProps(), ...getGridEditorCommonProps() };
}

export { getCodeProps, getGridCodeProps };
