import { PanelContainerController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import './panel-container.scss';
/**
 * 面板容器
 * @primary
 * @description 面板中最常见容器控件，承载面板组件，可以配置布局来控制内容呈现方式。
 */
export declare const PanelContainer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板容器控制器
     */
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板容器控制器
     */
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-container.d.ts.map