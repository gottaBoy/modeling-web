import './calendar-user.scss';
export declare const CalendarUser: import("vue").DefineComponent<IParams, {
    ns: import("@ibiz-template/core").Namespace;
    renderWeekHeader: () => JSX.Element;
    renderWeekContent: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<IParams>> & {
    onEventClick?: ((value: IParams) => any) | undefined;
    onEventDblClick?: ((value: IParams) => any) | undefined;
}, {
    [x: string]: any;
    [x: symbol]: any;
}, {}>;
