'use strict';

var lodashEs = require('lodash-es');

"use strict";
const UPDATE_MODEL_EVENT = "update:modelValue";
const CHANGE_EVENT = "change";
const INPUT_EVENT = "input";
const LEFT_CHECK_CHANGE_EVENT = "leftCheckChange";
const RIGHT_CHECK_CHANGE_EVENT = "rightCheckChange";
const LEFT_AC_SEARCH = "leftAcSearch";
const transferCheckedChangeFn = (value, movedKeys) => [value, movedKeys].every(lodashEs.isArray) || lodashEs.isArray(value) && lodashEs.isNil(movedKeys);
const transferProps = {
  data: {
    type: Array,
    default: () => []
  },
  titles: {
    type: Array,
    default: () => []
  },
  buttonTexts: {
    type: Array,
    default: () => []
  },
  filterPlaceholder: String,
  filterMethod: {
    type: Function
  },
  rightSearchMethod: {
    type: Function
  },
  leftDefaultChecked: {
    type: Array,
    default: () => []
  },
  rightDefaultChecked: {
    type: Array,
    default: () => []
  },
  renderContent: {
    type: Function
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  format: {
    type: Object,
    default: () => ({})
  },
  filterable: Boolean,
  props: {
    type: Object,
    default: () => ({
      label: "label",
      key: "key",
      disabled: "disabled"
    })
  },
  targetOrder: {
    type: String,
    values: ["original", "push", "unshift"],
    default: "original"
  },
  enableRemoteSearch: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
};
const transferEmits = {
  [CHANGE_EVENT]: (value, direction, movedKeys) => [value, movedKeys].every(lodashEs.isArray) && ["left", "right"].includes(direction),
  [UPDATE_MODEL_EVENT]: (value) => lodashEs.isArray(value),
  [LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [LEFT_AC_SEARCH]: (query) => query
};

exports.CHANGE_EVENT = CHANGE_EVENT;
exports.INPUT_EVENT = INPUT_EVENT;
exports.LEFT_AC_SEARCH = LEFT_AC_SEARCH;
exports.LEFT_CHECK_CHANGE_EVENT = LEFT_CHECK_CHANGE_EVENT;
exports.RIGHT_CHECK_CHANGE_EVENT = RIGHT_CHECK_CHANGE_EVENT;
exports.UPDATE_MODEL_EVENT = UPDATE_MODEL_EVENT;
exports.transferCheckedChangeFn = transferCheckedChangeFn;
exports.transferEmits = transferEmits;
exports.transferProps = transferProps;
