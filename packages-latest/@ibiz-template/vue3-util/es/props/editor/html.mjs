import { getEditorProps, getGridEditorCommonProps, getEditorEmits } from './common.mjs';

"use strict";
function getHtmlProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridHtmlProps() {
  return { ...getHtmlProps(), ...getGridEditorCommonProps() };
}
function getHtmlEmits() {
  return {
    ...getEditorEmits()
  };
}

export { getGridHtmlProps, getHtmlEmits, getHtmlProps };
