import { IChartMeta, IBIReportChartController, IReportChartProvider } from '../interface';
export declare class BiReportMultiSeriesColChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
