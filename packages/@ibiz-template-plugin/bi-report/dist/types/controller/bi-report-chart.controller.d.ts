import { IAppBIReport } from '@ibiz/model-core';
import { IAppBICubeData, IAppBIDrillDetailData, IBIReportChartController, IBIReportChartState, IChartConverter } from '../interface';
/**
 * bi图表
 *
 * @author tony001
 * @date 2024-05-30 22:05:35
 * @export
 * @class BIReportChartController
 * @implements {IBIReportChartController}
 */
export declare abstract class BIReportChartController implements IBIReportChartController {
    mode: string;
    context: IContext;
    viewParams: IParams;
    config: IAppBIReport;
    initData: {
        chartModel: IModel;
        chartConfig: IData;
        chartDefaultValue: IData;
    };
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-05-31 00:05:28
     * @type {IBIReportChartState}
     */
    state: IBIReportChartState;
    /**
     * 转化器
     *
     * @author tony001
     * @date 2024-06-06 01:06:55
     * @type {(IChartConverter | undefined)}
     */
    converter: IChartConverter | undefined;
    /**
     * 初始化图表模型
     *
     * @author tony001
     * @date 2024-06-12 15:06:47
     * @type {(IModel | undefined)}
     */
    chartModel: IModel | undefined;
    /**
     * 图表默认值
     *
     * @author tony001
     * @date 2024-06-12 15:06:15
     * @type {(IData | undefined)}
     */
    chartDefaultValue: IData | undefined;
    /**
     * 图表配置
     *
     * @author tony001
     * @date 2024-06-12 15:06:51
     * @type {(IData | undefined)}
     */
    chartConfig: IData | undefined;
    /**
     * 应用实体标识
     *
     * @author tony001
     * @date 2024-06-12 16:06:42
     * @type {(string | undefined)}
     */
    appDataEntityId: string | undefined;
    /**
     * 图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:15
     * @type {IData}
     */
    chartController?: IData;
    /**
     * 唯一标识
     *
     * @author tony001
     * @date 2024-07-24 22:07:10
     * @type {string}
     */
    uuid: string;
    /**
     * 动态数据字典
     *
     * @author tony001
     * @date 2024-07-24 23:07:26
     * @type {IData}
     */
    dynaDataDic: IData;
    /**
     * Creates an instance of BIReportChartController.
     * @author tony001
     * @date 2024-06-12 15:06:09
     * @param {string} mode
     * @param {IContext} context
     * @param {IParams} viewParams
     * @param {IAppBIReport} config
     */
    constructor(mode: string, context: IContext, viewParams: IParams, config: IAppBIReport, initData: {
        chartModel: IModel;
        chartConfig: IData;
        chartDefaultValue: IData;
    });
    /**
     * 设置图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:32
     * @param {IData} c
     */
    setChartController(c: IData): void;
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-06-12 16:06:07
     */
    initState(): void;
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-06-12 17:06:20
     * @return {*}  {Promise<void>}
     */
    created(): Promise<void>;
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-06-26 14:06:56
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 获取立方体数据
     *
     * @param {(string | undefined)} cubeId
     * @return {*}  {(Promise<IAppBICubeData | undefined>)}
     * @memberof BIReportChartController
     */
    getCubeById(cubeId: string | undefined): Promise<IAppBICubeData | undefined>;
    /**
     * 初始化数据集
     *
     * @author tony001
     * @date 2024-06-18 15:06:41
     * @return {*}  {Promise<void>}
     */
    load(): Promise<IData[]>;
    /**
     * 销毁
     *
     * @author tony001
     * @date 2024-06-12 17:06:38
     * @return {*}  {Promise<void>}
     */
    destroyed(): Promise<void>;
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @param {IData} _mergeParams
     * @return {*}  {Promise<void>}
     * @memberof BIReportChartController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
    /**
     * 检查数据
     *
     * @return {*}  {Promise<boolean>}
     * @memberof BIReportChartController
     */
    checkData(): Promise<boolean>;
    /**
     * 刷新
     *
     * @author tony001
     * @date 2024-06-20 11:06:57
     * @param {('UI' | 'ALL')} [type='UI']
     * @return {*}  {Promise<void>}
     */
    refresh(type?: 'UI' | 'ALL'): Promise<void>;
    /**
     * 获取数据集
     *
     * @author tony001
     * @date 2024-06-12 17:06:15
     * @return {*}  {Promise<IData[]>}
     */
    fetchDataSource(): Promise<IData[]>;
    /**
     * 处理响应数据
     *
     * @author tony001
     * @date 2024-07-23 15:07:29
     * @private
     * @param {IData[]} data
     * @return {*}  {IData[]}
     */
    private handResponseData;
    /**
     * 打开反查视图modal
     *
     * @author zhanghengfeng
     * @date 2024-07-26 16:07:09
     * @param {string} appViewId
     * @param {IAppBIDrillDetailData} data
     * @return {*}  {Promise<void>}
     */
    openDrillModal(appViewId: string, data: IAppBIDrillDetailData): Promise<void>;
    /**
     * 处理数据反查
     *
     * @author tony001
     * @date 2024-07-11 16:07:20
     * @param {IAppBIDrillDetailData} args
     * @return {*}  {Promise<void>}
     */
    handleDrillDetail(args: IAppBIDrillDetailData): Promise<void>;
    /**
     * 计算反查视图
     *
     * @author tony001
     * @date 2024-07-11 17:07:23
     * @private
     * @param {IAppBIDrillDetailData} args
     * @return {*}  {(string | undefined)}
     */
    private computeDrillDetailAppView;
}
