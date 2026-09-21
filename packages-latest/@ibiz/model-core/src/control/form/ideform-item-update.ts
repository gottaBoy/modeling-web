import { IDEFIUpdateDetail } from './idefiupdate-detail';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体表单项更新模型对象接口
 * @export
 * @interface IDEFormItemUpdate
 */
export interface IDEFormItemUpdate extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 处理应用实体方法
   *
   * @type {string}
   * 来源  getPSAppDEMethod
   */
  appDEMethodId?: string;

  /**
   * 表单项更新成员集合
   *
   * @type {IDEFIUpdateDetail[]}
   * 来源  getPSDEFIUpdateDetails
   */
  defiupdateDetails?: IDEFIUpdateDetail[];

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 自定义脚本代码
   * @type {boolean}
   * @default false
   * 来源  isCustomCode
   */
  customCode?: boolean;

  /**
   * 显示处理提示
   * @type {boolean}
   * @default true
   * 来源  isShowBusyIndicator
   */
  showBusyIndicator?: boolean;
}
