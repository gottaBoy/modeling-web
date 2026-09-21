import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportStackColChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
