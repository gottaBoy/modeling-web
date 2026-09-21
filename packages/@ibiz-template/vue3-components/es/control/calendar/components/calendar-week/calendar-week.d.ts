import './calendar-week.scss';
export declare const CalendarWeek: import("vue").DefineComponent<IParams, {
    ns: import("@ibiz-template/core").Namespace;
    calendarWeek: import("vue").Ref<any>;
    renderHeader: () => JSX.Element;
    renderContent: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    pick: (value: import("dayjs").Dayjs) => boolean;
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<IParams>> & {
    onPick?: ((value: import("dayjs").Dayjs) => any) | undefined;
    onEventClick?: ((value: IParams) => any) | undefined;
    onEventDblClick?: ((value: IParams) => any) | undefined;
}, {
    [x: string]: any;
    [x: symbol]: any;
}, {}>;
