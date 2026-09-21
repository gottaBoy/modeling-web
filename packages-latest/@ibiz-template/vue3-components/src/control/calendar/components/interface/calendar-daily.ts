/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Dayjs } from 'dayjs';
import {
  UseSemanticClassReturn,
  UseSemanticStyleReturn,
} from '@ibiz-template/vue3-util';
import type { ExtractPropTypes, PropType } from 'vue';
import { handleProps, definePropType, isObject } from '../util';
import type { IEvent, IUIEvent } from './common';
import { IUILegend } from '../../calendar';

const calendarDailyProps = handleProps({
  selectedDay: {
    type: definePropType<Dayjs>(Object),
  },
  events: {
    type: Array<IUIEvent>,
    default: [],
  },
  legends: {
    type: Array<IUILegend>,
    default: [],
  },
  multiple: {
    type: Boolean,
  },
  selectedData: {
    type: Object as unknown as IEvent,
  },
  showDetail: {
    type: Boolean,
    default: false,
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
type CalendarDailyProps = ExtractPropTypes<typeof calendarDailyProps>;
const calendarDailyEmits = {
  pick: (value: Dayjs) => isObject(value),
  eventClick: (value: IParams) => value,
  eventDblClick: (value: IParams) => value,
  eventContextmenu: (_value: IParams) => _value,
};
type CalendarDailyEmits = typeof calendarDailyEmits;

export { calendarDailyEmits, calendarDailyProps };

export type { CalendarDailyEmits, CalendarDailyProps };
