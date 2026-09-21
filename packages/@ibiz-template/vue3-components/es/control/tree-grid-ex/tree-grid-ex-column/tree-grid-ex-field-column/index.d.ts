export declare const IBizTreeGridExFieldColumn: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    controller: {
        type: typeof import("@ibiz-template/runtime").TreeGridExFieldColumnController;
        required: true;
    };
    row: {
        type: typeof import("@ibiz-template/runtime").TreeGridExRowState;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    nodeColumn: import("vue").ComputedRef<import("@ibiz-template/runtime").TreeGridExNodeColumnController | undefined>;
    fieldValue: import("vue").ComputedRef<any>;
    showText: import("vue").ComputedRef<any>;
    clickable: import("vue").ComputedRef<any>;
    tooltip: import("vue").ComputedRef<any>;
    onInfoTextChange: (text: string) => void;
    onTextClick: (event: MouseEvent) => void;
    onActionClick: (detail: import("@ibiz/model-core").IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof import("@ibiz-template/runtime").TreeGridExFieldColumnController;
        required: true;
    };
    row: {
        type: typeof import("@ibiz-template/runtime").TreeGridExRowState;
        required: true;
    };
}>>, {}, {}>>;
export default IBizTreeGridExFieldColumn;
