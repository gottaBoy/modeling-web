import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 图表轴模型基础对象接口
 * @export
 * @interface IChartAxes
 */
export interface IChartAxes extends IModelObject {
  /**
   * 坐标轴位置
   * @description 值模式 [图表坐标轴位置] {left：左侧、 bottom：下方、 right：右侧、 top：上方、 radial：径向轴(Radial)、 angular：角度轴(Angular) }
   * @type {( string | 'left' | 'bottom' | 'right' | 'top' | 'radial' | 'angular')}
   * 来源  getAxesPos
   */
  axesPos?: string | 'left' | 'bottom' | 'right' | 'top' | 'radial' | 'angular';

  /**
   * 坐标轴类型
   * @description 值模式 [图表坐标轴类型] {numeric：数值、 time：时间、 category：分类、 log：对数轴 }
   * @type {( string | 'numeric' | 'time' | 'category' | 'log')}
   * 来源  getAxesType
   */
  axesType?: string | 'numeric' | 'time' | 'category' | 'log';

  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 坐标系统索引
   * @type {number}
   * 来源  getCoordinateSystemIndex
   */
  coordinateSystemIndex?: number;

  /**
   * 数据显示模式
   * @description 值模式 [图表坐标轴数据显示方式] {0：未定义、 1：纵、 2：横、 3：斜 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getDataShowMode
   */
  dataShowMode?: number | 0 | 1 | 2 | 3;

  /**
   * 最大值
   * @type {number}
   * 来源  getMaxValue
   */
  maxValue?: number;

  /**
   * 最小值
   * @type {number}
   * 来源  getMinValue
   */
  minValue?: number;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;
}
