import { IPanelRawItem } from '@ibiz/model-core';
import { PropType } from 'vue';
import './teleport-placeholder.scss';
import { TeleportPlaceholderController } from './teleport-placeholder.controller';
/**
 * 传送占位
 * @primary
 * @description 使用vue的Teleport内置组件，用于绘制嵌入视图中的面板成员。
 * @panelitemparams {name:TeleportTag,parameterType:string,description:传送占位面板项与需传送部件的关联标识，其值必须与部件参数（teleporttag）的值一致}
 */
export declare const TeleportPlaceholder: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 传送占位模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 传送占位控制器
     */
    controller: {
        type: PropType<TeleportPlaceholderController>;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    tempStyle: import("vue").Ref<string, string>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 传送占位模型
     */
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    /**
     * @description 传送占位控制器
     */
    controller: {
        type: PropType<TeleportPlaceholderController>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=teleport-placeholder.d.ts.map