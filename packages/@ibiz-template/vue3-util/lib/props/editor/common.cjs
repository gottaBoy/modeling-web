'use strict';

var common = require('../common.cjs');

"use strict";
function getEditorProps() {
  return {
    value: String,
    controller: new common.RequiredProp(Object),
    data: new common.RequiredProp(Object),
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    overflowMode: { type: String },
    controlParams: {
      type: Object,
      required: false
    }
  };
}
function getEditorEmits() {
  return {
    /** 值变更事件 */
    change: (_value, _name, _ignore) => true,
    /** 失焦事件 */
    blur: (_event) => true,
    /** 聚焦事件 */
    focus: (_event) => true,
    /** 回车事件 */
    enter: (_event) => true,
    /** 信息文本变更事件 */
    infoTextChange: (_text) => true
  };
}
function getGridEditorEmits() {
  return {
    /** 值变更事件 */
    change: (_value, _name, _ignore) => true,
    /** 是否正在操作事件 */
    rowSave: () => true
  };
}
function getGridEditorCommonProps() {
  return {
    hasError: {
      type: Boolean
    }
  };
}

exports.getEditorEmits = getEditorEmits;
exports.getEditorProps = getEditorProps;
exports.getGridEditorCommonProps = getGridEditorCommonProps;
exports.getGridEditorEmits = getGridEditorEmits;
