import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getRadioProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridRadioProps() {
  return { ...getRadioProps(), ...getGridEditorCommonProps() };
}

export { getGridRadioProps, getRadioProps };
