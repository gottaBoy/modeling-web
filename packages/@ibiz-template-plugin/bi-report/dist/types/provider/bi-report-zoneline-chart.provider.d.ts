import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportZoneLineChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
