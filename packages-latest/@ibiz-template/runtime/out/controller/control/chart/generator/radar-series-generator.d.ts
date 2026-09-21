import { IChartSeriesRadar } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 雷达序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:03
 * @export
 * @class RadarSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesRadar>}
 */
export declare class RadarSeriesGenerator extends BaseSeriesGenerator<IChartSeriesRadar> {
    protected calcStaticOptions(): SeriesOption;
    /**
     * 计算雷达坐标系
     * @author lxm
     * @date 2023-06-11 07:08:30
     * @param {IData[]} data
     */
    calcRadarCoordSystem(data: IData[]): void;
    calcByData(_data: IData[]): SeriesOption | SeriesOption[];
}
//# sourceMappingURL=radar-series-generator.d.ts.map