import { IAppBICubeLevel } from './iapp-bicube-level';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用智能立方体维度体系模型对象接口
 * @export
 * @interface IAppBICubeHierarchy
 */
export interface IAppBICubeHierarchy extends IModelObject {
  /**
   * 全部数据标题
   * @type {string}
   * 来源  getAllCaption
   */
  caption?: string;

  /**
   * 体系标记
   * @type {string}
   * 来源  getHierarchyTag
   */
  hierarchyTag?: string;

  /**
   * 体系标记2
   * @type {string}
   * 来源  getHierarchyTag2
   */
  hierarchyTag2?: string;

  /**
   * 智能立方体维度体系级别集合
   *
   * @type {IAppBICubeLevel[]}
   * 来源  getPSAppBICubeLevels
   */
  appBICubeLevels?: IAppBICubeLevel[];

  /**
   * 相关应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 启用全部数据
   * @type {boolean}
   * @default false
   */
  hasAll?: boolean;
}
