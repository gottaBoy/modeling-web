import '../util/index.mjs';
import '../constant/index.mjs';
import { isArray, isDate } from 'lodash-es';
import { handleProps, definePropType } from '../util/util.mjs';
import { UPDATE_MODEL_EVENT, INPUT_EVENT, CHANGE_EVENT, EVENT_CLICK_EVENT, EVENT_DBL_CLICK_EVENT } from '../constant/event.mjs';

"use strict";
const isValidRange = (range) => isArray(range) && range.length === 2 && range.every((item) => isDate(item));
const customCalendarProps = handleProps({
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
    type: definePropType(Array),
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
  [UPDATE_MODEL_EVENT]: (value) => isDate(value),
  [INPUT_EVENT]: (value) => isDate(value),
  [CHANGE_EVENT]: (value) => isDate(value),
  [EVENT_CLICK_EVENT]: (value) => value,
  [EVENT_DBL_CLICK_EVENT]: (value) => value
};

export { customCalendarEmits, customCalendarProps };
