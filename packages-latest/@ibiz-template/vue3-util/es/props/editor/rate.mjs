import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getRateProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridRateProps() {
  return { ...getRateProps(), ...getGridEditorCommonProps() };
}

export { getGridRateProps, getRateProps };
