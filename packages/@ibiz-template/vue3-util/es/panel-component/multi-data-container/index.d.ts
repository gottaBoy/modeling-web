import { MultiDataContainerState } from './multi-data-container.state';
import { MultiDataContainerController } from './multi-data-container.controller';
export { MultiDataContainerState, MultiDataContainerController };
export declare const IBizMultiDataContainer: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof MultiDataContainerController;
        required: true;
    };
}, {
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof MultiDataContainerController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizMultiDataContainer;
//# sourceMappingURL=index.d.ts.map