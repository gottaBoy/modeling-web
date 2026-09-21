import { IAppBIReport } from '@ibiz/model-core';
import { IChartModelParams } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 分区柱状图转化器
 *
 * @export
 * @class ZoneColConverter
 * @implements {IChartConverter}
 */
export declare class ZoneColConverter extends BaseConverter {
    /**
     *通过数据翻译模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof ZoneColConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 计算最大最小值
     *
     * @param {IData} seriesParams
     * @param {IData} _items
     * @param {string} _valueCode
     * @return {*}
     * @memberof ZoneColConverter
     */
    computeMaxMin(seriesParams: IData, _items: IData, series: IData): {
        'EC.label': string;
    };
    /**
     * 转换分区柱状图样式
     *
     * @param {IData} config
     * @return {*}  {IChartModelParams}
     * @memberof ZoneColConverter
     */
    transformStyle(config: IData, serieGroup: IData[] | undefined, chartid: string): IChartModelParams;
    /**
     * 获取图表默认配置
     *
     * @param {string} [position='']
     * @return {*}
     * @memberof ZoneColConverter
     */
    getDefaultGridOptions(position?: string): string;
}
