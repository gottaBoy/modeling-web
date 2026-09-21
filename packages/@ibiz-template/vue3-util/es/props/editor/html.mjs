import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getHtmlProps() {
  return { ...getEditorProps(), value: String };
}
function getGridHtmlProps() {
  return { ...getHtmlProps(), ...getGridEditorCommonProps() };
}

export { getGridHtmlProps, getHtmlProps };
