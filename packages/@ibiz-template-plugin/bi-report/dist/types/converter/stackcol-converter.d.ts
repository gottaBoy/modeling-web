import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 堆叠柱状图转化器
 *
 * @export
 * @class StackColConverter
 * @implements {IChartConverter}
 */
export declare class StackColConverter extends BaseConverter {
    /**
     * 通过数据翻译模型
     *
     * @param {(IData | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof StackColConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 计算最大，最小值
     *
     * @param {*} series
     * @param {IData} seriesParams
     * @param {IData} _items
     * @param {string} _valueCode
     * @return {*}
     * @memberof StackColConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转化堆叠图样式
     *
     * @param {IData} config
     * @return {*}  {IChartModelParams}
     * @memberof StackColConverter
     */
    transformStyle(config: IData, serieGroup: IData[] | undefined, chartid: string): IChartModelParams;
    /**
     * @description 重写x轴标题
     * @return {*}
     * @memberof MultiSeriesBarConverter
     */
    axisLabel(): IData;
}
