export declare const IBizPanelControl: import("../../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanel>;
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
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    container: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    data: import("vue").PropType<IData>;
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    c: import("@ibiz-template/runtime").PanelController<import("@ibiz/model-core").IPanel, import("@ibiz-template/runtime").IPanelState, import("@ibiz-template/runtime").IPanelEvent>;
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanel>;
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
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    container: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    data: import("vue").PropType<IData>;
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    params: IParams;
    loadDefault: boolean;
}, {}>>;
export default IBizPanelControl;
//# sourceMappingURL=index.d.ts.map