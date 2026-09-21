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
  pick: (value) => lodashEs.isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value,
  eventContextmenu: (_value) => _value
};

exports.calendarDailyEmits = calendarDailyEmits;
exports.calendarDailyProps = calendarDailyProps;
