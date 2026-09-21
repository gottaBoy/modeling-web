import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getSliderProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridSliderProps() {
  return { ...getSliderProps(), ...getGridEditorCommonProps() };
}

export { getGridSliderProps, getSliderProps };
