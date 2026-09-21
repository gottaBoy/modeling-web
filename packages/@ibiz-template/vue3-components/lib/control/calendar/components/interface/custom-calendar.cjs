'use strict';

require('../util/index.cjs');
require('../constant/index.cjs');
var lodashEs = require('lodash-es');
var util = require('../util/util.cjs');
var event = require('../constant/event.cjs');

"use strict";
const isValidRange = (range) => lodashEs.isArray(range) && range.length === 2 && range.every((item) => lodashEs.isDate(item));
const customCalendarProps = util.handleProps({
  // 标题
  calendarTitle: {
    type: String
  },
  // 显示popover 详情
  showDetail: {
    type: Boolean,
    default: false
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Date
  },
  /**
   * @description 时间范围，包括开始时间和结束时间。
   *   开始时间必须是星期的开始日，结束时间必须是一周的结束日，时间跨度不能超过两个月。
   */
  range: {
    type: util.definePropType(Array),
    validator: isValidRange
  },
  /**
   * @description 视图类型
   */
  viewType: {
    type: String,
    default: "DAY"
  },
  /**
   * @description 事件集合
   */
  events: {
    type: Array,
    default: []
  },
  legends: {
    type: Array,
    default: []
  },
  /**
   * @description 是否多选
   */
  multiple: {
    type: Boolean
  },
  /**
   * @description 选中事件数据集合
   */
  selectedData: {
    type: Object
  }
});
const customCalendarEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => lodashEs.isDate(value),
  [event.INPUT_EVENT]: (value) => lodashEs.isDate(value),
  [event.CHANGE_EVENT]: (value) => lodashEs.isDate(value),
  [event.EVENT_CLICK_EVENT]: (value) => value,
  [event.EVENT_DBL_CLICK_EVENT]: (value) => value
};

exports.customCalendarEmits = customCalendarEmits;
exports.customCalendarProps = customCalendarProps;
