import { IDEReportPanel } from '@ibiz/model-core';
import { IModalData, IReportPanelController } from '../../interface';
/**
 * 打开设计界面参数
 *
 * @author tony001
 * @date 2024-06-30 11:06:27
 * @export
 * @interface designPageParam
 */
export interface designPageParam {
    /**
     * 模式，数据模式 | 界面模式, 默认数据模式
     *
     * @author tony001
     * @date 2024-06-30 11:06:16
     * @type {('DATA' | 'UI')}
     */
    mode?: 'DATA' | 'UI';
    /**
     * 数据模式下传入报表标识
     *
     * @author tony001
     * @date 2024-06-30 11:06:12
     * @type {string}
     */
    reportId?: string;
    /**
     * 界面模式下传入报表面板对象
     *
     * @author tony001
     * @date 2024-06-30 11:06:00
     * @type {IReportPanelController}
     */
    reportPanel?: IReportPanelController;
    /**
     * 报表标识
     *
     * @author tony001
     * @date 2024-07-04 11:07:22
     * @type {string}
     */
    srfreporttag?: string;
    /**
     * 报表体系标识
     *
     * @author tony001
     * @date 2024-07-04 11:07:35
     * @type {string}
     */
    srfbischematag?: string;
}
export declare class BIReportUtil {
    /**
     * 打开设计界面
     *
     * @author tony001
     * @date 2024-06-30 11:06:21
     * @param {IContext} context
     * @param {IParams} params
     * @param {IData} data
     * @return {*}  {Promise<IModalData>}
     */
    openDesignPage(context: IContext, params: IParams, data: designPageParam): Promise<IModalData>;
    /**
     * 实体报表数据转化配置数据
     *
     * @author tony001
     * @date 2024-06-30 11:06:00
     * @private
     * @param {IData} data
     * @return {*}  {IData}
     */
    translateDEReportToConfig(data: IData): Promise<IData>;
    /**
     * 报表面板数据转化配置界面数据
     *
     * @param {IDEReportPanel} model
     * @return {*}  {Promise<IData>}
     * @memberof BIReportUtil
     */
    translateReportPanelToConfig(model: IDEReportPanel): Promise<IData>;
    /**
     * 指定参数数据转化为应用BI报表数据
     *
     * @param {{
     *     reportTag: string;
     *     selectChartType: string;
     *     selectCubeId: string;
     *     caption: string;
     *     data: IData;
     *     style: IData;
     *   }} arg
     * @return {*}  {Promise<IData>}
     * @memberof BIReportUtil
     */
    translateDataToAppBIReport(arg: {
        reportTag: string;
        selectChartType: string;
        selectCubeId: string;
        caption: string;
        data: IData;
        style: IData;
        extend: IData;
    }): Promise<IData>;
    /**
     * 合入特殊参数
     *
     * @author tony001
     * @date 2024-07-05 09:07:02
     * @param {string} type
     * @param {IData} sourceData
     * @param {IData} targetData
     * @return {*}  {Promise<void>}
     */
    mergeSpecialParams(type: string, sourceData: IData, targetData: IData): Promise<void>;
    /**
     * 处理交叉表特殊参数（维度列）
     *
     * @author tony001
     * @date 2024-07-05 10:07:56
     * @param {IData} sourceData
     * @param {IData} targetData
     * @return {*}  {Promise<void>}
     */
    mergeCrosstableSpecialParams(sourceData: IData, targetData: IData): Promise<void>;
    /**
     * 处理分组特殊参数(添加维度数据并将标识存到ui报表模型的group字段中)
     *
     * @author tony001
     * @date 2024-07-05 10:07:05
     * @param {IData} sourceData
     * @param {IData} targetData
     * @return {*}  {Promise<void>}
     */
    mergeGroupParams(sourceData: IData, targetData: IData): Promise<void>;
}
//# sourceMappingURL=bi-report-util.d.ts.map