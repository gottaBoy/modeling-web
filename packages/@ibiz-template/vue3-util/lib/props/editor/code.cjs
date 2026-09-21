'use strict';

var common = require('./common.cjs');

"use strict";
function getCodeProps() {
  return {
    ...common.getEditorProps(),
    value: String,
    language: {
      type: String
    },
    theme: {
      type: String
    }
  };
}
function getGridCodeProps() {
  return { ...getCodeProps(), ...common.getGridEditorCommonProps() };
}

exports.getCodeProps = getCodeProps;
exports.getGridCodeProps = getGridCodeProps;
