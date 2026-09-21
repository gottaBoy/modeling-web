'use strict';

require('../util/index.cjs');
var util = require('../util/util.cjs');
var lodashEs = require('lodash-es');

"use strict";
const calendarDailyProps = util.handleProps({
  selectedDay: {
    type: util.definePropType(Object)
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
  pick: (value) => lodashEs.isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value
};

exports.calendarDailyEmits = calendarDailyEmits;
exports.calendarDailyProps = calendarDailyProps;
