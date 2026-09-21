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
  }
});
const calendarWeekEmits = {
  pick: (value) => isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value
};

export { calendarWeekEmits, calendarWeekProps };
