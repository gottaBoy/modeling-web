export declare const IBizViewLayoutPanelControl: import("../../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IViewLayoutPanel>;
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
}>, {
    c: import("@ibiz-template/runtime").ViewLayoutPanelController;
    ns: import("@ibiz-template/core").Namespace;
    renderPanelItem: (panelItem: import("@ibiz/model-core").IPanelItem, options?: {
        providers: {
            [key: string]: import("@ibiz-template/runtime").IPanelItemProvider;
        };
        panelItems: {
            [key: string]: import("@ibiz-template/runtime").IPanelItemController;
        };
    } | undefined) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IViewLayoutPanel>;
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
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizViewLayoutPanelControl;
//# sourceMappingURL=index.d.ts.map