import { IChartMeta } from '../common';
import { IBIReportChartController } from '../controller';
/**
 * 报表图表适配器接口
 *
 * @author tony001
 * @date 2024-05-21 15:05:10
 * @export
 * @interface IReportChartProvider
 */
export interface IReportChartProvider {
    /**
     * 绘制组件名称
     *
     * @author tony001
     * @date 2024-05-21 15:05:57
     * @type {*}
     */
    component: string;
    /**
     * 创建报表图表控制器
     *
     * @author tony001
     * @date 2024-06-06 00:06:20
     * @param {IChartMeta} [chartMeta]
     * @return {*}  {IBIReportChartController}
     */
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
