import { IPanelField } from '@ibiz/model-core';
import { PropType } from 'vue';
import { PanelFieldController } from './panel-field.controller';
import './panel-field.scss';
/**
 * 面板属性
 * @primary
 * @description 面板中的属性项，承载数据属性，内容为编辑器控件。
 */
export declare const PanelField: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 面板项模型数据
     */
    modelData: {
        type: PropType<IPanelField>;
        required: true;
    };
    /**
     * @description 面板项控制器
     */
    controller: {
        type: typeof PanelFieldController;
        required: true;
    };
    /**
     * @description 面板项属性
     */
    attrs: {
        type: PropType<import("@ibiz-template/core").IApiData>;
        require: boolean;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    showTitle: import("vue").ComputedRef<boolean>;
    onValueChange: (val: unknown, name?: string) => void;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 面板项模型数据
     */
    modelData: {
        type: PropType<IPanelField>;
        required: true;
    };
    /**
     * @description 面板项控制器
     */
    controller: {
        type: typeof PanelFieldController;
        required: true;
    };
    /**
     * @description 面板项属性
     */
    attrs: {
        type: PropType<import("@ibiz-template/core").IApiData>;
        require: boolean;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-field.d.ts.map