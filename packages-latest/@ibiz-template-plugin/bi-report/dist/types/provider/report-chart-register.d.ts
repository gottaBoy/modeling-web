import { IReportChartProvider } from '../interface';
/** 报表图表适配器前缀 */
export declare const REPORT_CHART_PROVIDER_PREFIX = "REPORT_CHART";
/** 注册报表图表适配器 */
export declare function registerReportChartProvider(key: string, callback: () => IReportChartProvider): void;
/** 获取报表图表适配器 */
export declare function getReportChartProvider(key: string): IReportChartProvider | undefined;
