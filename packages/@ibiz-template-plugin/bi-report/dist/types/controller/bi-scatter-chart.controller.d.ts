import { IAppBIReport } from '@ibiz/model-core';
import { BIReportChartController } from './bi-report-chart.controller';
/**
 * 散点图控制器
 *
 * @export
 * @class BIScatterController
 * @extends {BIReportChartController}
 */
export declare class BIScatterController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    /**
     * Creates an instance of BIScatterController.
     * @param {string} mode
     * @param {IContext} context
     * @param {IParams} viewParams
     * @param {IAppBIReport} config
     * @memberof BIScatterController
     */
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport);
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @param {IData} _mergeParams
     * @return {*}
     * @memberof BIScatterController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
}
