import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体属性提示集合模型对象接口
 * @export
 * @interface IAppDEFInputTipSet
 */
export interface IAppDEFInputTipSet extends IModelObject {
  /**
   * 内容应用实体属性
   *
   * @type {string}
   * 来源  getContentPSAppDEField
   */
  contentAppDEFieldId?: string;

  /**
   * 关闭标志应用实体属性
   *
   * @type {string}
   * 来源  getEnableClosePSAppDEField
   */
  enableCloseAppDEFieldId?: string;

  /**
   * 链接应用实体属性
   *
   * @type {string}
   * 来源  getLinkPSAppDEField
   */
  linkAppDEFieldId?: string;

  /**
   * 应用实体数据集合
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 唯一标记应用实体属性
   *
   * @type {string}
   * 来源  getUniqueTagPSAppDEField
   */
  uniqueTagAppDEFieldId?: string;
}
