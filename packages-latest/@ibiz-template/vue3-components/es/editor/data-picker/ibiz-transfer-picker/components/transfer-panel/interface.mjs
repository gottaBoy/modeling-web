import { isArray, isNil } from 'lodash-es';

"use strict";
const CHECKED_CHANGE_EVENT = "checkedChange";
const AC_SEARCH = "acSearch";
const transferCheckedChangeFn = (value, movedKeys) => [value, movedKeys].every(isArray) || isArray(value) && isNil(movedKeys);
const transferPanelProps = {
  data: {
    type: Array,
    default: () => []
  },
  optionRender: {
    type: Function
  },
  placeholder: String,
  title: String,
  filterable: Boolean,
  enableAcSearch: Boolean,
  format: {
    type: Object,
    default: () => ({})
  },
  filterMethod: {
    type: Function
  },
  defaultChecked: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({
      label: "label",
      key: "key",
      disabled: "disabled"
    })
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
const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn,
  [AC_SEARCH]: (query) => query
};

export { AC_SEARCH, CHECKED_CHANGE_EVENT, transferCheckedChangeFn, transferPanelEmits, transferPanelProps };
