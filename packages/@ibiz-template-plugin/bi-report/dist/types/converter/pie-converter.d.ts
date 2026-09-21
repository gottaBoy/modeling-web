import { IAppBIReport, IAppBIReportDimension } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 饼图转化器
 *
 * @author tony001
 * @date 2024-06-06 15:06:12
 * @export
 * @class PieConverter
 * @implements {IChartConverter}
 */
export declare class PieConverter extends BaseConverter {
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
     *计算最大，最小值
     *
     * @param {*} series
     * @param {IData} seriesParams
     * @param {IData} _items
     * @param {string} _valueCode
     * @return {*}
     * @memberof PieConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转换饼图样式
     *
     * @author tony001
     * @date 2024-06-12 18:06:38
     * @param {IAppBIReport} config
     * @return {*}  {IChartModelParams}
     */
    transformStyle(config: IAppBIReport, dimension: IAppBIReportDimension, chartid: string): IChartModelParams;
}
