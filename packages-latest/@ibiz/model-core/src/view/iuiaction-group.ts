import { IUIActionGroupDetail } from './iuiaction-group-detail';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面行为组模型基础对象接口
 * @export
 * @interface IUIActionGroup
 */
export interface IUIActionGroup extends IModelObject {
  /**
   * 组标记
   * @type {string}
   * 来源  getGroupTag
   */
  groupTag?: string;

  /**
   * 组标记2
   * @type {string}
   * 来源  getGroupTag2
   */
  groupTag2?: string;

  /**
   * 组标记3
   * @type {string}
   * 来源  getGroupTag3
   */
  groupTag3?: string;

  /**
   * 组标记4
   * @type {string}
   * 来源  getGroupTag4
   */
  groupTag4?: string;

  /**
   * 组成员对象集合
   *
   * @type {IUIActionGroupDetail[]}
   * 来源  getPSUIActionGroupDetails
   */
  uiactionGroupDetails?: IUIActionGroupDetail[];
}
