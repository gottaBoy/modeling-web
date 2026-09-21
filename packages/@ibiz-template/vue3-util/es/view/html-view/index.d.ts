export declare const IBizHtmlView: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    context: import("vue").PropType<IContext>;
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppPortalView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IModal>;
    };
    state: {
        type: import("vue").PropType<IData>;
    };
}, {
    c: import("@ibiz-template/runtime").ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[] | undefined;
    viewClassNames: (string | undefined)[];
    url: import("vue").ComputedRef<any>;
    isLoading: import("vue").Ref<boolean>;
    onLoad: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: import("vue").PropType<IContext>;
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppPortalView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz-template/runtime").IModal>;
    };
    state: {
        type: import("vue").PropType<IData>;
    };
}>>, {
    params: IParams;
}, {}>>;
//# sourceMappingURL=index.d.ts.map