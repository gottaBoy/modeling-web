import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getMapPickerProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridMapPickerProps() {
  return { ...getMapPickerProps(), ...getGridEditorCommonProps() };
}

export { getGridMapPickerProps, getMapPickerProps };
