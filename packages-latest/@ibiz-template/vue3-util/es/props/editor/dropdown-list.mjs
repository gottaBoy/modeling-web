import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDropdownProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridDropdownProps() {
  return { ...getDropdownProps(), ...getGridEditorCommonProps() };
}

export { getDropdownProps, getGridDropdownProps };
