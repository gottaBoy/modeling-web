'use strict';

var common = require('./common.cjs');

"use strict";
function getCodeProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String,
    /**
     * @description 代码语言类型
     */
    language: {
      type: String
    },
    /**
     * @description 主题类型
     */
    theme: {
      type: String
    }
  };
}
function getGridCodeProps() {
  return { ...getCodeProps(), ...common.getGridEditorCommonProps() };
}
function getCodeEmits() {
  return {
    ...common.getEditorEmits()
  };
}

exports.getCodeEmits = getCodeEmits;
exports.getCodeProps = getCodeProps;
exports.getGridCodeProps = getGridCodeProps;
