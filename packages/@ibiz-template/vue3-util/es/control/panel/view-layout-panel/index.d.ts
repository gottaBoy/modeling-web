export declare const IBizViewLayoutPanelControl: import("../../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IViewLayoutPanel>;
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
}, {
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IViewLayoutPanel>;
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
}>>, {
    params: IParams;
}, {}>>;
export default IBizViewLayoutPanelControl;
//# sourceMappingURL=index.d.ts.map