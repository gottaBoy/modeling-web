'use strict';

var common = require('./common.cjs');

"use strict";
function getRadioProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridRadioProps() {
  return { ...getRadioProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridRadioProps = getGridRadioProps;
exports.getRadioProps = getRadioProps;
