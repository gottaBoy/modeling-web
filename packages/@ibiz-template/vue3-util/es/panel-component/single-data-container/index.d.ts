import { SingleDataContainerState } from './single-data-container.state';
import { SingleDataContainerController } from './single-data-container.controller';
export { SingleDataContainerState, SingleDataContainerController };
export declare const IBizSingleDataContainer: import("../../util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelContainer>;
        required: true;
    };
    controller: {
        type: typeof SingleDataContainerController;
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
        type: typeof SingleDataContainerController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizSingleDataContainer;
//# sourceMappingURL=index.d.ts.map