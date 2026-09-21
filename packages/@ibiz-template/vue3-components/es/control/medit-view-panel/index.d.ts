export declare const IBizMEditViewPanelControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEMultiEditViewPanel>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
}, {
    c: import("@ibiz-template/runtime").MEditViewPanelController;
    ns: import("@ibiz-template/core").Namespace;
    panelContent: import("vue").Ref<Element | null>;
    handleDelete: (item: import("@ibiz-template/runtime").IPanelUiItem) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDEMultiEditViewPanel>;
        required: true;
    };
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
}>>, {
    params: IParams;
}, {}>>;
export default IBizMEditViewPanelControl;
