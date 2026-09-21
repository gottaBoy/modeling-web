import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getUploadProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridUploadProps() {
  return { ...getUploadProps(), ...getGridEditorCommonProps() };
}

export { getGridUploadProps, getUploadProps };
