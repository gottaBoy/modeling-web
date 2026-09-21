import { IControlItem } from '../icontrol-item';
import { IChartObject } from './ichart-object';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 图表轴模型基础对象接口
 * @export
 * @interface IChartAxis
 */
export interface IChartAxis extends IChartObject, IControlItem {
  /**
   * 基础配置Json内容
   * @type {string}
   * 来源  getBaseOptionJOString
   */
  baseOptionJOString?: string;

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
   * 数据显示模式
   * @description 值模式 [图表坐标轴数据显示方式] {0：未定义、 1：纵、 2：横、 3：斜 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getDataShowMode
   */
  dataShowMode?: number | 0 | 1 | 2 | 3;

  /**
   * ECharts位置
   * @type {string}
   * 来源  getEChartsPos
   */
  echartsPos?: string;

  /**
   * ECharts类型
   * @type {string}
   * 来源  getEChartsType
   */
  echartsType?: string;

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

  /**
   * 位置
   * @description 值模式 [图表坐标轴位置] {left：左侧、 bottom：下方、 right：右侧、 top：上方、 radial：径向轴(Radial)、 angular：角度轴(Angular) }
   * @type {( string | 'left' | 'bottom' | 'right' | 'top' | 'radial' | 'angular')}
   * 来源  getPosition
   */
  position?:
    | string
    | 'left'
    | 'bottom'
    | 'right'
    | 'top'
    | 'radial'
    | 'angular';

  /**
   * 类型
   * @description 值模式 [图表坐标轴类型] {numeric：数值、 time：时间、 category：分类、 log：对数轴 }
   * @type {( string | 'numeric' | 'time' | 'category' | 'log')}
   * 来源  getType
   */
  type?: string | 'numeric' | 'time' | 'category' | 'log';
}
