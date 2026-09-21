import { PropType, Ref } from 'vue';
import { IAppBIReport } from '@ibiz/model-core';
import { BIReportDesignController } from '../../controller';
import { IAppBIDrillDetailData, IBIReportChartController, IReportChartProvider } from '../../interface';
/** BI报表内容组件 */
declare const _default: import("vue").DefineComponent<{
    mode: {
        type: PropType<"DESIGN" | "CONTENT">;
        require: boolean;
    };
    context: {
        type: PropType<IContext>;
        require: boolean;
    };
    viewParams: {
        type: PropType<IParams>;
        require: boolean;
    };
    controller: {
        type: PropType<BIReportDesignController>;
    };
    config: {
        type: PropType<IAppBIReport>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: Ref<IBIReportChartController | undefined>;
    provider: Ref<IReportChartProvider | undefined>;
    onDrillDetail: (args: IAppBIDrillDetailData) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("init" | "reportChartChange")[], "init" | "reportChartChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: PropType<"DESIGN" | "CONTENT">;
        require: boolean;
    };
    context: {
        type: PropType<IContext>;
        require: boolean;
    };
    viewParams: {
        type: PropType<IParams>;
        require: boolean;
    };
    controller: {
        type: PropType<BIReportDesignController>;
    };
    config: {
        type: PropType<IAppBIReport>;
    };
}>> & {
    onInit?: ((...args: any[]) => any) | undefined;
    onReportChartChange?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
