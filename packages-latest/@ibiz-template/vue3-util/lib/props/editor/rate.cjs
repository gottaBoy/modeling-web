'use strict';

var common = require('./common.cjs');

"use strict";
function getRateProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: [String, Number]
  };
}
function getGridRateProps() {
  return { ...getRateProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridRateProps = getGridRateProps;
exports.getRateProps = getRateProps;
