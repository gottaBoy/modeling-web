export * from './panel-rawitem.controller';
export declare const IBizPanelRawItem: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-rawitem.controller").PanelRawItemController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    tempStyle: import("vue").Ref<string, string>;
    content: import("vue").Ref<string | number | undefined, string | number | undefined>;
    semanticClass: import("../..").UseSemanticClassReturn;
    semanticStyle: import("../..").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-rawitem.controller").PanelRawItemController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizPanelRawItem;
//# sourceMappingURL=index.d.ts.map