export declare const IBizFormGroupPanel: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormGroupPanel>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormGroupPanelController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    captionText: import("vue").ComputedRef<any>;
    changeCollapse: () => void;
    onActionClick: (detail: import("@ibiz/model-core").IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEFormGroupPanel>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").FormGroupPanelController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormGroupPanel;
