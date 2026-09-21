'use strict';

var common = require('./common.cjs');

"use strict";
function getInputIpProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridInputIpProps() {
  return { ...getInputIpProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridInputIpProps = getGridInputIpProps;
exports.getInputIpProps = getInputIpProps;
