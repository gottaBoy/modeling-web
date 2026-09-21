import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportStackBarChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
