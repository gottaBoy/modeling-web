import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 散点图转化器
 *
 * @author tony001
 * @date 2024-06-06 15:06:12
 * @export
 * @class PieConverter
 * @implements {IChartConverter}
 */
export declare class ScatterConverter extends BaseConverter {
    /**
     * 通过数据翻译模型
     *
     * @author tony001
     * @date 2024-06-06 16:06:46
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(IModel | undefined)}
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
     * @memberof ScatterConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转换散点图样式
     *
     * @param {IAppBIReport} config
     * @return {*}  {IChartModelParams}
     * @memberof ScatterConverter
     */
    transformStyle(config: IAppBIReport): IChartModelParams;
}
