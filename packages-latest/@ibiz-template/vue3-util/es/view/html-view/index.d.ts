export declare const IBizHtmlView: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    context: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDEHtmlView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDEHtmlView>;
    };
    state: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiData>;
    };
}>, {
    c: import("@ibiz-template/runtime").HtmlViewController<import("@ibiz/model-core").IAppDEHtmlView, import("@ibiz-template/runtime").IHtmlViewState, import("@ibiz-template/runtime").IViewEvent>;
    ns: import("@ibiz-template/core").Namespace;
    controls: import("@ibiz/model-core").IControl[] | undefined;
    viewClassNames: (string | undefined)[];
    isLoading: import("vue").Ref<boolean, boolean>;
    onLoad: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    context: import("vue").PropType<import("@ibiz-template/core").IApiContext>;
    params: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDEHtmlView>;
        required: true;
    };
    modal: {
        type: import("vue").PropType<import("@ibiz/model-core").IAppDEHtmlView>;
    };
    state: {
        type: import("vue").PropType<import("@ibiz-template/core").IApiData>;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
//# sourceMappingURL=index.d.ts.map