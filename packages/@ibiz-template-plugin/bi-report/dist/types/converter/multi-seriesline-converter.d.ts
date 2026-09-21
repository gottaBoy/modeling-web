import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 折线图转换器
 *
 * @export
 * @class MultiSeriesLineConverter
 * @implements {IChartConverter}
 */
export declare class MultiSeriesLineConverter extends BaseConverter {
    /**
     * 通过数据翻译模型
     *
     * @param {(IData | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof MultiSeriesLineConverter
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
     * @memberof MultiSeriesLineConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转化折线图样式
     *
     * @param {IData} config
     * @return {*}  {IChartModelParams}
     * @memberof MultiSeriesLineConverter
     */
    transformStyle(config: IData, serieGroup: IData[] | undefined, chartid: string): IChartModelParams;
}
