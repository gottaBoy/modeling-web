import { PropType } from 'vue';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerController } from '@ibiz-template/runtime';
/**
 * 面板分页
 * @primary
 * @description 为分页面板下的分页子容器，此容器下才是面板成员。
 */
export declare const PanelTabPage: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板分页模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板分页控制器
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
     * @description 面板分页模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 面板分页控制器
     */
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-tab-page.d.ts.map