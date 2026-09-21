import './devtool-collapse.scss';
export declare const DevToolCollapse: import("vue").DefineComponent<{
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: ArrayConstructor;
        default(): never[];
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    openArr: import("vue").ComputedRef<unknown[]>;
    updateVModel: (name: string, isOpen: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "change")[], "input" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: ArrayConstructor;
        default(): never[];
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
}, {
    accordion: boolean;
    value: unknown[];
}, {}>;
export default DevToolCollapse;
