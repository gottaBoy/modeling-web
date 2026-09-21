import { IDataItem } from '../../data/idata-item';

/**
 *
 * 实体表格数据项模型对象接口
 * @export
 * @interface IDEGridDataItem
 */
export interface IDEGridDataItem extends IDataItem {
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
   * 值类型
   * @description 值模式 [编辑器值类型] {SIMPLE：简单值、 SIMPLES：简单值数组、 OBJECT：对象（Object）、 OBJECTS：对象数组（Object[]）、 USER：用户自定义（USER）、 USER2：用户自定义2（USER2） }
   * @type {( string | 'SIMPLE' | 'SIMPLES' | 'OBJECT' | 'OBJECTS' | 'USER' | 'USER2')}
   * @default SIMPLE
   * 来源  getValueType
   */
  valueType?:
    | string
    | 'SIMPLE'
    | 'SIMPLES'
    | 'OBJECT'
    | 'OBJECTS'
    | 'USER'
    | 'USER2';

  /**
   * 脚本代码模式
   * @type {boolean}
   * @default false
   * 来源  isCustomCode
   */
  customCode?: boolean;
}
