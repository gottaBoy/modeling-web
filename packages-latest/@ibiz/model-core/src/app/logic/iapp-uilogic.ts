import { IAppUILogicRefView } from './iapp-uilogic-ref-view';
import { ISysViewLogic } from '../../res/isys-view-logic';

/**
 *
 * 应用全局界面逻辑模型对象接口
 * 子接口类型识别属性[viewLogicType]
 * @export
 * @interface IAppUILogic
 */
export interface IAppUILogic extends ISysViewLogic {
  /**
   * 应用实体界面逻辑对象
   *
   * @type {string}
   * 来源  getPSAppDEUILogic
   */
  appDEUILogicId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 应用界面逻辑引用视图集合
   *
   * @type {IAppUILogicRefView[]}
   * 来源  getPSAppUILogicRefViews
   */
  appUILogicRefViews?: IAppUILogicRefView[];

  /**
   * 前端插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 界面逻辑类型
   * @type {string}
   * 来源  getViewLogicType
   */
  viewLogicType?: string;

  /**
   * 内建逻辑
   * @type {boolean}
   * @default true
   * 来源  isBuiltinLogic
   */
  builtinLogic?: boolean;
}
