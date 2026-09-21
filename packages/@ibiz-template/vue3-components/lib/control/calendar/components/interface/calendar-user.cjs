'use strict';

require('../util/index.cjs');
var util = require('../util/util.cjs');

"use strict";
const calendarUserProps = util.handleProps({
  selectedDay: {
    type: util.definePropType(Object),
    default: () => /* @__PURE__ */ new Date()
  },
  events: {
    type: Array,
    default: []
  }
});
const calendarUserEmits = {
  eventClick: (value) => value,
  eventDblClick: (value) => value
};

exports.calendarUserEmits = calendarUserEmits;
exports.calendarUserProps = calendarUserProps;
