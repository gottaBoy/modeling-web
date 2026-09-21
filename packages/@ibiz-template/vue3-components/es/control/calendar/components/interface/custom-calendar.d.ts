import type { ExtractPropTypes } from 'vue';
type CalendarDateType = 'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today';
declare const customCalendarProps: IParams;
type CustomCalendarProps = ExtractPropTypes<typeof customCalendarProps>;
declare const customCalendarEmits: {
    "update:modelValue": (value: Date) => boolean;
    input: (value: Date) => boolean;
    change: (value: Date) => boolean;
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
};
type CustomCalendarEmits = typeof customCalendarEmits;
export { customCalendarProps, customCalendarEmits };
export type { CustomCalendarEmits, CustomCalendarProps, CalendarDateType };
