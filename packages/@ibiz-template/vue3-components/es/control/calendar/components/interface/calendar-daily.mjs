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
  }
});
const calendarDailyEmits = {
  pick: (value) => isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value
};

export { calendarDailyEmits, calendarDailyProps };
