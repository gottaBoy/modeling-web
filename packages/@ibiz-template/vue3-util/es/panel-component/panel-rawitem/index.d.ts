export * from './panel-rawitem.controller';
export declare const IBizPanelRawItem: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-rawitem.controller").PanelRawItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    tempStyle: import("vue").Ref<string>;
    content: import("vue").Ref<string | number | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./panel-rawitem.controller").PanelRawItemController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelRawItem;
//# sourceMappingURL=index.d.ts.map