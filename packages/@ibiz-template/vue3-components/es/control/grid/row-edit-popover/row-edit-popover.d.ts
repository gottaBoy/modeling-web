import './row-edit-popover.scss';
export declare const IBizRowEditPopover: import("vue").DefineComponent<{
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onCancel: () => void;
    onConfirm: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: () => true;
    cancel: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onConfirm?: (() => any) | undefined;
    onCancel?: (() => any) | undefined;
}, {
    show: boolean;
}, {}>;
