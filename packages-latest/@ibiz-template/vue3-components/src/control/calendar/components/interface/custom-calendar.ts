/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ILegend } from '@ibiz-template/runtime';
import type { ExtractPropTypes, PropType } from 'vue';
import {
  UseSemanticClassReturn,
  UseSemanticStyleReturn,
} from '@ibiz-template/vue3-util';
import { isDate, isArray, handleProps, definePropType } from '../util';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  EVENT_CLICK_EVENT,
  UPDATE_MODEL_EVENT,
  EVENT_CONTEXT_MENU,
  EVENT_DBL_CLICK_EVENT,
} from '../constant';
import type { IEvent, ViewType } from './common';

type CalendarDateType =
  | 'prev-month'
  | 'next-month'
  | 'prev-year'
  | 'next-year'
  | 'today';

/**
 * @description 是否为有效时间范围
 * @param {*} range
 * @returns {range is [Date, Date]}
 */
const isValidRange = (range: IData): range is [Date, Date] =>
  isArray(range) &&
  range.length === 2 &&
  range.every((item: Date) => isDate(item));

const customCalendarProps = handleProps({
  // 标题
  calendarTitle: {
    type: String,
  },

  // 显示popover 详情
  showDetail: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Date,
  },
  /**
   * @description 时间范围，包括开始时间和结束时间。
   *   开始时间必须是星期的开始日，结束时间必须是一周的结束日，时间跨度不能超过两个月。
   */
  range: {
    type: definePropType<[Date, Date]>(Array),
    validator: isValidRange,
  },
  /**
   * @description 视图类型
   */
  viewType: {
    type: String as unknown as ViewType,
    default: 'DAY',
  },
  /**
   * @description 事件集合
   */
  events: {
    type: Array<IEvent>,
    default: [],
  },
  legends: {
    type: Array<ILegend>,
    default: [],
  },
  /**
   * @description 是否多选
   */
  multiple: {
    type: Boolean,
  },
  /**
   * @description 选中事件数据集合
   */
  selectedData: {
    type: Object as unknown as IEvent,
  },
  semanticClass: {
    type: Function as PropType<UseSemanticClassReturn>,
    required: true,
  },
  semanticStyle: {
    type: Function as PropType<UseSemanticStyleReturn>,
    required: true,
  },
} as const);

type CustomCalendarProps = ExtractPropTypes<typeof customCalendarProps>;

const customCalendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: Date) => isDate(value),
  [INPUT_EVENT]: (value: Date) => isDate(value),
  [CHANGE_EVENT]: (value: Date) => isDate(value),
  [EVENT_CLICK_EVENT]: (value: IParams) => value,
  [EVENT_DBL_CLICK_EVENT]: (value: IParams) => value,
  [EVENT_CONTEXT_MENU]: (_value: IParams) => _value,
};
type CustomCalendarEmits = typeof customCalendarEmits;

export { customCalendarProps, customCalendarEmits };
export type { CustomCalendarEmits, CustomCalendarProps, CalendarDateType };
