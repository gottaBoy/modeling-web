import { PropType } from 'vue';
import './ibiz-color-mpicker-default.scss';
export declare const IBizColorMPickerDefault: import("vue").DefineComponent<{
    value: {
        type: (ArrayConstructor | StringConstructor)[];
    };
    customColorList: {
        type: StringConstructor;
    };
    type: {
        type: PropType<"ITEM" | "ITEMS">;
        default: string;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    curType: import("vue").Ref<string>;
    curTemplateColor: import("vue").Ref<string>;
    showTemplateList: import("vue").Ref<boolean>;
    colorType: IData[];
    templateColorList: import("vue").ComputedRef<any>;
    handleTemplateColorChange: () => void;
    handleSchemeChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: (ArrayConstructor | StringConstructor)[];
    };
    customColorList: {
        type: StringConstructor;
    };
    type: {
        type: PropType<"ITEM" | "ITEMS">;
        default: string;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    type: "ITEM" | "ITEMS";
    disabled: boolean;
    readonly: boolean;
}, {}>;
