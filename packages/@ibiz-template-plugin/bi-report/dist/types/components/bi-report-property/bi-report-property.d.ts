import { PropType, Ref } from 'vue';
import { BIReportDesignController } from '../../controller';
/** BI报表属性组件 */
declare const _default: import("vue").DefineComponent<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onReportChartTypeChange: (item: IData) => void;
    chartType: import("vue").ComputedRef<import("../../interface").ChartType>;
    propertyConfig: import("vue").ComputedRef<IData>;
    selectTabValue: Ref<string>;
    groupConfig: Ref<IData>;
    renderDetails: (type: string, items?: IData[]) => (JSX.Element | null)[];
    renderPagination: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "reportChartTypeChange"[], "reportChartTypeChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<BIReportDesignController>;
        required: true;
    };
}>> & {
    onReportChartTypeChange?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
