import { IAppBIReportDimension } from './iapp-bireport-dimension';
import { IAppBIReportMeasure } from './iapp-bireport-measure';
import { ILayoutPanel } from '../../control/panel/ilayout-panel';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用智能报表模型对象接口
 * @export
 * @interface IAppBIReport
 */
export interface IAppBIReport extends IModelObject {
  /**
   * 访问标识
   * @type {string}
   * 来源  getAccessKey
   */
  accessKey?: string;

  /**
   * 系统智能立方体
   *
   * @type {string}
   * 来源  getPSAppBICube
   */
  appBICubeId?: string;

  /**
   * 智能立方体维度集合
   *
   * @type {IAppBIReportDimension[]}
   * 来源  getPSAppBIReportDimensions
   */
  appBIReportDimensions?: IAppBIReportDimension[];

  /**
   * 智能立方体指标集合
   *
   * @type {IAppBIReportMeasure[]}
   * 来源  getPSAppBIReportMeasures
   */
  appBIReportMeasures?: IAppBIReportMeasure[];

  /**
   * 相关应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getPSLayoutPanel
   */
  layoutPanel?: ILayoutPanel;

  /**
   * 报表标记
   * @type {string}
   * 来源  getReportTag
   */
  reportTag?: string;

  /**
   * 报表标记2
   * @type {string}
   * 来源  getReportTag2
   */
  reportTag2?: string;

  /**
   * 报表前端模型
   * @type {string}
   * 来源  getReportUIModel
   */
  reportUIModel?: string;
}
