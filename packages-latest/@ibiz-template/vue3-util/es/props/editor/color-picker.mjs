import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getColorPickerProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridColorPickerProps() {
  return { ...getColorPickerProps(), ...getGridEditorCommonProps() };
}

export { getColorPickerProps, getGridColorPickerProps };
