import { IBIReportChartController, IChartMeta, IReportChartProvider } from '../interface';
export declare class BIReportAreaChartProvider implements IReportChartProvider {
    component: string;
    createController(chartMeta: IChartMeta): IBIReportChartController;
}
