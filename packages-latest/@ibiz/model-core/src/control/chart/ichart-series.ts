import { IControlItemNavigatable } from '../icontrol-item-navigatable';
import { IChartSeriesEncode } from './ichart-series-encode';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 图表数据序列模型基础对象接口
 * @export
 * @interface IChartSeries
 */
export interface IChartSeries extends IControlItemNavigatable {
  /**
   * 基础配置Json内容
   * @type {string}
   * 来源  getBaseOptionJOString
   */
  baseOptionJOString?: string;

  /**
   * 标题语言资源对象
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
   * 分类属性
   * @type {string}
   * 来源  getCatalogField
   */
  catalogField?: string;

  /**
   * 分类代码表对象
   *
   * @type {string}
   * 来源  getCatalogPSCodeList
   */
  catalogCodeListId?: string;

  /**
   * 值属性
   * @type {string}
   * 来源  getDataField
   */
  dataField?: string;

  /**
   * ECharts序列类型
   * @description 值模式 [实体图表序列类型] {area：区域图(Area)、 bar：条形图(Bar)、 bar3d：条形图3D(旧)(Bar3D)、 candlestick：K线图(Candlestick)、 gauge：仪表盘(Gauge)、 line：折线图(Line)、 pie：饼图(Pie)、 pie3d：饼图3D(旧)(Pie3D)、 radar：雷达图(Radar)、 scatter：散点图(Scatter)、 column：柱状图(Column)、 funnel：漏斗图(Funnel)、 map：地图(Map)、 custom：自定义(Custom) }
   * @type {( string | 'area' | 'bar' | 'bar3d' | 'candlestick' | 'gauge' | 'line' | 'pie' | 'pie3d' | 'radar' | 'scatter' | 'column' | 'funnel' | 'map' | 'custom')}
   * 来源  getEChartsType
   */
  echartsType?:
    | string
    | 'area'
    | 'bar'
    | 'bar3d'
    | 'candlestick'
    | 'gauge'
    | 'line'
    | 'pie'
    | 'pie3d'
    | 'radar'
    | 'scatter'
    | 'column'
    | 'funnel'
    | 'map'
    | 'custom';

  /**
   * 扩展值2属性
   * @type {string}
   * 来源  getExtValue2Field
   */
  extValue2Field?: string;

  /**
   * 扩展值3属性
   * @type {string}
   * 来源  getExtValue3Field
   */
  extValue3Field?: string;

  /**
   * 扩展值4属性
   * @type {string}
   * 来源  getExtValue4Field
   */
  extValue4Field?: string;

  /**
   * 扩展值属性
   * @type {string}
   * 来源  getExtValueField
   */
  extValueField?: string;

  /**
   * 分组模式
   * @description 值模式 [云实体图表自动分组模式] {YEAR：年、 QUARTER：季度、 MONTH：月份、 YEARWEEK：年周、 DAY：日、 CODELIST：代码表 }
   * @type {( string | 'YEAR' | 'QUARTER' | 'MONTH' | 'YEARWEEK' | 'DAY' | 'CODELIST')}
   * 来源  getGroupMode
   */
  groupMode?:
    | string
    | 'YEAR'
    | 'QUARTER'
    | 'MONTH'
    | 'YEARWEEK'
    | 'DAY'
    | 'CODELIST';

  /**
   * 序列标识属性
   * @type {string}
   * 来源  getIdField
   */
  idField?: string;

  /**
   * 图表坐标系统
   *
   * @type {string}
   * 来源  getPSChartCoordinateSystem
   */
  chartCoordinateSystemId?: string;

  /**
   * 图表数据集对象
   *
   * @type {string}
   * 来源  getPSChartDataSet
   */
  chartDataSetId?: string;

  /**
   * 图表序列编码
   *
   * @type {IChartSeriesEncode}
   * 来源  getPSChartSeriesEncode
   */
  chartSeriesEncode?: IChartSeriesEncode;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 序列名称属性
   * @type {string}
   * 来源  getSeriesField
   */
  seriesField?: string;

  /**
   * 结果集行列模式
   * @type {string}
   * 来源  getSeriesLayoutBy
   */
  seriesLayoutBy?: string;

  /**
   * 序列代码表对象
   *
   * @type {string}
   * 来源  getSeriesPSCodeList
   */
  seriesCodeListId?: string;

  /**
   * 图形类型
   * @description 值模式 [实体图表序列类型] {area：区域图(Area)、 bar：条形图(Bar)、 bar3d：条形图3D(旧)(Bar3D)、 candlestick：K线图(Candlestick)、 gauge：仪表盘(Gauge)、 line：折线图(Line)、 pie：饼图(Pie)、 pie3d：饼图3D(旧)(Pie3D)、 radar：雷达图(Radar)、 scatter：散点图(Scatter)、 column：柱状图(Column)、 funnel：漏斗图(Funnel)、 map：地图(Map)、 custom：自定义(Custom) }
   * @type {( string | 'area' | 'bar' | 'bar3d' | 'candlestick' | 'gauge' | 'line' | 'pie' | 'pie3d' | 'radar' | 'scatter' | 'column' | 'funnel' | 'map' | 'custom')}
   * 来源  getSeriesType
   */
  seriesType?:
    | string
    | 'area'
    | 'bar'
    | 'bar3d'
    | 'candlestick'
    | 'gauge'
    | 'line'
    | 'pie'
    | 'pie3d'
    | 'radar'
    | 'scatter'
    | 'column'
    | 'funnel'
    | 'map'
    | 'custom';

  /**
   * 标记属性
   * @type {string}
   * 来源  getTagField
   */
  tagField?: string;

  /**
   * 值属性
   * @type {string}
   * 来源  getValueField
   */
  valueField?: string;

  /**
   * 支持图表数据集
   * @type {boolean}
   * 来源  isEnableChartDataSet
   */
  enableChartDataSet?: boolean;
}
