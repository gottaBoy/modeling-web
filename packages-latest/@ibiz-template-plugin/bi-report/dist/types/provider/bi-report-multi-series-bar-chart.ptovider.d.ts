import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportMultiSeriesBarChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
