import { IAppBIReport } from '@ibiz/model-core';
import { IBIReportGridState } from '../interface';
import { BIReportChartController } from './bi-report-chart.controller';
/**
 * bi表格
 *
 * @author tony001
 * @date 2024-05-30 22:05:35
 * @export
 * @class BITableController
 */
export declare class BITableController extends BIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    /**
     * 初始化状态
     *
     * @type {IBIReportGridState}
     * @memberof BITableController
     */
    state: IBIReportGridState;
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
     * 初始化状态
     *
     * @memberof BITableController
     */
    initState(): void;
    /**
     * 处理值变更
     *
     * @author tony001
     * @date 2024-06-12 17:06:03
     * @param {string} _name
     * @param {unknown} _value
     * @return {*}  {Promise<void>}
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
}
