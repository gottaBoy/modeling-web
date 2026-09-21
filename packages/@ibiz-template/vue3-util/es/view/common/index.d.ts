export declare const IBizView: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    context: import("vue").PropType<IContext>;
    params: {
        type: import("vue").PropType<IParams>;
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
        type: import("vue").PropType<IData>;
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IViewProvider>;
    };
}, {
    c: import("@ibiz-template/runtime").ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[];
    teleportControls: import("@ibiz/model-core").IControl[];
    viewClassNames: import("vue").ComputedRef<(string | string[] | undefined)[]>;
    onLayoutPanelCreated: (controller: import("@ibiz-template/runtime").IViewLayoutPanelController) => void;
    getCtrlProps: (ctrl: import("@ibiz/model-core").IControl, slotProps?: IData) => IParams;
    renderControl: (ctrl: import("@ibiz/model-core").IControl, slotProps?: IData) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    getCtrlTeleportTag: (ctrl: import("@ibiz/model-core").IControl) => string | undefined;
    getControlStyle: () => {};
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: import("vue").PropType<IContext>;
    params: {
        type: import("vue").PropType<IParams>;
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
        type: import("vue").PropType<IData>;
    };
    provider: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IViewProvider>;
    };
}>>, {
    params: IParams;
}, {}>>;
//# sourceMappingURL=index.d.ts.map