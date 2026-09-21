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
  pick: (value) => lodashEs.isObject(value),
  eventClick: (value) => value,
  eventDblClick: (value) => value,
  eventContextmenu: (_value) => _value
};

exports.calendarWeekEmits = calendarWeekEmits;
exports.calendarWeekProps = calendarWeekProps;
