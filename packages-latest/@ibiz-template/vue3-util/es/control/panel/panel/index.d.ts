export declare const IBizPanelControl: import("../../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanel>;
        required: true;
    };
    context: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    container: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    data: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiData>;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    c: import("@ibiz-template/runtime").PanelController<import("@ibiz/model-core").IPanel, import("@ibiz-template/runtime").IPanelState, import("@ibiz-template/runtime").IPanelEvent>;
    ns: import("@ibiz-template/core").Namespace;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanel>;
        required: true;
    };
    context: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IControlProvider>;
    };
    container: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    data: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiData>;
    };
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
    loadDefault: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizPanelControl;
//# sourceMappingURL=index.d.ts.map