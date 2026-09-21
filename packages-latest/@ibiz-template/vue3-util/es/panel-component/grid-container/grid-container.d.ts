import { IFlexLayoutPos, IPanelContainer } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import { GridContainerController } from './grid-container.controller';
import './grid-container.scss';
/**
 * 栅格容器
 * @primary
 * @description 栅格容器，以栅格布局的方式呈现容器内容，支持自适应列数配置。
 */
export declare const GridContainer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 栅格容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 栅格容器控制器
     */
    controller: {
        type: typeof GridContainerController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
    classArr: import("vue").ComputedRef<(string | false)[]>;
    layoutModel: import("vue").ComputedRef<{
        layout: string;
        appId?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        codeName?: string | undefined;
        userParam?: Record<string, string> | undefined;
        modelId?: string | undefined;
        modelType?: string | undefined;
    }>;
    convertLayoutPos: (layoutPos: IFlexLayoutPos, adaptGrow: number) => IFlexLayoutPos;
    adaptGrow: Ref<number, number>;
    adaptCols: Ref<number | undefined, number | undefined>;
    semanticClass: import("../../use").UseSemanticClassReturn;
    semanticStyle: import("../../use").UseSemanticStyleReturn;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 栅格容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 栅格容器控制器
     */
    controller: {
        type: typeof GridContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=grid-container.d.ts.map