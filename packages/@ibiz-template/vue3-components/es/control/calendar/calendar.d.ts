import { PropType } from 'vue';
import { ISysCalendar } from '@ibiz/model-core';
import { CalendarController, ICalendarItemData, IControlProvider } from '@ibiz-template/runtime';
import './calendar.scss';
export declare const CalendarControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<ISysCalendar>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
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
    c: CalendarController;
    ns: import("@ibiz-template/core").Namespace;
    curPopover: import("vue").Ref<IData | undefined>;
    calendarRef: import("vue").Ref<IData | undefined>;
    showDateRange: import("vue").Ref<boolean>;
    popoverValue: import("vue").Ref<string>;
    selectDate: (tag: string) => void;
    calcItemStyle: (data: ICalendarItemData) => IData;
    calcCalendarItems: (date: Date) => ICalendarItemData[];
    onNodeContextmenu: (item: ICalendarItemData, evt: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<ISysCalendar>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
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
}, {}>;
