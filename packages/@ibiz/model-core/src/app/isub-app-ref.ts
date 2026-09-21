import { IAppMenuModel } from './appmenu/iapp-menu-model';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISubAppRef
 */
export interface ISubAppRef extends IModelObject {
  /**
   * 访问标识
   * @type {string}
   * 来源  getAccessKey
   */
  accessKey?: string;

  /**
   *  应用实体界面行为组集合
   *
   * @type {string[]}
   * 来源  getAllPSAppDEUIActionGroups
   */
  appDEUIActionGroupIds?: string[];

  /**
   *  合并菜单集合（除默认菜单）
   *
   * @type {string[]}
   * 来源  getAllPSAppMenuModels
   */
  appMenuModelIds?: string[];

  /**
   *  应用插件集合
   *
   * @type {string[]}
   * 来源  getAllPSAppPFPluginRefs
   */
  appPFPluginRefIds?: string[];

  /**
   *  应用门户部件集合
   *
   * @type {string[]}
   * 来源  getAllPSAppPortlets
   */
  appPortletIds?: string[];

  /**
   *  合并视图引用集合
   *
   * @type {string[]}
   * 来源  getAllPSAppViewRefs
   */
  appViewRefIds?: string[];

  /**
   * 应用视图集合
   *
   * @type {string[]}
   * 来源  getAllPSAppViews
   */
  appViewIds?: string[];

  /**
   *  合并部件集合（除关系部件）
   *
   * @type {string[]}
   * 来源  getAllPSControls
   */
  controlIds?: string[];

  /**
   *  应用实体关系部件集合
   *
   * @type {string[]}
   * 来源  getAllPSDEDRControls
   */
  dedrcontrolIds?: string[];

  /**
   * 模型戳
   * @type {string}
   * 来源  getModelStamp
   */
  modelStamp?: string;

  /**
   * 应用菜单模型
   *
   * @type {IAppMenuModel}
   * 来源  getPSAppMenuModel
   */
  appMenuModel?: IAppMenuModel;

  /**
   * 引用参数
   * @type {string}
   * 来源  getRefParam
   */
  refParam?: string;

  /**
   * 引用参数2
   * @type {string}
   * 来源  getRefParam2
   */
  refParam2?: string;

  /**
   * 应用服务标识
   * @type {string}
   * 来源  getServiceId
   */
  serviceId?: string;
}
