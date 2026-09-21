import type { ExtractPropTypes } from 'vue';
import type { Dayjs } from 'dayjs';
declare const calendarWeekProps: IParams;
type CalendarWeekProps = ExtractPropTypes<typeof calendarWeekProps>;
declare const calendarWeekEmits: {
    pick: (value: Dayjs) => boolean;
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
};
type CalendarWeekEmits = typeof calendarWeekEmits;
export { calendarWeekEmits, calendarWeekProps };
export type { CalendarWeekEmits, CalendarWeekProps };
