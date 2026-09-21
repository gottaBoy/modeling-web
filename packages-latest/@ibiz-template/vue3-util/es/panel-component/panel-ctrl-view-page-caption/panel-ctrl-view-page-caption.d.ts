import { PropType } from 'vue';
import { PanelCtrlViewPageCaptionController } from './panel-ctrl-view-page-caption.controller';
import './panel-ctrl-view-page-caption.scss';
/**
 * 视图标题
 * @primary
 * @description 视图的标题组件，只存在于视图布局面板中。
 */
export declare const PanelCtrlViewPageCaption: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 视图标题模型
     */
    modelData: {
        type: PropType<import("@ibiz/model-core").IPanelItem>;
        required: true;
    };
    /**
     * @description 视图标题控制器
     */
    controller: {
        type: PropType<PanelCtrlViewPageCaptionController>;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 视图标题模型
     */
    modelData: {
        type: PropType<import("@ibiz/model-core").IPanelItem>;
        required: true;
    };
    /**
     * @description 视图标题控制器
     */
    controller: {
        type: PropType<PanelCtrlViewPageCaptionController>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-ctrl-view-page-caption.d.ts.map