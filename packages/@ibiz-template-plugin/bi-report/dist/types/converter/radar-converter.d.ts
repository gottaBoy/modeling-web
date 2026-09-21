import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 雷达图转换器
 *
 * @export
 * @class RadarConverter
 * @extends {BaseConverter}
 */
export declare class RadarConverter extends BaseConverter {
    /**
     * 数据转模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof RadarConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 计算最大最小值
     *
     * @param {IData} seriesParams
     * @param {IData} _items
     * @param {string} _valueCode
     * @return {*}
     * @memberof RadarConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转换雷达图样式
     *
     * @param {IAppBIReport} config 报表模型
     * @return {*}  {IChartModelParams}
     * @memberof RadarConverter
     */
    transformStyle(config: IAppBIReport): IChartModelParams;
}
