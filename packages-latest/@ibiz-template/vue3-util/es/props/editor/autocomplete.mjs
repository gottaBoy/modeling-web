import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getAutoCompleteProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridAutoCompleteProps() {
  return { ...getAutoCompleteProps(), ...getGridEditorCommonProps() };
}

export { getAutoCompleteProps, getGridAutoCompleteProps };
