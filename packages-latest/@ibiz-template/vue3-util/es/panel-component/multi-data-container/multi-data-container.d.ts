import { IPanelItemProvider, IPanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { PropType, VNode } from 'vue';
import { MultiDataContainerController } from './multi-data-container.controller';
import './multi-data-container.scss';
/**
 * 多项数据容器
 * @primary
 * @description 要求配置的自定义数据源为数组格式，会根据数据源数组循环绘制子布局组件，每次循环，对应绘制的子组件的数据为对应数据项。
 */
export declare const MultiDataContainer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 多项数据容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 多项数据容器控制器
     */
    controller: {
        type: typeof MultiDataContainerController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    renderPanelItem: (panelItem: IPanelItem, options?: {
        providers: {
            [key: string]: IPanelItemProvider;
        };
        panelItems: {
            [key: string]: IPanelItemController;
        };
    }) => VNode | null;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 多项数据容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 多项数据容器控制器
     */
    controller: {
        type: typeof MultiDataContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=multi-data-container.d.ts.map