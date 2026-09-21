import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
/**
 * 散点图适配器
 *
 * @export
 * @class BIReportScatterChartProvider
 * @implements {IReportChartProvider}
 */
export declare class BIReportScatterChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
