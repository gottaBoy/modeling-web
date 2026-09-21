export * from './panel-app-title.controller';
export declare const IBizPanelAppTitle: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelField>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-app-title.controller").PanelAppTitleController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("./panel-app-title.controller").PanelAppTitleController;
    menuAlign: import("vue").ComputedRef<string>;
    showImgOnly: import("vue").ComputedRef<boolean>;
    handleClick: () => Promise<void>;
    isCollapse: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelField>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-app-title.controller").PanelAppTitleController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelAppTitle;
