import { ExtractPropTypes } from 'vue';
declare const calendarUserProps: IParams;
type CalendarUserProps = ExtractPropTypes<typeof calendarUserProps>;
declare const calendarUserEmits: {
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
};
type CalendarUserEmits = typeof calendarUserEmits;
export { calendarUserEmits, calendarUserProps };
export type { CalendarUserEmits, CalendarUserProps };
