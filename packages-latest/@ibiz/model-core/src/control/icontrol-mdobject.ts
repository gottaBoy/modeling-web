import { IModelObject } from '../imodel-object';

/**
 *
 * 多项数据界面部件相关对象模型基础对象接口
 * @export
 * @interface IControlMDObject
 */
export interface IControlMDObject extends IModelObject {
  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;
}
