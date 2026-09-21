import type { ExtractPropTypes } from 'vue';
import type { Dayjs } from 'dayjs';
declare const calendarDailyProps: IParams;
type CalendarDailyProps = ExtractPropTypes<typeof calendarDailyProps>;
declare const calendarDailyEmits: {
    pick: (value: Dayjs) => boolean;
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
};
type CalendarDailyEmits = typeof calendarDailyEmits;
export { calendarDailyEmits, calendarDailyProps };
export type { CalendarDailyEmits, CalendarDailyProps };
