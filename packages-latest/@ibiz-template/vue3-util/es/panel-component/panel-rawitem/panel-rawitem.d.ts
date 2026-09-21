import { IPanelRawItem } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { PanelRawItemController } from './panel-rawitem.controller';
import './panel-rawitem.scss';
/**
 * 直接内容
 * @primary
 * @description 绘制面板中的直接内容，支持HTML内容、视频内容、图片内容等。
 */
export declare const PanelRawItem: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板直接内容项模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 面板直接内容控制器
     */
    controller: {
        type: typeof PanelRawItemController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    tempStyle: Ref<string, string>;
    content: Ref<string | number | undefined, string | number | undefined>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板直接内容项模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 面板直接内容控制器
     */
    controller: {
        type: typeof PanelRawItemController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-rawitem.d.ts.map