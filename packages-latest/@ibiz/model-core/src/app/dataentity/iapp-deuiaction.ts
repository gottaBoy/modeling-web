import { IAppUIAction } from '../view/iapp-uiaction';
import { IDEEditForm } from '../../control/form/ideedit-form';
import { IDEUIAction } from '../../dataentity/uiaction/ideuiaction';

/**
 *
 * 应用实体界面行为模型对象接口
 * @export
 * @interface IAppDEUIAction
 */
export interface IAppDEUIAction extends IDEUIAction, IAppUIAction {
  /**
   * 无权限显示模式
   * @description 值模式 [无权限按钮显示模式] {1：禁用、 2：隐藏、 6：隐藏且默认隐藏 }
   * @type {( number | 1 | 2 | 6)}
   * @default 2
   * 来源  getNoPrivDisplayMode
   */
  noPrivDisplayMode?: number | 1 | 2 | 6;

  /**
   * 前端应用视图
   *
   * @type {string}
   * 来源  getFrontPSAppView
   */
  frontAppViewId?: string;

  /**
   * 应用实体自填模式
   *
   * @type {string}
   * 来源  getPSAppDEACMode
   */
  appDEACModeId?: string;

  /**
   * 应用实体数据导出
   *
   * @type {string}
   * 来源  getPSAppDEDataExport
   */
  appDEDataExportId?: string;

  /**
   * 应用实体数据导入
   *
   * @type {string}
   * 来源  getPSAppDEDataImport
   */
  appDEDataImportId?: string;

  /**
   * 应用实体方法
   *
   * @type {string}
   * 来源  getPSAppDEMethod
   */
  appDEMethodId?: string;

  /**
   * 应用实体打印
   *
   * @type {string}
   * 来源  getPSAppDEPrint
   */
  appDEPrintId?: string;

  /**
   * 应用实体界面逻辑
   *
   * @type {string}
   * 来源  getPSAppDEUILogic
   */
  appDEUILogicId?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 应用预置界面逻辑
   *
   * @type {string}
   * 来源  getPSAppUILogic
   */
  appUILogicId?: string;

  /**
   * 编辑表单
   *
   * @type {IDEEditForm}
   * 来源  getPSDEEditForm
   */
  deeditForm?: IDEEditForm;
}
