import { IAppBIReport } from '@ibiz/model-core';
import { BIReportChartController } from './bi-report-chart.controller';
export declare class BIMultiSeriesLineChartController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    /**
     * Creates an instance of BIMultiSeriesLineChartController.
     * @param {string} mode
     * @param {IContext} context
     * @param {IParams} viewParams
     * @param {IChartConfig} config
     * @memberof BIMultiSeriesLineChartController
     */
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport);
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @return {*}
     * @memberof BIMultiSeriesLineChartController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
}
