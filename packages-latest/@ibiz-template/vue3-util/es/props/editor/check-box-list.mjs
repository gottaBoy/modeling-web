import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCheckboxListProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridCheckboxListProps() {
  return { ...getCheckboxListProps(), ...getGridEditorCommonProps() };
}

export { getCheckboxListProps, getGridCheckboxListProps };
