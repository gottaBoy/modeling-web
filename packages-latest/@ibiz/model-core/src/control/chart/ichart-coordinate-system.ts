import { IModelObject } from '../../imodel-object';

/**
 *
 * 图表坐标系模型基础对象接口
 * 子接口类型识别属性[type]
 * @export
 * @interface IChartCoordinateSystem
 */
export interface IChartCoordinateSystem extends IModelObject {
  /**
   * ECharts坐标系类型
   * @type {string}
   * 来源  getEChartsType
   */
  echartsType?: string;

  /**
   * 坐标系索引
   * @type {number}
   * 来源  getIndex
   */
  index?: number;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 坐标系类型
   * @description 值模式 [实体图表坐标系统] {XY：直角坐标系、 POLAR：极坐标系、 RADAR：雷达坐标系、 PARALLEL：平行坐标系、 SINGLE：单轴坐标系、 CALENDAR：日历坐标系、 MAP：地图坐标系、 NONE：无坐标系 }
   * @type {( string | 'XY' | 'POLAR' | 'RADAR' | 'PARALLEL' | 'SINGLE' | 'CALENDAR' | 'MAP' | 'NONE')}
   * 来源  getType
   */
  type?:
    | string
    | 'XY'
    | 'POLAR'
    | 'RADAR'
    | 'PARALLEL'
    | 'SINGLE'
    | 'CALENDAR'
    | 'MAP'
    | 'NONE';
}
