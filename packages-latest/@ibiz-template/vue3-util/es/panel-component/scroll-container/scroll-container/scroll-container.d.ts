import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { ScrollContainerController } from './scroll-container.controller';
import './scroll-container.scss';
/**
 * 滚动容器
 * @primary
 * @description 撑满父容器，并为内部元素提供超出滚动效果，可配置上下左右元素。
 */
export declare const ScrollContainer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 滚动容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 滚动容器控制器
     */
    controller: {
        type: typeof ScrollContainerController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    semanticClass: import("../../../use").UseSemanticClassReturn;
    semanticStyle: import("../../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 滚动容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 滚动容器控制器
     */
    controller: {
        type: typeof ScrollContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=scroll-container.d.ts.map