import { IChartSeriesRadar } from '@ibiz/model-core';
import type { RadarSeriesOption, SeriesOption } from 'echarts';
import { clone, mergeDeepRight } from 'ramda';
import { BaseSeriesGenerator, DEFAULT_GROUP } from './base-series-generator';
import { RadarCoordSystem } from './radar-coord-system';

/**
 * 雷达序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:03
 * @export
 * @class RadarSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesRadar>}
 */
export class RadarSeriesGenerator extends BaseSeriesGenerator<IChartSeriesRadar> {
  protected calcStaticOptions(): SeriesOption {
    const options = super.calcStaticOptions() as RadarSeriesOption;

    return options;
  }

  /**
   * 计算雷达坐标系
   * @author lxm
   * @date 2023-06-11 07:08:30
   * @param {IData[]} data
   */
  calcRadarCoordSystem(data: IData[]): void {
    const tempItems = data.map((item: IData) => {
      return clone(item);
    });
    const groupData = this.calcGroupData(tempItems);

    // 创建雷达坐标系对象
    if (!this.chartGenerator.radarMap.has(this.catalogField)) {
      this.chartGenerator.radarMap.set(
        this.catalogField,
        new RadarCoordSystem(this.chartGenerator.radarMap.size),
      );
    }
    const radar = this.chartGenerator.radarMap.get(this.catalogField)!;

    // 更新雷达坐标系指示器和最大值
    Object.values(groupData).forEach(catalogData => {
      catalogData.forEach((catalog, key) => {
        radar.updateIndicator(key, catalog.value);
      });
    });
  }

  calcByData(_data: IData[]): SeriesOption | SeriesOption[] {
    const groupData = this.groupData!;
    const radar = this.chartGenerator.radarMap.get(this.catalogField)!;

    const radarData = Object.keys(groupData).map(group => {
      const catalogData = groupData[group];
      const value = radar.indicatorKeys.map(key => {
        if (catalogData.has(key)) {
          return catalogData.get(key)!.value;
        }
        return 0;
      });
      return {
        name: group === DEFAULT_GROUP ? this.seriesName : group,
        value,
      };
    });

    // 合并静态的seriesOptions
    let options: IData = { ...this.staticOptions, data: radarData };

    // 合并自定义参数
    if (this.seriesUserParam) {
      options = mergeDeepRight(options, this.seriesUserParam);
    }

    return options as SeriesOption;
  }
}
