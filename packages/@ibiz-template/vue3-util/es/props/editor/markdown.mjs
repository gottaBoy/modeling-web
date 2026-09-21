import { getEditorProps, getGridEditorCommonProps } from './common.mjs';

"use strict";
function getMarkDownProps() {
  return {
    ...getEditorProps(),
    data: { type: Object, required: false },
    controller: { type: Object, required: false },
    disabled: {
      type: Boolean,
      required: false
    }
  };
}
function getGridMarkDownProps() {
  return { ...getMarkDownProps(), ...getGridEditorCommonProps() };
}

export { getGridMarkDownProps, getMarkDownProps };
