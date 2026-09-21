import { type EChartsOption, type XAXisComponentOption, type YAXisComponentOption, type ECElementEvent } from 'echarts';
import { IAppDataEntity, IChartXAxis, IChartYAxis, IDEChart, IDEChartLegend, IDEChartTitle } from '@ibiz/model-core';
import { BaseSeriesGenerator } from './base-series-generator';
import { RadarCoordSystem } from './radar-coord-system';
import { CodeListItem } from '../../../../interface';
/**
 * 解析userParams
 * @author lxm
 * @date 2023-06-09 09:03:07
 * @export
 * @param {Record<string, string>} userParams
 * @return {*}
 */
export declare function parseUserParams(userParams: Record<string, string>): IData;
export declare class ChartOptionsGenerator {
    model: IDEChart;
    extraArgs: IData;
    /**
     * 实体模型
     * @author lxm
     * @date 2023-08-29 06:39:01
     * @type {IAppDataEntity}
     */
    entity: IAppDataEntity;
    /**
     * 根据模型配置算出来的静态echarts配置
     * @author lxm
     * @date 2023-06-07 09:50:44
     * @type {EChartsOption}
     */
    staticOptions: EChartsOption;
    /**
     * 最终计算产物
     * @author lxm
     * @date 2023-06-08 09:23:40
     * @type {EChartsOption}
     */
    options: EChartsOption;
    /**
     * 图表整体的自定义Options
     * @author lxm
     * @date 2023-06-09 08:59:40
     * @type {EChartsOption}
     */
    chartUserParam?: EChartsOption;
    /**
     * 序列生成器集合
     * @author lxm
     * @date 2023-06-09 05:47:41
     * @type {BaseSeriesGenerator[]}
     */
    seriesGenerators: BaseSeriesGenerator[];
    /**
     * 雷达坐标系映射
     * key是分类属性，值是雷达坐标的序号
     * @author lxm
     * @date 2023-06-08 03:51:03
     */
    radarMap: Map<string, RadarCoordSystem>;
    /**
     * 缓存已经加载的代码表数据
     * @author lxm
     * @date 2023-06-09 07:47:35
     */
    codeListMap: Map<string, Readonly<CodeListItem[]>>;
    /**
     * 维护图表序列index对应序列生成器Map
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-22 17:27:15
     */
    seriesGeneratorIndexMap: Map<number, BaseSeriesGenerator>;
    constructor(model: IDEChart, extraArgs?: IData);
    protected initSeriesGenerators(): void;
    protected calcTitleOption(chartTitle: IDEChartTitle): EChartsOption['title'];
    protected calcLegendOption(chartLegend: IDEChartLegend): EChartsOption['legend'];
    protected calcXYAxisOption(chartAxises: IChartYAxis[] | IChartXAxis[]): XAXisComponentOption[] | YAXisComponentOption[];
    /**
     * 处理轴布局位置
     *
     * @param {CodeListItem[]} items
     * @param {number} padding
     * @param {number} total
     * @param {number} index
     * @param {boolean} isRow 是否横向
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    handleAxisLayout(items: readonly IData[], padding: number, total: number, index: number, isRow?: boolean): IData[];
    /**
     * 处理轴层级
     *
     * @param {IData[]} tempaxis
     * @param {number} index
     * @param {IData[]} axisData
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    handleAxisLevel(tempaxis: IData[], index: number, axisData: IData[]): IData[];
    /**
     * 合并轴参数
     *
     * @param {(IData[] | IData)} axisData
     * @param {IData[]} tempAxis
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    mergeAxisData(axisData: IData[] | IData, tempAxis: IData[]): IData[];
    /**
     * 处理分区模式下序列模型的坐标轴位置
     *
     * @param {IData[]} seriesModel
     * @param {IData} opts
     * @memberof ChartOptionsGenerator
     */
    handleSeriesModelCoordinateAxis(seriesModel: IData[], opts: IData): void;
    /**
     * 计算指标序列对应的的数值轴位置
     *
     * @param {IData[]} seriesModel
     * @param {IData} opts
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    computeValueAxisPos(seriesModel: IData[], opts: IData): void;
    /**
     * 初始化多分类的X轴配置
     *
     * @return {*}  {Promise<void>}
     * @memberof ChartOptionsGenerator
     */
    initMultiCatalogxAxis(data: IData[], context: IContext, params: IParams): Promise<void>;
    /**
     * 处理轴标题参数
     *
     * @param {IData} [option={}]
     * @param {boolean} [titleshow=true]
     * @return {*}  {IData}
     * @memberof ChartOptionsGenerator
     */
    handleAxisTitleParam(option?: IData, titleshow?: boolean): IData;
    /**
     * 初始化
     * @author lxm
     * @date 2023-08-29 06:34:04
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<void>}
     */
    init(context: IContext, params: IParams): Promise<void>;
    /**
     * 找到实体属性的codeName小写
     * @author lxm
     * @date 2023-08-29 06:42:06
     * @param {string} fieldName 属性的name
     * @return {*}  {string}
     */
    getFieldKey(fieldName: string): string;
    /**
     * 加载代码表，
     * - 如果已经加载过会清空缓存重新加载
     * - 相同的代码表之后加载一次
     * @author lxm
     * @date 2023-06-09 08:05:28
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<void>}
     */
    loadCodeList(context: IContext, params: IParams): Promise<void>;
    /**
     * 根据数据计算出最终的options
     * @author lxm
     * @date 2023-06-09 08:10:52
     * @param {IData[]} data
     * @return {*}  {EChartsOption}
     */
    calcOptionsByData(data: IData[], context: IContext, params: IData): Promise<EChartsOption>;
    /**
     * 根据echarts给的params得到图表数据
     * @param {ECElementEvent} params
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-22 16:11:50
     */
    getChartDataByParams(params: ECElementEvent): IData | undefined;
}
//# sourceMappingURL=chart-options-generator.d.ts.map