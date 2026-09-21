import '../util/index.mjs';
import { handleProps, definePropType } from '../util/util.mjs';
import { isObject } from 'lodash-es';

"use strict";
const calendarDailyProps = handleProps({
  selectedDay: {
    type: definePropType(Object)
  },
  events: {
    type: Array,
    default: []
  },
  legends: {
    type: Array,
    default: []
  },
  multiple: {
    type: Boolean
  },
  selectedData: {
    type: Object
  },
  showDetail: {
    type: Boolean,
    default: false
  },
  semanticClass: {
    type: Function,
    required: true
  },
  semanticStyle: {
    type: Function,
    required: true
  }
});
const calendarDailyEmits = {
  pick: (value) => isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value,
  eventContextmenu: (_value) => _value
};

export { calendarDailyEmits, calendarDailyProps };
