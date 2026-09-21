import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getUploadProps() {
  return { ...getEditorProps(), value: String };
}
function getGridUploadProps() {
  return { ...getUploadProps(), ...getGridEditorCommonProps() };
}

export { getGridUploadProps, getUploadProps };
