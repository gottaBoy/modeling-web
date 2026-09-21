import '../util/index.mjs';
import { handleProps, definePropType } from '../util/util.mjs';
import { isObject } from 'lodash-es';

"use strict";
const calendarWeekProps = handleProps({
  showDetail: {
    type: Boolean,
    default: false
  },
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
  semanticClass: {
    type: Function,
    required: true
  },
  semanticStyle: {
    type: Function,
    required: true
  }
});
const calendarWeekEmits = {
  pick: (value) => isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value,
  eventContextmenu: (_value) => _value
};

export { calendarWeekEmits, calendarWeekProps };
