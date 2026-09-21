import { PropType, VNode } from 'vue';
import { IPanelItem, IViewLayoutPanel } from '@ibiz/model-core';
import { IController, IControlProvider, IPanelItemController, IPanelItemProvider, ViewLayoutPanelController } from '@ibiz-template/runtime';
import './view-layout-panel.scss';
/**
 * 视图布局面板组件
 */
export declare const ViewLayoutPanelControl: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 视图布局面板模型
     */
    modelData: {
        type: PropType<IViewLayoutPanel>;
        required: true;
    };
    /**
     * @description 应用上下文对象
     */
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    /**
     * @description 视图参数
     * @default {}
     */
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    /**
     * @ignoredoc
     * @description 部件适配器
     */
    provider: {
        type: PropType<IControlProvider>;
    };
    /**
     * @description 容器控制器,为上层部件控制器或视图控制器
     */
    container: {
        type: PropType<IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    /**
     * @description 面板容器数据
     */
    data: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>, {
    c: ViewLayoutPanelController;
    ns: import("@ibiz-template/core").Namespace;
    renderPanelItem: (panelItem: IPanelItem, options?: {
        providers: {
            [key: string]: IPanelItemProvider;
        };
        panelItems: {
            [key: string]: IPanelItemController;
        };
    }) => VNode | null;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 视图布局面板模型
     */
    modelData: {
        type: PropType<IViewLayoutPanel>;
        required: true;
    };
    /**
     * @description 应用上下文对象
     */
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: true;
    };
    /**
     * @description 视图参数
     * @default {}
     */
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    /**
     * @ignoredoc
     * @description 部件适配器
     */
    provider: {
        type: PropType<IControlProvider>;
    };
    /**
     * @description 容器控制器,为上层部件控制器或视图控制器
     */
    container: {
        type: PropType<IController<import("@ibiz/model-core").IModelObject, object, import("@ibiz-template/runtime").IComponentEvent>>;
    };
    /**
     * @description 面板容器数据
     */
    data: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=view-layout-panel.d.ts.map