'use strict';

var common = require('./common.cjs');

"use strict";
function getSpanProps() {
  return { ...common.getEditorProps(), value: [String, Number, Object, Array] };
}
function getGridSpanProps() {
  return { ...getSpanProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridSpanProps = getGridSpanProps;
exports.getSpanProps = getSpanProps;
