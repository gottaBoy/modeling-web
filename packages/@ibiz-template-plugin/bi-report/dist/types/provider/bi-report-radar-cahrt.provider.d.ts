import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
/**
 * 雷达图适配器
 *
 * @export
 * @class BIReportRadarChartProvider
 * @implements {IReportChartProvider}
 */
export declare class BIReportRadarChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
