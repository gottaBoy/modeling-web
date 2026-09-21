import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getInputIpProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridInputIpProps() {
  return { ...getInputIpProps(), ...getGridEditorCommonProps() };
}

export { getGridInputIpProps, getInputIpProps };
