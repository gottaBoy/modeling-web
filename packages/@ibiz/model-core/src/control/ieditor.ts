import { IControlAttribute } from './icontrol-attribute';
import { IControlLogic } from './icontrol-logic';
import { IControlRender } from './icontrol-render';
import { IEditorItem } from './ieditor-item';
import { ISysCss } from '../res/isys-css';
import { ISysDictCat } from '../res/isys-dict-cat';
import { IModelObject } from '../imodel-object';

/**
 *
 * 子接口类型识别属性[editorType]
 * @export
 * @interface IEditor
 */
export interface IEditor extends IModelObject {
  /**
   * 直接Css样式
   * @type {string}
   * 来源  getCssStyle
   */
  cssStyle?: string;

  /**
   * 动态样式表
   * @type {string}
   * 来源  getDynaClass
   */
  dynaClass?: string;

  /**
   * 编辑器高度
   * @type {number}
   * @default 0.0
   * 来源  getEditorHeight
   */
  editorHeight?: number;

  /**
   * 编辑器参数集合
   * @type {IModel}
   * 来源  getEditorParams
   */
  editorParams?: IModel;

  /**
   * 编辑器样式
   * @type {string}
   * 来源  getEditorStyle
   */
  editorStyle?: string;

  /**
   * 编辑器类型
   * @type {string}
   * 来源  getEditorType
   */
  editorType?: string;

  /**
   * 编辑器宽度
   * @type {number}
   * @default 0.0
   * 来源  getEditorWidth
   */
  editorWidth?: number;

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
   * 部件注入属性集合
   *
   * @type {IControlAttribute[]}
   * 来源  getPSControlAttributes
   */
  controlAttributes?: IControlAttribute[];

  /**
   * 部件逻辑集合
   *
   * @type {IControlLogic[]}
   * 来源  getPSControlLogics
   */
  controlLogics?: IControlLogic[];

  /**
   * 部件绘制器集合
   *
   * @type {IControlRender[]}
   * 来源  getPSControlRenders
   */
  controlRenders?: IControlRender[];

  /**
   * 复合编辑器项集合
   *
   * @type {IEditorItem[]}
   * 来源  getPSEditorItems
   */
  editorItems?: IEditorItem[];

  /**
   * 界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 辅助输入词条分类
   *
   * @type {ISysDictCat}
   * 来源  getPSSysDictCat
   */
  sysDictCat?: ISysDictCat;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 编辑器输入提示
   * @type {string}
   * 来源  getPlaceHolder
   */
  placeHolder?: string;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;

  /**
   * 多项文本分隔符[TEXTSEPARATOR]
   * @type {string}
   * 来源  getTextSeparator
   */
  textSeparator?: string;

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
   * 禁用状态[DISABLED]
   * @type {boolean}
   * @default false
   * 来源  isDisabled
   */
  disabled?: boolean;

  /**
   * 支持编辑
   * @type {boolean}
   * @default true
   * 来源  isEditable
   */
  editable?: boolean;

  /**
   * 只读状态[READONLY]
   * @type {boolean}
   * @default false
   * 来源  isReadOnly
   */
  readOnly?: boolean;
}
