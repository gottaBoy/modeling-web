import { IDataItem } from '../../data/idata-item';

/**
 *
 * 实体树节点数据线模型对象接口
 * @export
 * @interface IDETreeNodeDataItem
 */
export interface IDETreeNodeDataItem extends IDataItem {
  /**
   * 代码表输出模式
   * @description 值模式 [列表项代码表转换模式] {NONE：直接值、 FRONT：绘制时转换（前台）、 BACKEND：控制器转换（后台） }
   * @type {( string | 'NONE' | 'FRONT' | 'BACKEND')}
   * 来源  getCLConvertMode
   */
  clconvertMode?: string | 'NONE' | 'FRONT' | 'BACKEND';

  /**
   * 默认值
   * @type {string}
   * 来源  getDefaultValue
   */
  defaultValue?: string;

  /**
   * 前端代码表
   *
   * @type {string}
   * 来源  getFrontPSCodeList
   */
  frontCodeListId?: string;

  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 树视图列
   *
   * @type {string}
   * 来源  getPSDETreeColumn
   */
  detreeColumnId?: string;

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

  /**
   * 启用项权限控制
   * @type {boolean}
   * @default false
   * 来源  isEnableItemPriv
   */
  enableItemPriv?: boolean;
}
