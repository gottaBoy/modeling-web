import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 仪表盘转化器
 *
 * @export
 * @class GaugeConverter
 * @implements {IChartConverter}
 */
export declare class GaugeConverter extends BaseConverter {
    /**
     * 翻译数据到模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof GaugeConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 转换模型自定义参数
     *
     * @param {IAppBIReport} config
     * @param {IData[]} _items
     * @return {*}  {IChartModelParams}
     * @memberof GaugeConverter
     */
    transform(config: IAppBIReport, _items: IData[]): IChartModelParams;
}
