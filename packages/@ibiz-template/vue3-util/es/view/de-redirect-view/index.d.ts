export declare const IBizDeRedirectView: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDERedirectView>;
        required: true;
    };
}, {
    c: import("@ibiz-template/runtime").ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    toViewId: import("vue").Ref<string | undefined>;
    toViewContext: import("vue").Ref<IContext | undefined>;
    toViewParams: import("vue").Ref<IParams | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: import("vue").PropType<IContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<IParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDERedirectView>;
        required: true;
    };
}>>, {
    params: IParams;
}, {}>>;
//# sourceMappingURL=index.d.ts.map