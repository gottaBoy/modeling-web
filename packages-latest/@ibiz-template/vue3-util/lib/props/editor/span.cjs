'use strict';

var common = require('./common.cjs');

"use strict";
function getSpanProps() {
  return {
    ...common.getEditorProps(),
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
  return { ...getSpanProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridSpanProps = getGridSpanProps;
exports.getSpanProps = getSpanProps;
