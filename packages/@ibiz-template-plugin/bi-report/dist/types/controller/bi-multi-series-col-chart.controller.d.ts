import { IAppBIReport } from '@ibiz/model-core';
import { BIReportChartController } from './bi-report-chart.controller';
export declare class BIMultiSeriesColChartController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport);
    /**
     * 处理值变更
     *
     * @author zhanghengfeng
     * @date 2024-06-14 21:06:15
     * @param {string} name
     * @param {unknown} _value
     * @return {*}  {Promise<void>}
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
}
