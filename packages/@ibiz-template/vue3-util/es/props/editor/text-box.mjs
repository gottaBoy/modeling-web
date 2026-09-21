import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getInputProps() {
  return { ...getEditorProps(), value: [String, Number] };
}
function getGridInputProps() {
  return { ...getInputProps(), ...getGridEditorCommonProps() };
}
function getInputNumberProps() {
  return { ...getEditorProps(), value: Number };
}
function getGridInputNumberProps() {
  return { ...getInputNumberProps(), ...getGridEditorCommonProps() };
}
function getInputIpProps() {
  return { ...getEditorProps(), value: String };
}
function getGridInputIpProps() {
  return { ...getInputIpProps(), ...getGridEditorCommonProps() };
}

export { getGridInputIpProps, getGridInputNumberProps, getGridInputProps, getInputIpProps, getInputNumberProps, getInputProps };
