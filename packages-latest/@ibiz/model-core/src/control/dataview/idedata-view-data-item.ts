import { IDataItem } from '../../data/idata-item';

/**
 *
 * 实体卡片视图部件数据项模型对象接口
 * @export
 * @interface IDEDataViewDataItem
 */
export interface IDEDataViewDataItem extends IDataItem {
  /**
   * 前端代码表对象
   *
   * @type {string}
   * 来源  getFrontPSCodeList
   */
  frontCodeListId?: string;

  /**
   * 关联应用实体属性
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
