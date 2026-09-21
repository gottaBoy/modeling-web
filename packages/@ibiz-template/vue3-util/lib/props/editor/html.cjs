'use strict';

var common = require('./common.cjs');

"use strict";
function getHtmlProps() {
  return { ...common.getEditorProps(), value: String };
}
function getGridHtmlProps() {
  return { ...getHtmlProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridHtmlProps = getGridHtmlProps;
exports.getHtmlProps = getHtmlProps;
