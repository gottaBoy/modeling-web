import { IBIReportGridState } from '../state';
import { IBIReportChartController } from './i-bi-report-chart.controller';
/**
 * bi报表表格接口
 *
 * @author tony001
 * @date 2024-05-21 11:05:20
 * @export
 * @interface IBIReportGridController
 */
export interface IBIReportGridController extends IBIReportChartController {
    /**
     *初始化状态
     *
     * @type {IBIReportGridState}
     * @memberof IBIReportGridController
     */
    state: IBIReportGridState;
}
