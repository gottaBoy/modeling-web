import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getRawProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number, Array]
  };
}
function getGridRawProps() {
  return { ...getRawProps(), ...getGridEditorCommonProps() };
}

export { getGridRawProps, getRawProps };
