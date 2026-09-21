import { MultiDataContainerRawState } from './multi-data-container-raw.state';
import { MultiDataContainerRawController } from './multi-data-container-raw.controller';
export { MultiDataContainerRawState, MultiDataContainerRawController };
export declare const IBizMultiDataContainerRaw: import("../../util").TypeWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof MultiDataContainerRawController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
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
    semanticClass: import("../..").UseSemanticClassReturn;
    semanticStyle: import("../..").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof MultiDataContainerRawController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default IBizMultiDataContainerRaw;
//# sourceMappingURL=index.d.ts.map