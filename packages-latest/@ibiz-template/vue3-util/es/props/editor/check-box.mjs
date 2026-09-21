import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCheckboxProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridCheckboxProps() {
  return { ...getCheckboxProps(), ...getGridEditorCommonProps() };
}

export { getCheckboxProps, getGridCheckboxProps };
