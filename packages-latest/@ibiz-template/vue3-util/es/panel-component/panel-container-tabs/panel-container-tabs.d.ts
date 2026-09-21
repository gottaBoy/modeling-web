import { PanelContainerController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PropType } from 'vue';
import './panel-container-tabs.scss';
/**
 * 分页容器
 * @primary
 * @description 以分页的形式呈现容器内容，每个分页下为面板分页组件。
 */
export declare const PanelContainerTabs: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * @description 分页容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 分页容器控制器
     */
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>, {
    ns: import("@ibiz-template/core").Namespace;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description 分页容器模型
     */
    modelData: {
        type: PropType<IPanelContainer>;
        required: true;
    };
    /**
     * @description 分页容器控制器
     */
    controller: {
        type: typeof PanelContainerController;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
//# sourceMappingURL=panel-container-tabs.d.ts.map