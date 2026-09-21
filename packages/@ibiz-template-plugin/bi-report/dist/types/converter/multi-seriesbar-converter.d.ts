import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 条形图转化器
 *
 * @export
 * @class MultiSeriesBarConverter
 * @implements {IChartConverter}
 */
export declare class MultiSeriesBarConverter extends BaseConverter {
    /**
     * 条形图数据转模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof MultiSeriesBarConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 计算最大最小值
     *
     * @param {IData} seriesParams
     * @param {IData} _items
     * @param {string} _valueCode
     * @return {*}
     * @memberof MultiSeriesBarConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转化条形图样式
     *
     * @param {IData} config
     * @return {*}  {IChartModelParams}
     * @memberof MultiSeriesBarConverter
     */
    transformStyle(config: IData, serieGroup: IData[] | undefined, chartid: string): IChartModelParams;
    /**
     * @description 重写x轴标题
     * @return {*}
     * @memberof MultiSeriesBarConverter
     */
    axisLabel(): IData;
}
