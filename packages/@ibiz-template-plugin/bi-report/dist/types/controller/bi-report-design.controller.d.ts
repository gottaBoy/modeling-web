import { QXEvent } from 'qx-util';
import { IAppBIReport, IDEToolbar, IUIActionGroupDetail } from '@ibiz/model-core';
import { ButtonContainerState } from '@ibiz-template/runtime';
import { ChartType, IAppBICubeData, IAppBICubeDimensionData, IAppBICubeMeasureData, IBIReportChartController, IBIReportDesignController, IBIReportDesignEvent, IBIReportDesignState, IChartConfig } from '../interface';
import { BIVerifyController } from './bi-verify.controller';
/**
 * bi报表设计器
 *
 * @author tony001
 * @date 2024-05-21 11:05:09
 * @export
 * @class BIReportDesignController
 */
export declare class BIReportDesignController implements IBIReportDesignController {
    context: IContext;
    viewParams: IParams;
    config: IChartConfig;
    dismiss: Function;
    measureToolbar: IDEToolbar;
    dimensionToolbar: IDEToolbar;
    /**
     * 事件对象
     *
     * @author tony001
     * @date 2024-06-04 23:06:05
     */
    readonly evt: QXEvent<IBIReportDesignEvent>;
    /**
     * 当前环境全部数据
     *
     * @private
     * @type {IAppBICubeData[]}
     * @memberof BIReportDesignController
     */
    private allAppBICubes;
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-05-21 16:05:58
     * @type {IBIReportDesignState}
     */
    state: IBIReportDesignState;
    /**
     * 备份数据
     *
     * @type {IData}
     * @memberof BIReportDesignController
     */
    backupData: IData;
    /**
     * 校验控制器
     *
     * @type {(BIVerifyController | undefined)}
     * @memberof BIReportDesignController
     */
    verifyController: BIVerifyController | undefined;
    /**
     * 获取默认值
     *
     * @private
     * @param {string} selectChartType
     * @param {IData | undefined} inputPropertyData
     * @return {*}  {IData}
     * @memberof BIReportDesignController
     */
    private getDefaultValue;
    /**
     * Creates an instance of BIReportDesignController.
     * @author tony001
     * @date 2024-06-04 23:06:51
     */
    constructor(context: IContext, viewParams: IParams, config: IChartConfig, dismiss: Function, measureToolbar: IDEToolbar, dimensionToolbar: IDEToolbar);
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-06-05 14:06:54
     */
    initState(): void;
    /**
     * 校验各种错误状态
     *
     * @param {string} name
     * @param {unknown} value
     * @param {string[]} tag
     * @param {IData} [opts]
     * @return {*}  {IData}
     * @memberof BIReportDesignController
     */
    verifyErrorState(name: string, value: unknown, tag: string[], opts?: IData): IData;
    /**
     * 初始化错误状态
     *
     * @return {*}
     * @memberof BIReportDesignController
     */
    initErrorState(): void;
    /**
     * 设置属性数据并备份
     *
     * @param {IData} data
     * @memberof BIReportDesignController
     */
    setBackUpData(data: IData): void;
    /**
     * 创建
     *
     * @author tony001
     * @date 2024-05-21 16:05:31
     */
    created(): Promise<void>;
    /**
     * 合并原始参数（指标和维度）
     *
     * @author tony001
     * @date 2024-07-23 23:07:02
     * @return {*}  {Promise<void>}
     */
    mergeSourceParams(): Promise<void>;
    /**
     * 销毁
     *
     * @author tony001
     * @date 2024-05-21 17:05:09
     */
    destroyed(): Promise<void>;
    /**
     * 获取报表体系详情
     *
     * @author tony001
     * @date 2024-06-05 15:06:12
     * @return {*}  {Promise<void>}
     */
    fetchSchemeDetails(): Promise<void>;
    /**
     * 初始化过滤项集合
     *
     * @return {*}  {Promise<void>}
     * @memberof BIReportDesignController
     */
    initFilters(): Promise<void>;
    /**
     * 获取立方体数据
     *
     * @author tony001
     * @date 2024-06-04 18:06:48
     * @return {*}  {Promise<IAppBICube[]>}
     */
    fetchCube(): Promise<IAppBICubeData[]>;
    /**
     * 获取立方体指标数据
     *
     * @param {string} cubeid
     * @return {*}  {Promise<IAppBICubeMeasureData[]>}
     * @memberof BIReportDesignController
     */
    fetchCubeMeasure(cubeid: string): Promise<IAppBICubeMeasureData[]>;
    /**
     * 获取立方体维度数据
     *
     * @param {string} cubeid
     * @return {*}  {Promise<IAppBICubeDimensionData[]>}
     * @memberof BIReportDesignController
     */
    fetchCubeDimension(cubeid: string): Promise<IAppBICubeDimensionData[]>;
    /**
     * 刷新立方体子数据（指标或者维度）
     *
     * @param {('measure' | 'dimension')} type
     * @return {*}  {Promise<void>}
     * @memberof BIReportDesignController
     */
    refreshCubeDetails(type: 'measure' | 'dimension'): Promise<void>;
    /**
     * 编译报表
     *
     * @return {*}  {Promise<IAppBIReport>}
     * @memberof BIReportDesignController
     */
    compileAppBIReport(propertyData: IData): Promise<IAppBIReport | undefined>;
    /**
     * 计算报表模型
     *
     * @param {string} _name
     * @param {unknown} _value
     * @return {*}  {Promise<IData>}
     * @memberof BIReportDesignController
     */
    computeAppBIReportModel(_name: string, _value: unknown): Promise<IData>;
    /**
     * 校验必填检查状态
     *
     * @param {string} name
     * @param {unknown} value
     * @memberof BIReportDesignController
     */
    checkData(name: string, value: unknown): void;
    /**
     * 设置值
     *
     * @author tony001
     * @date 2024-06-12 17:06:22
     * @param {string} _name
     * @param {unknown} _value
     * @return {*}  {Promise<void>}
     */
    setData(_name: string, _value: unknown): Promise<void>;
    /**
     * 切换报表体系
     *
     * @author tony001
     * @date 2024-06-04 18:06:25
     * @param {string} tag
     * @return {*}  {Promise<void>}
     */
    switchScheme(tag: string): Promise<void>;
    /**
     * 切换立方体
     *
     * @author tony001
     * @date 2024-06-04 18:06:48
     * @return {*}  {Promise<void>}
     */
    switchCube(tag: string): Promise<void>;
    /**
     * 初始化校验状态
     *
     * @memberof BIReportDesignController
     */
    initVerifyState(): void;
    /**
     * 切换图表类型
     *
     * @author tony001
     * @date 2024-06-06 00:06:27
     * @param {ChartType} tag
     * @return {*}  {Promise<void>}
     */
    switchReportType(tag: ChartType, isMergeData?: boolean): Promise<void>;
    /**
     * 设置报表图表控制器
     *
     * @author tony001
     * @date 2024-06-04 23:06:08
     * @param {(IBIReportChartController | undefined)} reportChart
     * @return {*}  {Promise<void>}
     */
    setReportChart(reportChart: IBIReportChartController | undefined): Promise<void>;
    /**
     * 关闭
     *
     * @author tony001
     * @date 2024-06-20 13:06:17
     * @return {*}  {Promise<void>}
     */
    close(): Promise<void>;
    /**
     * 保存数据
     *
     * @author tony001
     * @date 2024-06-20 13:06:28
     * @return {*}  {Promise<void>}
     */
    save(): Promise<void>;
    /**
     * 取消保存
     *
     * @author tony001
     * @date 2024-06-20 13:06:39
     * @return {*}  {Promise<void>}
     */
    cancel(): Promise<void>;
    /**
     * @description 获取操作项行为
     * @param {IData} item
     * @param {IUIActionGroupDetail[]} uiactionGroupDetails
     * @return {*}  {ButtonContainerState}
     * @memberof BIReportDesignController
     */
    getOptItemAction(item: IData, uiactionGroupDetails: IUIActionGroupDetail[]): ButtonContainerState;
}
