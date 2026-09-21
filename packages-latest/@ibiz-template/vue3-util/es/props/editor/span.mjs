import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getSpanProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number, Object, Array],
    /**
     * @description 是否显示title
     * @default true
     */
    showTitle: { type: Boolean, default: true }
  };
}
function getGridSpanProps() {
  return { ...getSpanProps(), ...getGridEditorCommonProps() };
}

export { getGridSpanProps, getSpanProps };
