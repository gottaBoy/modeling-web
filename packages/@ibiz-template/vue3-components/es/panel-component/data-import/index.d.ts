export declare const IBizDataImport: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>;
    onDismiss: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizDataImport;
