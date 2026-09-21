import { IAppBIReport } from '@ibiz/model-core';
import { BIReportChartController } from './bi-report-chart.controller';
/**
 * 饼图
 *
 * @author tony001
 * @date 2024-06-12 15:06:54
 * @export
 * @class BIPieChartController
 * @extends {BIReportChartController}
 */
export declare class BIPieChartController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    /**
     * Creates an instance of BIPieChartController.
     * @author tony001
     * @date 2024-06-12 15:06:14
     * @param {string} mode
     * @param {IContext} context
     * @param {IParams} viewParams
     * @param {IAppBIReport} config
     */
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport);
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @param {IData} _mergeParams
     * @return {*}  {Promise<void>}
     * @memberof BIPieChartController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
}
