export declare const IBizView: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
    };
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IModal>;
    };
    state: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiData>;
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IViewProvider>;
    };
}>, {
    c: import("@ibiz-template/runtime").ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[];
    teleportControls: import("@ibiz/model-core").IControl[];
    viewClassNames: import("vue").ComputedRef<(string | string[] | undefined)[]>;
    onLayoutPanelCreated: (controller: import("@ibiz-template/runtime").IViewLayoutPanelController) => void;
    getCtrlProps: (ctrl: import("@ibiz/model-core").IControl, slotProps?: import("@ibiz-template/core").IApiData) => import("@ibiz-template/core").IApiParams;
    renderControl: (ctrl: import("@ibiz/model-core").IControl, slotProps?: import("@ibiz-template/core").IApiData) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    getCtrlTeleportTag: (ctrl: import("@ibiz/model-core").IControl) => string | undefined;
    getControlStyle: () => {};
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
    };
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IModal>;
    };
    state: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiData>;
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IViewProvider>;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
//# sourceMappingURL=index.d.ts.map