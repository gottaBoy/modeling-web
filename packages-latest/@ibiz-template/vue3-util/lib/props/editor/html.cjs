'use strict';

var common = require('./common.cjs');

"use strict";
function getHtmlProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridHtmlProps() {
  return { ...getHtmlProps(), ...common.getGridEditorCommonProps() };
}
function getHtmlEmits() {
  return {
    ...common.getEditorEmits()
  };
}

exports.getGridHtmlProps = getGridHtmlProps;
exports.getHtmlEmits = getHtmlEmits;
exports.getHtmlProps = getHtmlProps;
