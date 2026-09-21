import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDataPickerProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Array, Object, Number]
  };
}
function getGridDataPickerProps() {
  return { ...getDataPickerProps(), ...getGridEditorCommonProps() };
}

export { getDataPickerProps, getGridDataPickerProps };
