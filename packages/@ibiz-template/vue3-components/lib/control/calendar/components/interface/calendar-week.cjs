'use strict';

require('../util/index.cjs');
var util = require('../util/util.cjs');
var lodashEs = require('lodash-es');

"use strict";
const calendarWeekProps = util.handleProps({
  showDetail: {
    type: Boolean,
    default: false
  },
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
const calendarWeekEmits = {
  pick: (value) => lodashEs.isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value
};

exports.calendarWeekEmits = calendarWeekEmits;
exports.calendarWeekProps = calendarWeekProps;
