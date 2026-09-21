import { IPanelItemProvider, IPanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer, IPanelItem } from '@ibiz/model-core';
import { PropType, VNode } from 'vue';
import { SingleDataContainerController } from './single-data-container.controller';
import './single-data-container.scss';
/**
 * 单项数据容器
 * @primary
 * @description 用于配置自定义数据源，该容器内的子面板项中的数据由此容器提供。
 * @param {*} props
 * @return {*}
 */
export declare const SingleDataContainer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 单项数据容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 单项数据容器控制器
     */
    controller: {
        type: typeof SingleDataContainerController;
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
     * @description 单项数据容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 单项数据容器控制器
     */
    controller: {
        type: typeof SingleDataContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=single-data-container.d.ts.map