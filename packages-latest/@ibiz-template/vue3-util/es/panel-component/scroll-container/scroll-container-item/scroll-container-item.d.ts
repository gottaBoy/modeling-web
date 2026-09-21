import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { ScrollContainerItemController } from './scroll-container-item.controller';
import './scroll-container-item.scss';
/**
 * 面板滚动容器项
 * @primary
 * @description 用于绘制面板滚动容器项。
 */
export declare const ScrollContainerItem: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板滚动容器项模型数据
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板滚动容器项控制器
     */
    controller: {
        type: typeof ScrollContainerItemController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    semanticClass: import("../../../use").UseSemanticClassReturn;
    semanticStyle: import("../../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板滚动容器项模型数据
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板滚动容器项控制器
     */
    controller: {
        type: typeof ScrollContainerItemController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=scroll-container-item.d.ts.map