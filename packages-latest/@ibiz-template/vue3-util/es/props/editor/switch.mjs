import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getSwitchProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridSwitchProps() {
  return { ...getSwitchProps(), ...getGridEditorCommonProps() };
}

export { getGridSwitchProps, getSwitchProps };
