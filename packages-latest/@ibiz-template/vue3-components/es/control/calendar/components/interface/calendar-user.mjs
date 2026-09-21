import '../util/index.mjs';
import { handleProps, definePropType } from '../util/util.mjs';

"use strict";
const calendarUserProps = handleProps({
  selectedDay: {
    type: definePropType(Object),
    default: () => /* @__PURE__ */ new Date()
  },
  events: {
    type: Array,
    default: []
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
const calendarUserEmits = {
  eventClick: (value) => value,
  eventDblClick: (value) => value
};

export { calendarUserEmits, calendarUserProps };
