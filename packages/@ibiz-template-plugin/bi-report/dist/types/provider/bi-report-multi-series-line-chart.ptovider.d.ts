import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportMultiSeriesLineChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
