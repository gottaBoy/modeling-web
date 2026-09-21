'use strict';

var common = require('./common.cjs');

"use strict";
function getInputProps() {
  return { ...common.getEditorProps(), value: [String, Number] };
}
function getGridInputProps() {
  return { ...getInputProps(), ...common.getGridEditorCommonProps() };
}
function getInputNumberProps() {
  return { ...common.getEditorProps(), value: Number };
}
function getGridInputNumberProps() {
  return { ...getInputNumberProps(), ...common.getGridEditorCommonProps() };
}
function getInputIpProps() {
  return { ...common.getEditorProps(), value: String };
}
function getGridInputIpProps() {
  return { ...getInputIpProps(), ...common.getGridEditorCommonProps() };
}

exports.getGridInputIpProps = getGridInputIpProps;
exports.getGridInputNumberProps = getGridInputNumberProps;
exports.getGridInputProps = getGridInputProps;
exports.getInputIpProps = getInputIpProps;
exports.getInputNumberProps = getInputNumberProps;
exports.getInputProps = getInputProps;
