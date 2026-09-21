import { IChartMeta, IBIReportChartController, IReportChartProvider } from '../interface';
export declare class BIReportPieChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
