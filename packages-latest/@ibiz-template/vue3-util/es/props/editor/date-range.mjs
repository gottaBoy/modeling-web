import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getDateRangeProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridDateRangeProps() {
  return { ...getDateRangeProps(), ...getGridEditorCommonProps() };
}

export { getDateRangeProps, getGridDateRangeProps };
