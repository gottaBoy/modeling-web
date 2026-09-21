import { IBIReportChartController, IChartConverter } from '../interface';
export declare class BaseConverter implements IChartConverter {
    protected controller: IBIReportChartController;
    /**
     * 图例间隔
     *
     * @type {number}
     * @memberof BaseConverter
     */
    legendGap: number;
    /**
     * Creates an instance of BaseConverter.
     * @param {IBIReportChartController} controller
     * @memberof BaseConverter
     */
    constructor(controller: IBIReportChartController);
    /**
     * 转化数据到模型
     *
     * @author tony001
     * @date 2024-06-25 17:06:45
     * @param {(IData | undefined)} data
     * @param {IModel} model
     * @param {(IData | undefined)} [opts]
     * @return {*}  {(Promise<IModel | undefined>)}
     */
    translateDataToModel(data: IData | undefined, model: IModel, opts?: IData | undefined): Promise<IModel | undefined>;
    /**
     * 获取图例参数
     *
     * @type {number}
     * @memberof BaseConverter
     */
    getLegendOPtions(position: string): IData;
    /**
     * 获取图表默认配置
     *
     * @type {number}
     * @memberof BaseConverter
     */
    getDefaultGridOptions(position?: string): string;
    /**
     * @description x轴标签
     * @return {*}
     * @memberof BaseConverter
     */
    axisLabel(): IData;
    /**
     * 使用间隔的时候加上省略限制
     *
     * @param {boolean} [tag=false]
     * @return {*}
     * @memberof BaseConverter
     */
    computeLabelEllipsis(tag?: boolean, labelInterval?: number): {
        width: number;
        overflow: string;
        ellipsis: string;
    } | {
        width?: undefined;
        overflow?: undefined;
        ellipsis?: undefined;
    };
    /**
     * 计算轴应用
     *
     * @param {IData} series
     * @param {IData} uiModel
     * @param {boolean} [isRow=false]
     * @return {*}
     * @memberof BaseConverter
     */
    computeAxisLayout(series: IData, uiModel: IData, isRow?: boolean): {
        'EC.xAxisIndex': number;
        'EC.yAxisIndex'?: undefined;
    } | {
        'EC.yAxisIndex': number;
        'EC.xAxisIndex'?: undefined;
    } | {
        'EC.xAxisIndex'?: undefined;
        'EC.yAxisIndex'?: undefined;
    };
}
