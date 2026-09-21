import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件数据容器模型基础对象接口
 * @export
 * @interface IControlXDataContainer
 */
export interface IControlXDataContainer extends IModelObject {
  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 支持编辑数据
   * @type {boolean}
   * 来源  isEnableEditData
   */
  enableEditData?: boolean;

  /**
   * 支持新建数据
   * @type {boolean}
   * 来源  isEnableNewData
   */
  enableNewData?: boolean;

  /**
   * 支持删除数据
   * @type {boolean}
   * 来源  isEnableRemoveData
   */
  enableRemoveData?: boolean;

  /**
   * 默认加载数据
   * @type {boolean}
   * @default true
   * 来源  isLoadDefault
   */
  loadDefault?: boolean;
}
