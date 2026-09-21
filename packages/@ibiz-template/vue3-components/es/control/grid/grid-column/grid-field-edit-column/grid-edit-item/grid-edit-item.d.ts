import './grid-edit-item.scss';
export declare const IBizGridEditItem: import("vue").DefineComponent<{
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    showEditMask: {
        type: BooleanConstructor;
        default: boolean;
    };
    stopPropagation: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: {
        type: StringConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    tooltipContent: import("vue").ComputedRef<string | undefined>;
    showTooltip: import("vue").ComputedRef<string | undefined>;
    onClick: (e: MouseEvent) => void;
    onStopPropagation: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    maskClick: (_event: MouseEvent) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    showEditMask: {
        type: BooleanConstructor;
        default: boolean;
    };
    stopPropagation: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: {
        type: StringConstructor;
    };
}>> & {
    onMaskClick?: ((_event: MouseEvent) => any) | undefined;
}, {
    required: boolean;
    showEditMask: boolean;
    stopPropagation: boolean;
}, {}>;
export default IBizGridEditItem;
