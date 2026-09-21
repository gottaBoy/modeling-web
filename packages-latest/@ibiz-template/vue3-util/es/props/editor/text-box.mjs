import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getInputProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridInputProps() {
  return { ...getInputProps(), ...getGridEditorCommonProps() };
}

export { getGridInputProps, getInputProps };
