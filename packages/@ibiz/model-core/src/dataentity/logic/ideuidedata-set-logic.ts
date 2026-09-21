import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[DEDATASET]
 * @export
 * @interface IDEUIDEDataSetLogic
 */
export interface IDEUIDEDataSetLogic extends IDEUILogicNode {
  /**
   * 应用实体数据集对象
   *
   * @type {string}
   * 来源  getDstPSAppDEDataSet
   */
  dstAppDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getDstPSAppDataEntity
   */
  dstAppDataEntityId?: string;

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDEUILogicParam
   */
  retDEUILogicParamId?: string;
}
