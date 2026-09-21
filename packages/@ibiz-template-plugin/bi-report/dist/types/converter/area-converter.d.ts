import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 面积图转化器
 *
 * @export
 * @class AreaConverter
 * @implements {IChartConverter}
 */
export declare class AreaConverter extends BaseConverter {
    /**
     * 通过数据翻译模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof AreaConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 计算最大，最小值
     *
     * @param {IData} seriesParams
     * @param {IData} _items
     * @param {string} _valueCode
     * @return {*}
     * @memberof AreaConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转化面积图样式
     *
     * @param {IData} config
     * @return {*}  {IChartModelParams}
     * @memberof AreaConverter
     */
    transformStyle(config: IData, serieGroup: IData[] | undefined, chartid: string): IChartModelParams;
}
