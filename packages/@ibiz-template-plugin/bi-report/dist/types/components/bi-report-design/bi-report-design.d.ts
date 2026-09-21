import { PropType } from 'vue';
import { IDEToolbar } from '@ibiz/model-core';
import { BIReportDesignController } from '../../controller';
import { ChartType, IBIReportChartController, IChartConfig } from '../../interface';
/** BI报表设计组件 */
declare const _default: import("vue").DefineComponent<{
    context: {
        type: PropType<IContext>;
        require: boolean;
    };
    viewParams: {
        type: PropType<IParams>;
        require: boolean;
    };
    dismiss: {
        type: PropType<Function>;
    };
    config: {
        type: PropType<IChartConfig>;
        default: () => {
            reportTag: string;
            selectChartType: string;
        };
    };
    measureToolbar: {
        type: PropType<IDEToolbar>;
    };
    dimensionToolbar: {
        type: PropType<IDEToolbar>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: BIReportDesignController;
    handleReportChartChange: (reportChart: IBIReportChartController | undefined) => void;
    handleReportChartTypeChange: (tag: ChartType) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<IContext>;
        require: boolean;
    };
    viewParams: {
        type: PropType<IParams>;
        require: boolean;
    };
    dismiss: {
        type: PropType<Function>;
    };
    config: {
        type: PropType<IChartConfig>;
        default: () => {
            reportTag: string;
            selectChartType: string;
        };
    };
    measureToolbar: {
        type: PropType<IDEToolbar>;
    };
    dimensionToolbar: {
        type: PropType<IDEToolbar>;
    };
}>>, {
    config: IChartConfig;
}, {}>;
export default _default;
