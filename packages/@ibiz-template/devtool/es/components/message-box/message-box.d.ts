import './message-box.scss';
export declare const MessageBox: import("vue").DefineComponent<{
    isShowDialog: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    showCloseIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    isShowFoot: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    clickMaskCloseFn: () => void;
    closeDialog: (type?: string) => void;
    renderSvg: () => JSX.Element;
    clickButton: (type: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("hasClosed" | "changeDialog")[], "hasClosed" | "changeDialog", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    isShowDialog: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    showCloseIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    isShowFoot: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onHasClosed?: ((...args: any[]) => any) | undefined;
    onChangeDialog?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    mask: boolean;
    isShowDialog: boolean;
    showCloseIcon: boolean;
    isShowFoot: boolean;
}, {}>;
export default MessageBox;
