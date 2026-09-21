import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: StringConstructor;
    };
    editorStyle: {
        type: PropType<"DIRECTION" | "CENTER">;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: Namespace;
    selected: import("vue").Ref<string>;
    onSelect: (item: IData) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
    };
    editorStyle: {
        type: PropType<"DIRECTION" | "CENTER">;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    editorStyle: "DIRECTION" | "CENTER";
    disabled: boolean;
    showCenter: boolean;
}, {}>;
export default _default;
