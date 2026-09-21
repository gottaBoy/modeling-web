import { IAppBIReport } from '@ibiz/model-core';
import { BIReportChartController } from './bi-report-chart.controller';
/**
 * 仪表盘控制器
 *
 * @export
 * @class BIGaugeChartController
 * @extends {BIReportChartController}
 */
export declare class BIGaugeChartController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport);
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @param {IData} _mergeParams
     * @return {*}  {Promise<void>}
     * @memberof BIGaugeChartController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
    /**
     * 获取数据集
     *
     * @author zhanghengfeng
     * @date 2024-06-14 21:06:24
     * @return {*}  {Promise<IData[]>}
     */
    fetchDataSource(): Promise<IData[]>;
}
