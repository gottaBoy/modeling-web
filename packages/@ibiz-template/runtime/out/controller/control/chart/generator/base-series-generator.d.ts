import { IDEChartSeries } from '@ibiz/model-core';
import type { ECElementEvent, SeriesOption } from 'echarts';
import { ChartOptionsGenerator } from './chart-options-generator';
import { CodeListItem, IChartData } from '../../../../interface';
/** 序列的单条数据 */
export type SingleData = {
    /**
     * 值属性的值
     */
    value: number;
    /**
     * 图表数据
     * @author lxm
     * @date 2023-06-09 09:31:27
     * @type {IChartData}
     */
    chartData?: IChartData;
};
/** 分类数据，key是分类属性的值 */
export type CatalogData = Map<string, SingleData>;
/** 分组数据，key是分组属性的值 */
export type GroupData = Record<string, CatalogData>;
export declare const DEFAULT_GROUP = "$default_group";
export declare class BaseSeriesGenerator<T extends IDEChartSeries = IDEChartSeries> {
    model: T;
    protected chartGenerator: ChartOptionsGenerator;
    /**
     * 分类属性(小写)
     * @author lxm
     * @date 2023-06-09 02:44:57
     * @type {string}
     */
    catalogField: string;
    /**
     * 分类属性(小写)数组，用于构建多维度分层
     *
     * @type {string[]}
     * @memberof BaseSeriesGenerator
     */
    catalogFields: IData[];
    /**
     * 值属性（小写）
     * @author lxm
     * @date 2023-06-09 02:45:15
     * @type {string}
     */
    valueField: string;
    /**
     * 分组属性（小写）
     * @author lxm
     * @date 2023-06-09 02:46:05
     * @type {string}
     */
    groupField?: string;
    /**
     * X轴坐标索引
     * @author lxm
     * @date 2023-06-09 02:47:54
     * @type {number}
     */
    xAxisIndex?: number;
    /**
     * y轴坐标索引
     * @author lxm
     * @date 2023-06-09 02:48:13
     * @type {number}
     */
    yAxisIndex?: number;
    /**
     * 序列名称
     * @author lxm
     * @date 2023-06-09 02:49:35
     * @type {string}
     */
    seriesName: string;
    /**
     * 根据后台数据处理出来的分组数据
     * @author lxm
     * @date 2023-06-09 02:58:28
     * @type {GroupData}
     */
    groupData?: GroupData;
    /**
     * 根据分组处理出来的图表数据数组
     * @author lxm
     * @date 2023-06-09 02:58:28
     * @type {GroupData}
     */
    chartDataArr: IChartData[];
    /**
     * 静态的序列options
     * @author lxm
     * @date 2023-06-09 03:08:47
     * @type {SeriesOption}
     */
    staticOptions: SeriesOption;
    /**
     * 序列的自定义Options
     * @author lxm
     * @date 2023-06-09 08:59:40
     * @type {SeriesOption}
     */
    seriesUserParam?: SeriesOption;
    /**
     * 是否根据代码表自动补全分类
     * @author lxm
     * @date 2023-06-09 09:28:04
     * @type {boolean}
     */
    autoCompleteCategory: boolean;
    /**
     * 多维度分层时的维度映射，记录序列值与分层的关系
     *
     * @type {Map<string, Array<IData>>}
     * @memberof BaseSeriesGenerator
     */
    catalogMap: Map<string, IData>;
    /**
     * Creates an instance of BaseSeriesGenerator.
     * @author lxm
     * @date 2023-06-09 02:46:54
     * @param {T} model 序列模型
     * @param {ChartOptionsGenerator} chartGenerator 图表生成器
     */
    constructor(model: T, chartGenerator: ChartOptionsGenerator);
    /**
     * 初始化参数
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @param {T} model 序列模型
     * @param {ChartOptionsGenerator} chartGenerator 图表生成器
     */
    initParams(model: T, chartGenerator: ChartOptionsGenerator): void;
    /**
     * 计算静态序列的options
     * @author lxm
     * @date 2023-06-09 03:09:34
     */
    protected calcStaticOptions(): SeriesOption;
    /**
     * 有代码就转换，值为空直接返回空
     *
     * @author lxm
     * @date 2023-06-09 08:42:50
     * @author lxm
     * @date 2023-06-09 08:46:00
     * @param {(string | undefined)} codeListKey 代码表值
     * @param {(string | undefined)} val 数据值
     * @param {boolean} isExclude 是否排除非代码表的值，true时，匹配不到代码表返回undefined，反之返回原值
     * @return {*}  {(string | undefined)}
     */
    translateVal(codeListKey: string | undefined, val: string | undefined, isExclude?: boolean): string | undefined;
    /**
     * 获取序列颜色
     *
     * @param {string} group
     * @return {*}  {string}
     * @memberof BaseSeriesGenerator
     */
    getSeriesColor(group: string): string;
    /**
     * 准备图表数据
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-23 15:24:12
     */
    protected prepareChartData(groupData: GroupData, deData: IData, catalog: string, group: string, catalogLevelData: IData[]): void;
    /**
     * 处理多分类分组
     *
     * @param {IData[]} prevItems
     * @param {IData[]} nextItems
     * @return {*}
     * @memberof BaseSeriesGenerator
     */
    handleMultiCatalogGroup(prevItems: IData, nextItems: IData): IData[];
    /**
     * 计算代码表排序
     *
     * @protected
     * @param {(string | undefined)} sort
     * @param {IData[]} data
     * @param {string} codename
     * @param {readonly} codeListItems
     * @param {*} CodeListItem
     * @param {*} []
     * @return {*}
     * @memberof BaseSeriesGenerator
     */
    protected computeCodelistSort(sort: string | undefined, data: IData[], codename: string, codeListItems: readonly CodeListItem[]): CodeListItem[];
    /**
     * 计算分组数据
     * @author lxm
     * @date 2023-06-09 03:42:53
     * @param {IData[]} data
     * @return {*}  {GroupData}
     */
    protected calcGroupData(data: IData[]): GroupData;
    /**
     * 根据分组数据算出多个序列的options
     * 大多数图表分组都是一个分组数据生成一条series
     * @author lxm
     * @date 2023-06-09 03:34:24
     * @param {GroupData} groupData
     * @return {*}  {SeriesOption[]}
     */
    protected calcGroupSeries(groupData: GroupData): SeriesOption[];
    /**
     * 生成每条序列的data,由于不同图表类型格式不同所以为any
     * 默认提供的是二维数组，按[x轴, y轴, 图表数据]格式
     * @author lxm
     * @date 2023-06-09 03:38:07
     * @param {CatalogData} catalogData
     * @return {*}  {*}
     */
    protected calcSeriesData(catalogData: CatalogData): any;
    /**
     * 根据数据计算出序列的options
     * @author lxm
     * @date 2023-06-09 03:44:31
     * @param {IData[]} data
     * @return {*}  {(SeriesOption[] | SeriesOption)}
     */
    calcByData(data: IData[]): SeriesOption[] | SeriesOption;
    /**
     * 通过echarts事件的params获取封装好的图表数据
     * @author lxm
     * @date 2023-06-09 10:56:25
     * @param {ECElementEvent} params
     * @return {*}  {string}
     */
    getChartDataByParams(params: ECElementEvent): IData | undefined;
    /**
     * 数据预处理
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-16 09:58:39
     */
    dataPreprocess(data: IData[]): IData[];
    /**
     * 补全分组数据后排序
     * @param {GroupData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-17 16:25:44
     */
    sortTimeData(data: GroupData): void;
    /**
     * 根据分组模式补全分组数据并排序
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-16 13:57:53
     */
    addTimeData(data: GroupData): void;
}
//# sourceMappingURL=base-series-generator.d.ts.map