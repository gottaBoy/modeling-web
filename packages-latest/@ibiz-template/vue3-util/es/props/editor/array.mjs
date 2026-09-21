import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getArrayProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [Array, Array]
  };
}
function getGridArrayProps() {
  return { ...getArrayProps(), ...getGridEditorCommonProps() };
}

export { getArrayProps, getGridArrayProps };
