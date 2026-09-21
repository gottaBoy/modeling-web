export declare const IBizCustomCalendar: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<IParams, {
    ns: import("@ibiz-template/core").Namespace;
    date: any;
    validatedRange: any;
    pickDay: any;
    selectDate: any;
    renderContent: () => JSX.Element | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Date) => boolean;
    input: (value: Date) => boolean;
    change: (value: Date) => boolean;
    eventClick: (value: IParams) => IParams;
    eventDblClick: (value: IParams) => IParams;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<IParams>> & {
    onChange?: ((value: Date) => any) | undefined;
    onInput?: ((value: Date) => any) | undefined;
    "onUpdate:modelValue"?: ((value: Date) => any) | undefined;
    onEventClick?: ((value: IParams) => any) | undefined;
    onEventDblClick?: ((value: IParams) => any) | undefined;
}, {
    [x: string]: any;
    [x: symbol]: any;
}, {}>>;
export default IBizCustomCalendar;
