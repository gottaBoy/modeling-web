import { getEditorProps, getGridEditorCommonProps, getEditorEmits } from './common.mjs';

"use strict";
function getCodeProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String,
    /**
     * @description 代码语言类型
     */
    language: {
      type: String
    },
    /**
     * @description 主题类型
     */
    theme: {
      type: String
    }
  };
}
function getGridCodeProps() {
  return { ...getCodeProps(), ...getGridEditorCommonProps() };
}
function getCodeEmits() {
  return {
    ...getEditorEmits()
  };
}

export { getCodeEmits, getCodeProps, getGridCodeProps };
