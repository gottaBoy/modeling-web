import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportNumberProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
