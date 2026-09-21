import { IPanelItemProvider, IPanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { PropType, VNode } from 'vue';
import { MultiDataContainerRawController } from './multi-data-container-raw.controller';
import './multi-data-container-raw.scss';
/**
 * 多项数据容器（仅数据）
 * @primary
 * @description 与多项数据容器类似，唯一不同的是不根据数据循环绘制所有子，只绘制一遍，但所有数据都会传递给子组件。
 */
export declare const MultiDataContainerRaw: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 多项数据容器（仅数据）模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 多项数据容器（仅数据）控制器
     */
    controller: {
        type: typeof MultiDataContainerRawController;
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
     * @description 多项数据容器（仅数据）模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 多项数据容器（仅数据）控制器
     */
    controller: {
        type: typeof MultiDataContainerRawController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=multi-data-container-raw.d.ts.map