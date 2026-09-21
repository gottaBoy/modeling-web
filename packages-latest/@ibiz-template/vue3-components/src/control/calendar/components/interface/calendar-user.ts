/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dayjs } from 'dayjs';
import {
  UseSemanticClassReturn,
  UseSemanticStyleReturn,
} from '@ibiz-template/vue3-util';
import { ExtractPropTypes, PropType } from 'vue';
import { ICalendarItemData } from '@ibiz-template/runtime';
import { definePropType, handleProps } from '../util';

const calendarUserProps = handleProps({
  selectedDay: {
    type: definePropType<Dayjs>(Object),
    default: () => new Date(),
  },
  events: {
    type: Array<ICalendarItemData>,
    default: [],
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
type CalendarUserProps = ExtractPropTypes<typeof calendarUserProps>;
const calendarUserEmits = {
  eventClick: (value: IParams) => value,
  eventDblClick: (value: IParams) => value,
};
type CalendarUserEmits = typeof calendarUserEmits;

export { calendarUserEmits, calendarUserProps };

export type { CalendarUserEmits, CalendarUserProps };
