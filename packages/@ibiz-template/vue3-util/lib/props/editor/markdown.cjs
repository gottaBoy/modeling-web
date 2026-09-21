'use strict';

var common = require('./common.cjs');

"use strict";
function getMarkDownProps() {
  return {
    ...common.getEditorProps(),
    data: { type: Object, required: false },
    controller: { type: Object, required: false },
    disabled: {
      type: Boolean,
      required: false
    }
  };
}
function getGridMarkDownProps() {
  return { ...getMarkDownProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridMarkDownProps = getGridMarkDownProps;
exports.getMarkDownProps = getMarkDownProps;
