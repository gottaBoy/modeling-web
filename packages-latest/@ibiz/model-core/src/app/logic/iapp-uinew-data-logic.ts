import { IAppUILogic } from './iapp-uilogic';
import { IAppUILogicRefView } from './iapp-uilogic-ref-view';

/**
 *
 * 继承父接口类型值[APP_NEWDATA]
 * @export
 * @interface IAppUINewDataLogic
 */
export interface IAppUINewDataLogic extends IAppUILogic {
  /**
   * 向导添加后操作
   * @type {string}
   * 来源  getActionAfterWizard
   */
  actionAfterWizard?: string;

  /**
   * 批添加应用实体方法
   *
   * @type {string}
   * 来源  getBatchAddPSAppDEAction
   */
  batchAddAppDEActionId?: string;

  /**
   * 批添加新建数据视图集合
   *
   * @type {IAppUILogicRefView[]}
   * 来源  getBatchAddPSAppViews
   */
  batchAddAppViews?: IAppUILogicRefView[];

  /**
   * 默认新建数据视图
   *
   * @type {IAppUILogicRefView}
   * 来源  getNewDataPSAppView
   */
  newDataAppView?: IAppUILogicRefView;

  /**
   * 多模式新建数据视图集合
   *
   * @type {IAppUILogicRefView[]}
   * 来源  getNewDataPSAppViews
   */
  newDataAppViews?: IAppUILogicRefView[];

  /**
   * 新建数据向导视图
   *
   * @type {IAppUILogicRefView}
   * 来源  getWizardPSAppView
   */
  wizardAppView?: IAppUILogicRefView;

  /**
   * 只支持批添加
   * @type {boolean}
   * 来源  isBatchAddOnly
   */
  batchAddOnly?: boolean;

  /**
   * 支持批添加
   * @type {boolean}
   * 来源  isEnableBatchAdd
   */
  enableBatchAdd?: boolean;

  /**
   * 支持向导添加
   * @type {boolean}
   * 来源  isEnableWizardAdd
   */
  enableWizardAdd?: boolean;
}
