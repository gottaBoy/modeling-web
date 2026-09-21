export * from './panel-button-list.controller';
export declare const IBizPanelButtonList: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelButtonList>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-button-list.controller").PanelButtonListController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    handleClick: (e: MouseEvent, actionId: string) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelButtonList>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-button-list.controller").PanelButtonListController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelButtonList;
