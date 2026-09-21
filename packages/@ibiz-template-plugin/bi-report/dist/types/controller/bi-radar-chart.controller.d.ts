import { IAppBIReport } from '@ibiz/model-core';
import { BIReportChartController } from './bi-report-chart.controller';
/**
 * 雷达图控制器
 *
 * @export
 * @class BIRadarController
 * @extends {BIReportChartController}
 */
export declare class BIRadarController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    /**
     * Creates an instance of BIPolarController.
     * @param {string} mode
     * @param {IContext} context
     * @param {IParams} viewParams
     * @param {IAppBIReport} config
     * @memberof BIPolarController
     */
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport);
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @param {IData} _mergeParams
     * @return {*}
     * @memberof BIRadarController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
}
