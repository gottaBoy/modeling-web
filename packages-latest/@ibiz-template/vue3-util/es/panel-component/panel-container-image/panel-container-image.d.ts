import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelContainerImageController } from './panel-container-image.controller';
import './panel-container-image.scss';
/**
 * 图片背景容器
 * @primary
 * @description 图片背景容器，可以配置容器的背景图片。
 */
export declare const PanelContainerImage: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 图片背景容器模型数据
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 图片背景容器控制器
     */
    controller: {
        type: typeof PanelContainerImageController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    backgroundStyle: import("vue").ComputedRef<{}>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 图片背景容器模型数据
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 图片背景容器控制器
     */
    controller: {
        type: typeof PanelContainerImageController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-container-image.d.ts.map