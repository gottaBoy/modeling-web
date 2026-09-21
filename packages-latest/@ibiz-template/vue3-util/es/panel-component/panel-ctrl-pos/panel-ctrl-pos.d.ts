import { PropType } from 'vue';
import { PanelCtrlPosController } from './panel-ctrl-pos.controller';
import './panel-ctrl-pos.scss';
/**
 * 面板部件占位
 * @primary
 * @description 面板中的动态部件占位组件，用于绘制实体部件。
 */
export declare const PanelCtrlPos: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板部件占位模型数据
     */
    modelData: {
        type: PropType<import("@ibiz/model-core").IPanelItem>;
        required: true;
    };
    /**
     * @description 面板部件占位控制器
     */
    controller: {
        type: PropType<PanelCtrlPosController>;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板部件占位模型数据
     */
    modelData: {
        type: PropType<import("@ibiz/model-core").IPanelItem>;
        required: true;
    };
    /**
     * @description 面板部件占位控制器
     */
    controller: {
        type: PropType<PanelCtrlPosController>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-ctrl-pos.d.ts.map