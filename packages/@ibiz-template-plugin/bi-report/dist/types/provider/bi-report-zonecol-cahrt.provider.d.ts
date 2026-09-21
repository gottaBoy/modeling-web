import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportZoneColChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
