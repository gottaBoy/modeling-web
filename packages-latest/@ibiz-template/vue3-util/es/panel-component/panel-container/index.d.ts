import { PanelContainerController, PanelContainerState } from '@ibiz-template/runtime';
export { PanelContainerState, PanelContainerController };
export declare const IBizPanelContainer: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    semanticClass: import("../..").UseSemanticClassReturn;
    semanticStyle: import("../..").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizPanelContainer;
//# sourceMappingURL=index.d.ts.map