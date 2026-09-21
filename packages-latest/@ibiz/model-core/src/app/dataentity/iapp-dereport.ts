import { IAppBIReport } from '../bi/iapp-bireport';
import { IAppDEReportItem } from './iapp-dereport-item';
import { ILayoutPanel } from '../../control/panel/ilayout-panel';
import { IDEReport } from '../../dataentity/report/idereport';

/**
 *
 * 应用实体报表模型对象接口
 * @export
 * @interface IAppDEReport
 */
export interface IAppDEReport extends IDEReport {
  /**
   * 应用智能报表立方体
   *
   * @type {string}
   * 来源  getPSAppBICube
   */
  appBICubeId?: string;

  /**
   * 应用智能报表
   *
   * @type {IAppBIReport}
   * 来源  getPSAppBIReport
   */
  appBIReport?: IAppBIReport;

  /**
   * 应用智能报表体系
   *
   * @type {string}
   * 来源  getPSAppBIScheme
   */
  appBISchemeId?: string;

  /**
   * 应用实体数据集合
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体数据集合2
   *
   * @type {string}
   * 来源  getPSAppDEDataSet2
   */
  appDEDataSet2Id?: string;

  /**
   * 应用实体数据集合3
   *
   * @type {string}
   * 来源  getPSAppDEDataSet3
   */
  appDEDataSet3Id?: string;

  /**
   * 应用实体数据集合4
   *
   * @type {string}
   * 来源  getPSAppDEDataSet4
   */
  appDEDataSet4Id?: string;

  /**
   * 应用实体报表项集合
   *
   * @type {IAppDEReportItem[]}
   * 来源  getPSAppDEReportItems
   */
  appDEReportItems?: IAppDEReportItem[];

  /**
   * 布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getPSLayoutPanel
   */
  layoutPanel?: ILayoutPanel;
}
