export declare const IBizDeRedirectView: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDERedirectView>;
        required: true;
    };
    isEmbedCtrlNav: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    c: import("@ibiz-template/runtime").ViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>;
    toViewId: import("vue").Ref<string | undefined, string | undefined>;
    toViewContext: import("vue").Ref<import("@ibiz-template/core").IApiContext | undefined, import("@ibiz-template/core").IApiContext | undefined>;
    toViewParams: import("vue").Ref<import("@ibiz-template/core").IApiParams | undefined, import("@ibiz-template/core").IApiParams | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDERedirectView>;
        required: true;
    };
    isEmbedCtrlNav: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
    isEmbedCtrlNav: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
//# sourceMappingURL=index.d.ts.map