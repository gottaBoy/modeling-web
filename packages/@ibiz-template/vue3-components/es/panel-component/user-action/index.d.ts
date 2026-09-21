export declare const IBizUserAction: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>;
    sysImage: import("@ibiz/model-core").ISysImage | undefined;
    onClick: (event: Event) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").PanelItemController<import("@ibiz/model-core").IPanelItem>>;
        required: true;
    };
}>>, {}, {}>>;
export default IBizUserAction;
