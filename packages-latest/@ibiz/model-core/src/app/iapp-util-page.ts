import { IModelObject } from '../imodel-object';

/**
 *
 * 应用功能页模型对象接口
 * @export
 * @interface IAppUtilPage
 */
export interface IAppUtilPage extends IModelObject {
  /**
   * 目标应用视图
   *
   * @type {string}
   * 来源  getPSAppView
   */
  appViewId?: string;

  /**
   * 页面路径
   * @type {string}
   * 来源  getPageUrl
   */
  pageUrl?: string;

  /**
   * 目标类型
   * @description 值模式 [系统应用功能页面目标类型] {PAGEURL：页面路径、 APPVIEW：应用视图、 LAYOUTPANEL：布局面板 }
   * @type {( string | 'PAGEURL' | 'APPVIEW' | 'LAYOUTPANEL')}
   * 来源  getTargetType
   */
  targetType?: string | 'PAGEURL' | 'APPVIEW' | 'LAYOUTPANEL';

  /**
   * 动态功能参数集合
   * @type {IModel}
   * 来源  getUtilParams
   */
  utilParams?: IModel;

  /**
   * 功能标记
   * @type {string}
   * 来源  getUtilTag
   */
  utilTag?: string;

  /**
   * 功能类型
   * @description 值模式 [系统应用功能页面] {DOWNLOADTMPFILE：下载临时文件、 LOGIN：登录页面、 LOGOUT：注销页面、 START：启动视图、 USER：用户自定义 }
   * @type {( string | 'DOWNLOADTMPFILE' | 'LOGIN' | 'LOGOUT' | 'START' | 'USER')}
   * 来源  getUtilType
   */
  utilType?: string | 'DOWNLOADTMPFILE' | 'LOGIN' | 'LOGOUT' | 'START' | 'USER';
}
