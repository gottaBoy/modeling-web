'use strict';

var common = require('./common.cjs');

"use strict";
function getUploadProps() {
  return {
    ...common.getEditorProps(),
    /**
     * @description 编辑器值
     */
    value: String
  };
}
function getGridUploadProps() {
  return { ...getUploadProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridUploadProps = getGridUploadProps;
exports.getUploadProps = getUploadProps;
