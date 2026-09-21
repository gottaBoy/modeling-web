declare const _default: import("vue").DefineComponent<{
    chartType: {
        type: StringConstructor;
        default: string;
    };
}, {
    ns: Namespace;
    items: import("vue").Ref<any[]>;
    select: import("vue").Ref<string>;
    onSelect: (item: IData) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "select"[], "select", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    chartType: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
}, {
    chartType: string;
}, {}>;
export default _default;
