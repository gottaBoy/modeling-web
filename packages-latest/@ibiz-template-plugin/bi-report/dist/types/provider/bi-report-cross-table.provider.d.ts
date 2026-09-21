import { IChartMeta, IBIReportChartController, IReportChartProvider } from '../interface';
export declare class BIReportCrossTableProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
