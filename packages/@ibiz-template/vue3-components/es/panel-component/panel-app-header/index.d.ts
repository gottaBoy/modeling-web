export declare const IBizPanelAppHeader: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    isCollapse: import("vue").Ref<boolean>;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    changeCollapse: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelAppHeader;
