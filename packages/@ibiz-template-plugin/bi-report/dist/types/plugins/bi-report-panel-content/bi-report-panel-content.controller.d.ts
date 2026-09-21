import { PanelItemController } from '@ibiz-template/runtime';
import { IAppBIReport } from '@ibiz/model-core';
import { BIReportPanelContentState } from './bi-report-panel-content.state';
import { IAppBICubeData, IBIReportChartController } from '../../interface';
export declare class BIReportPanelContentController extends PanelItemController {
    /**
     * BI报表配置
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:34
     * @type {IData}
     */
    config: IData;
    /**
     * 上下文
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:53
     * @type {IContext}
     */
    context: IContext;
    /**
     * 状态
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:34
     * @type {BIReportPanelContentState}
     */
    state: BIReportPanelContentState;
    /**
     * 表格控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:41
     * @type {IBIReportChartController}
     */
    grid?: IBIReportChartController;
    /**
     * 图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:56
     * @type {IBIReportChartController}
     */
    chart?: IBIReportChartController;
    /**
     * 表格类型
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:24
     * @type {string[]}
     */
    gridType: string[];
    /**
     * BI报表key
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:45
     * @type {string}
     */
    reportKey: string;
    /**
     * 立方体数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:42
     * @type {IAppBICubeData}
     */
    appBICube?: IAppBICubeData;
    /**
     * 创建面板状态对象
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:45
     * @protected
     * @return {*}  {BIReportPanelContentState}
     */
    protected createState(): BIReportPanelContentState;
    /**
     * 初始化BI报表key
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:16
     */
    initReportKey(): void;
    /**
     * 设置表格控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:43
     * @param {IBIReportChartController} grid
     */
    setGrid(grid: IBIReportChartController): void;
    /**
     * 设置图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:56
     * @param {IBIReportChartController} chart
     */
    setChart(chart: IBIReportChartController): void;
    /**
     * 初始化立方体数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:06
     * @return {*}  {Promise<void>}
     */
    initAppBICube(): Promise<void>;
    /**
     * 初始化指标
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:53
     * @return {*}  {Promise<void>}
     */
    initMeasure(): Promise<void>;
    /**
     * 初始化维度
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:27
     * @return {*}  {Promise<void>}
     */
    initDimension(): Promise<void>;
    /**
     * 初始化schema字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:32
     * @return {*}  {Promise<void>}
     */
    initSchemaFields(): Promise<void>;
    /**
     * 初始化字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:06
     * @return {*}  {Promise<void>}
     */
    initFields(): Promise<void>;
    /**
     * 初始化条件字段
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:46
     * @return {*}  {Promise<void>}
     */
    initConditionFields(): Promise<void>;
    /**
     * 初始化过滤项
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:19
     * @return {*}  {Promise<void>}
     */
    initFilter(): void;
    /**
     * 加载schema数据
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:37
     * @return {*}  {Promise<void>}
     */
    loadSchema(): Promise<void>;
    /**
     * 更新过滤项
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:01
     * @param {IData[]} value
     */
    updateFilter(value: IData[]): Promise<void>;
    /**
     * 更新自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-16 22:07:16
     * @param {string} value
     * @return {*}  {Promise<void>}
     */
    updateCustomCond(value: string): Promise<void>;
    /**
     * 重置模型
     *
     * @author zhanghengfeng
     * @date 2024-07-16 17:07:41
     */
    resetModel(): void;
    /**
     * 初始化
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:15
     * @return {*}  {Promise<void>}
     */
    onInit(): Promise<void>;
    /**
     * 获取图表默认值
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:52
     * @param {string} selectChartType
     * @param {(IData | undefined)} sourceData
     * @return {*}  {IData}
     */
    getDefaultValue(selectChartType: string, sourceData: IData | undefined): IData;
    /**
     * 编译报表
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:25
     * @param {string} selectChartType
     * @param {IData} propertyData
     * @return {*}  {(Promise<IAppBIReport | undefined>)}
     */
    compileAppBIReport(selectChartType: string, propertyData: IData): Promise<IAppBIReport | undefined>;
    /**
     * 初始化图表模型
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:33
     * @return {*}  {Promise<void>}
     */
    initReportModel(): Promise<void>;
    /**
     * 初始化表格模型
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:48
     * @return {*}  {Promise<void>}
     */
    initGridReportModel(): Promise<void>;
    /**
     * 更新表格模型
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:05
     * @return {*}  {Promise<void>}
     */
    updateGridReportModel(): Promise<void>;
}
