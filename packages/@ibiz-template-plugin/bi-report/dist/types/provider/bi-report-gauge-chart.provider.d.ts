import { IChartMeta, IBIReportChartController, IReportChartProvider } from '../interface';
/**
 * 仪表盘适配器
 *
 * @export
 * @class BiReportGaugeChartProvider
 * @implements {IReportChartProvider}
 */
export declare class BiReportGaugeChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
