import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelItemRenderController } from './panel-item-render.controller';
/**
 * 面板项绘制器
 * @primary
 * @description 当面板项配置了绘制器时，面板内容由原来的组件替换为绘制器组件，绘制配置的脚本代码返回内容。
 */
export declare const PanelItemRender: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板项模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板项控制器
     */
    controller: {
        type: typeof PanelItemRenderController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    htmlCode: import("vue").ComputedRef<string | undefined>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板项模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板项控制器
     */
    controller: {
        type: typeof PanelItemRenderController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-item-render.d.ts.map