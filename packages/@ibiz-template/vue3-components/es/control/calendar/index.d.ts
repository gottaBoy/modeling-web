export declare const IBizCalendarControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").ISysCalendar>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import("@ibiz-template/runtime").CalendarController;
    ns: import("@ibiz-template/core").Namespace;
    curPopover: import("vue").Ref<IData | undefined>;
    calendarRef: import("vue").Ref<IData | undefined>;
    showDateRange: import("vue").Ref<boolean>;
    popoverValue: import("vue").Ref<string>;
    selectDate: (tag: string) => void;
    calcItemStyle: (data: import("@ibiz-template/runtime").ICalendarItemData) => IData;
    calcCalendarItems: (date: Date) => import("@ibiz-template/runtime").ICalendarItemData[];
    onNodeContextmenu: (item: import("@ibiz-template/runtime").ICalendarItemData, evt: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").ISysCalendar>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    mdctrlActiveMode: {
        type: NumberConstructor;
        default: undefined;
    };
    isSimple: {
        type: BooleanConstructor;
        required: false;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    mdctrlActiveMode: number;
    isSimple: boolean;
    loadDefault: boolean;
}, {}>>;
export default IBizCalendarControl;
