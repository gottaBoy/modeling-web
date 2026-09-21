import { IAppPortletCat } from './iapp-portlet-cat';
import { IControl } from '../../control/icontrol';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用门户部件模型对象接口
 * @export
 * @interface IAppPortlet
 */
export interface IAppPortlet extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 应用门户部件分类
   *
   * @type {IAppPortletCat}
   * 来源  getPSAppPortletCat
   */
  appPortletCat?: IAppPortletCat;

  /**
   * 控件对象
   *
   * @type {IControl}
   * 来源  getPSControl
   */
  control?: IControl;

  /**
   * 部件动态参数
   * @type {IModel}
   * 来源  getPortletParams
   */
  portletParams?: IModel;

  /**
   * 支持应用全局数据看板
   * @type {boolean}
   * 来源  isEnableAppDashboard
   */
  enableAppDashboard?: boolean;

  /**
   * 支持实体数据看板
   * @type {boolean}
   * @default false
   * 来源  isEnableDEDashboard
   */
  enableDEDashboard?: boolean;
}
