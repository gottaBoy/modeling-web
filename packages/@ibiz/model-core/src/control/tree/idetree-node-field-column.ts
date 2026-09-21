import { IDETreeNodeColumn } from './idetree-node-column';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 继承父接口类型值[DEFGRIDCOLUMN]
 * @export
 * @interface IDETreeNodeFieldColumn
 */
export interface IDETreeNodeFieldColumn extends IDETreeNodeColumn {
  /**
   * 代码表输出模式
   * @description 值模式 [列表项代码表转换模式] {NONE：直接值、 FRONT：绘制时转换（前台）、 BACKEND：控制器转换（后台） }
   * @type {( string | 'NONE' | 'FRONT' | 'BACKEND')}
   * 来源  getCLConvertMode
   */
  clconvertMode?: string | 'NONE' | 'FRONT' | 'BACKEND';

  /**
   * 链接视图
   *
   * @type {string}
   * 来源  getLinkPSAppView
   */
  linkAppViewId?: string;

  /**
   * 链接值项
   * @type {string}
   * 来源  getLinkValueItem
   */
  linkValueItem?: string;

  /**
   * 对象标识属性[OBJECTIDFIELD]
   * @type {string}
   * 来源  getObjectIdField
   */
  objectIdField?: string;

  /**
   * 对象名称属性[OBJECTNAMEFIELD]
   * @type {string}
   * 来源  getObjectNameField
   */
  objectNameField?: string;

  /**
   * 对象值属性[OBJECTVALUEFIELD]
   * @type {string}
   * 来源  getObjectValueField
   */
  objectValueField?: string;

  /**
   * 应用代码表
   *
   * @type {string}
   * 来源  getPSAppCodeList
   */
  appCodeListId?: string;

  /**
   * 列应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 内置界面行为
   *
   * @type {string}
   * 来源  getPSDEUIAction
   */
  deuiactionId?: string;

  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;

  /**
   * 多项文本分隔符[TEXTSEPARATOR]
   * @type {string}
   * 来源  getTextSeparator
   */
  textSeparator?: string;

  /**
   * 单位名称
   * @type {string}
   * 来源  getUnitName
   */
  unitName?: string;

  /**
   * 单位宽度
   * @type {number}
   * @default 0
   * 来源  getUnitNameWidth
   */
  unitNameWidth?: number;

  /**
   * 值格式化
   * @type {string}
   * 来源  getValueFormat
   */
  valueFormat?: string;

  /**
   * 多项值分隔符[VALUESEPARATOR]
   * @type {string}
   * 来源  getValueSeparator
   */
  valueSeparator?: string;

  /**
   * 值类型[VALUETYPE]{SIMPLE|SIMPLES|OBJECT|OBJECTS}
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
   * 启用项权限控制
   * @type {boolean}
   * @default false
   * 来源  isEnableItemPriv
   */
  enableItemPriv?: boolean;

  /**
   * 支持链接视图
   * @type {boolean}
   * @default false
   * 来源  isEnableLinkView
   */
  enableLinkView?: boolean;

  /**
   * 支持单位
   * @type {boolean}
   * @default false
   * 来源  isEnableUnitName
   */
  enableUnitName?: boolean;
}
