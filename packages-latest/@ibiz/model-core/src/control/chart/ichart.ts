import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { IChartAngleAxis } from './ichart-angle-axis';
import { IChartCoordinateSystem } from './ichart-coordinate-system';
import { IChartDataSet } from './ichart-data-set';
import { IChartDataSetGroup } from './ichart-data-set-group';
import { IChartGrid } from './ichart-grid';
import { IChartParallel } from './ichart-parallel';
import { IChartParallelAxis } from './ichart-parallel-axis';
import { IChartPolar } from './ichart-polar';
import { IChartRadar } from './ichart-radar';
import { IChartRadiusAxis } from './ichart-radius-axis';
import { IChartSingle } from './ichart-single';
import { IChartSingleAxis } from './ichart-single-axis';
import { IChartXAxis } from './ichart-xaxis';
import { IChartYAxis } from './ichart-yaxis';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 图表部件基础对象接口
 * @export
 * @interface IChart
 */
export interface IChart extends IMDAjaxControl, IControlNavigatable {
  /**
   * 坐标系统类型
   * @description 值模式 [实体图表坐标系统] {XY：直角坐标系、 POLAR：极坐标系、 RADAR：雷达坐标系、 PARALLEL：平行坐标系、 SINGLE：单轴坐标系、 CALENDAR：日历坐标系、 MAP：地图坐标系、 NONE：无坐标系 }
   * @type {( string | 'XY' | 'POLAR' | 'RADAR' | 'PARALLEL' | 'SINGLE' | 'CALENDAR' | 'MAP' | 'NONE')}
   * 来源  getCoordinateSystem
   */
  coordinateSystem?:
    | string
    | 'XY'
    | 'POLAR'
    | 'RADAR'
    | 'PARALLEL'
    | 'SINGLE'
    | 'CALENDAR'
    | 'MAP'
    | 'NONE';

  /**
   * 无值显示内容
   * @type {string}
   * 来源  getEmptyText
   */
  emptyText?: string;

  /**
   * 无值内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEmptyTextPSLanguageRes
   */
  emptyTextLanguageRes?: ILanguageRes;

  /**
   * angleAxis集合
   *
   * @type {IChartAngleAxis[]}
   * 来源  getPSChartAngleAxises
   */
  chartAngleAxises?: IChartAngleAxis[];

  /**
   * 图表坐标系集合
   *
   * @type {IChartCoordinateSystem[]}
   * 来源  getPSChartCoordinateSystems
   */
  chartCoordinateSystems?: IChartCoordinateSystem[];

  /**
   * 数据集分组集合
   *
   * @type {IChartDataSetGroup[]}
   * 来源  getPSChartDataSetGroups
   */
  chartDataSetGroups?: IChartDataSetGroup[];

  /**
   * 数据集集合
   *
   * @type {IChartDataSet[]}
   * 来源  getPSChartDataSets
   */
  chartDataSets?: IChartDataSet[];

  /**
   * 直角坐标表格集合
   *
   * @type {IChartGrid[]}
   * 来源  getPSChartGrids
   */
  chartGrids?: IChartGrid[];

  /**
   * paralleAxis集合
   *
   * @type {IChartParallelAxis[]}
   * 来源  getPSChartParallelAxises
   */
  chartParallelAxises?: IChartParallelAxis[];

  /**
   * 平行坐标部件集合
   *
   * @type {IChartParallel[]}
   * 来源  getPSChartParallels
   */
  chartParallels?: IChartParallel[];

  /**
   * 极坐标部件集合
   *
   * @type {IChartPolar[]}
   * 来源  getPSChartPolars
   */
  chartPolars?: IChartPolar[];

  /**
   * 雷达部件集合
   *
   * @type {IChartRadar[]}
   * 来源  getPSChartRadars
   */
  chartRadars?: IChartRadar[];

  /**
   * radiusAxis集合
   *
   * @type {IChartRadiusAxis[]}
   * 来源  getPSChartRadiusAxises
   */
  chartRadiusAxises?: IChartRadiusAxis[];

  /**
   * singleAxis集合
   *
   * @type {IChartSingleAxis[]}
   * 来源  getPSChartSingleAxises
   */
  chartSingleAxises?: IChartSingleAxis[];

  /**
   * 单一坐标部件集合
   *
   * @type {IChartSingle[]}
   * 来源  getPSChartSingles
   */
  chartSingles?: IChartSingle[];

  /**
   * xAxis集合
   *
   * @type {IChartXAxis[]}
   * 来源  getPSChartXAxises
   */
  chartXAxises?: IChartXAxis[];

  /**
   * yAxis集合
   *
   * @type {IChartYAxis[]}
   * 来源  getPSChartYAxises
   */
  chartYAxises?: IChartYAxis[];
}
