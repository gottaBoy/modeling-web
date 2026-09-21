import { IAppBIReport } from '@ibiz/model-core';
import { ConverterBase } from './base';
/**
 * @description 转换器工厂
 * @export
 * @class ConverterFactory
 */
export declare class ConverterFactory {
    /**
     * @description 创建转换器
     * @static
     * @param {('NUMBER'
     *       | 'GAUGE'
     *       | 'MULTI_SERIES_COL'
     *       | 'STACK_COL'
     *       | 'ZONE_COL'
     *       | 'MULTI_SERIES_BAR'
     *       | 'STACK_BAR'
     *       | 'MULTI_SERIES_LINE'
     *       | 'ZONE_LINE'
     *       | 'AREA'
     *       | 'GRID'
     *       | 'CROSSTABLE'
     *       | 'PIE'
     *       | 'RADAR'
     *       | 'SCATTER')} chartType
     * @returns {*}  {(BaseConverter | undefined)}
     * @memberof ConverterFactory
     */
    static createConverter(chartType: 'NUMBER' | 'GAUGE' | 'MULTI_SERIES_COL' | 'STACK_COL' | 'ZONE_COL' | 'MULTI_SERIES_BAR' | 'STACK_BAR' | 'MULTI_SERIES_LINE' | 'ZONE_LINE' | 'AREA' | 'GRID' | 'CROSSTABLE' | 'PIE' | 'RADAR' | 'SCATTER', model: IAppBIReport, context: IContext, params: IParams): ConverterBase | undefined;
}
//# sourceMappingURL=converter-factory.d.ts.map