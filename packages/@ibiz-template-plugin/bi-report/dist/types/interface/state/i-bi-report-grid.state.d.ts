import { IBIReportChartState } from './i-bi-report-chart.state';
interface IGridStyle {
    vars?: IData;
    classList?: string[];
}
/**
 * 报表表格状态
 *
 * @author tony001
 * @date 2024-05-31 00:05:34
 * @export
 * @interface IBIReportGridState
 */
export interface IBIReportGridState extends IBIReportChartState {
    /**
     * 样式
     *
     * @type {IGridStyle}
     * @memberof IBIReportGridState
     */
    style: IGridStyle;
    /**
     * 表格数据
     *
     * @type {IData[]}
     * @memberof IBIReportGridState
     */
    tableData: IData[];
    /**
     * @description 表格属性
     * @type {IData}
     * @memberof IBIReportGridState
     */
    attrs: IData;
}
export {};
