import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getNumberRangeProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridNumberRangeProps() {
  return { ...getNumberRangeProps(), ...getGridEditorCommonProps() };
}

export { getGridNumberRangeProps, getNumberRangeProps };
