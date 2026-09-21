import { IAppBIReport } from '@ibiz/model-core';
/**
 * 报表图表状态
 *
 * @author tony001
 * @date 2024-05-31 00:05:34
 * @export
 * @interface IBIReportChartState
 */
export interface IBIReportChartState {
    /**
     * 是否构建完成
     *
     * @author tony001
     * @date 2024-06-04 23:06:33
     * @type {boolean}
     */
    isCreated: boolean;
    /**
     * 刷新标记
     *
     * @author tony001
     * @date 2024-06-12 17:06:25
     * @type {boolean}
     */
    refreshFlag: boolean;
    /**
     * 图表模型
     *
     * @author tony001
     * @date 2024-06-12 10:06:50
     * @type {IModel}
     */
    model: IModel;
    /**
     * 数据集
     *
     * @type {IData[]}
     * @memberof IBIReportDesignState
     */
    items: IData[];
    /**
     * 报表图表属性配置清单
     *
     * @author tony001
     * @date 2024-06-05 14:06:26
     * @type {IData}
     */
    propertyConfig: IData;
    /**
     * 报表模型
     *
     * @type {IAppBIReport}
     * @memberof IBIReportChartState
     */
    reportModel: IAppBIReport;
}
