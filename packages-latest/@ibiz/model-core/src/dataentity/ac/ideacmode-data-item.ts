import { IDataItem } from '../../data/idata-item';

/**
 *
 * 实体自动填充数据项模型对象接口
 * @export
 * @interface IDEACModeDataItem
 */
export interface IDEACModeDataItem extends IDataItem {
  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 脚本代码模式
   * @type {boolean}
   * @default false
   * 来源  isCustomCode
   */
  customCode?: boolean;
}
