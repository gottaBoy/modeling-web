import { IChartMeta, IBIReportChartController, IReportChartProvider } from '../interface';
export declare class BIReportTableProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
