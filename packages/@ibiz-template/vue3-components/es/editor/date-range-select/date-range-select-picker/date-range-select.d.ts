import { PropType } from 'vue';
import { DateRangeSelectEditorController } from '../date-range-select.controller';
import './date-range-select.scss';
export declare const IBizDateRangeSelect: import("vue").DefineComponent<{
    value: {
        type: PropType<IData>;
    };
    controller: import("@ibiz-template/vue3-util").RequiredProp<PropType<DateRangeSelectEditorController>, undefined, undefined>;
    data: import("@ibiz-template/vue3-util").RequiredProp<PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: DateRangeSelectEditorController;
    renderDateUnit: () => JSX.Element;
    renderDateRange: () => JSX.Element;
    onOpen: (_event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<IData>;
    };
    controller: import("@ibiz-template/vue3-util").RequiredProp<PropType<DateRangeSelectEditorController>, undefined, undefined>;
    data: import("@ibiz-template/vue3-util").RequiredProp<PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    readonly: boolean;
    autoFocus: boolean;
}, {}>;
