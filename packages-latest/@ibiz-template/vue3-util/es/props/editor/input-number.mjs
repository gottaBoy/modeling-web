import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getInputNumberProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: Number
  };
}
function getGridInputNumberProps() {
  return { ...getInputNumberProps(), ...getGridEditorCommonProps() };
}

export { getGridInputNumberProps, getInputNumberProps };
