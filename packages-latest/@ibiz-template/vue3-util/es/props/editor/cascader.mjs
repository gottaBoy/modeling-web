import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getCascaderProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridCascaderProps() {
  return { ...getCascaderProps(), ...getGridEditorCommonProps() };
}

export { getCascaderProps, getGridCascaderProps };
