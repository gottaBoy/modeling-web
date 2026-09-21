import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDatePickerProps() {
  return {
    ...getEditorProps(),
    /**
     * 值
     * @description 编辑器的值
     */
    value: [String, Number]
  };
}
function getGridDatePickerProps() {
  return { ...getDatePickerProps(), ...getGridEditorCommonProps() };
}

export { getDatePickerProps, getGridDatePickerProps };
