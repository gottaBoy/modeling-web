import { PropType } from 'vue';
import { IPanel } from '@ibiz/model-core';
import { IControlProvider, IController, PanelController } from '@ibiz-template/runtime';
import './panel.scss';
/**
 * 视图布局面板组件
 */
export declare const PanelControl: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板模型数据
     */
    modelData: {
        type: PropType<IPanel>;
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
     * @description 视图参数对象
     * @default {}
     */
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    /**
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
     * @description 视图布局面板数据
     */
    data: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    c: PanelController<IPanel, import("@ibiz-template/runtime").IPanelState, import("@ibiz-template/runtime").IPanelEvent>;
    ns: import("@ibiz-template/core").Namespace;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板模型数据
     */
    modelData: {
        type: PropType<IPanel>;
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
     * @description 视图参数对象
     * @default {}
     */
    params: {
        type: PropType<import("@ibiz-template/core").IApiParams>;
        default: () => {};
    };
    /**
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
     * @description 视图布局面板数据
     */
    data: {
        type: PropType<import("@ibiz-template/core").IApiData>;
    };
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    params: import("@ibiz-template/core").IApiParams;
    loadDefault: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel.d.ts.map