export declare const IBizPanelTabPanel: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelTabPanel>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-tab-panel.controller").PanelTabPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    state: import("./panel-tab-panel.state").PanelTabPanelState;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    onTabClick: (tabIns: IData, event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelTabPanel>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-tab-panel.controller").PanelTabPanelController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelTabPanel;
