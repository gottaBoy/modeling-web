export declare const IBizFormTabPanel: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormTabPanel>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormTabPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onTabClick: (tabIns: IData, event: MouseEvent) => void;
    counterData: IData;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormTabPanel>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormTabPanelController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormTabPanel;
