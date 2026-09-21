import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getListBoxProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridListBoxProps() {
  return { ...getListBoxProps(), ...getGridEditorCommonProps() };
}

export { getGridListBoxProps, getListBoxProps };
