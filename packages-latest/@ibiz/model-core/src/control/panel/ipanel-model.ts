import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IPanelModel
 */
export interface IPanelModel extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 数据类型
   * @description 值模式 [部件模型变量类型] {OBJECT：对象、 OBJECTARRAY：对象集合、 STRING：字符串、 STRINGARRAY：字符串数组、 INT：整形、 INTARRAY：整形数组、 NUMBER：数值、 NUMBERARRAY：数值数组、 BOOL：布尔值 }
   * @type {( string | 'OBJECT' | 'OBJECTARRAY' | 'STRING' | 'STRINGARRAY' | 'INT' | 'INTARRAY' | 'NUMBER' | 'NUMBERARRAY' | 'BOOL')}
   * 来源  getDataType
   */
  dataType?:
    | string
    | 'OBJECT'
    | 'OBJECTARRAY'
    | 'STRING'
    | 'STRINGARRAY'
    | 'INT'
    | 'INTARRAY'
    | 'NUMBER'
    | 'NUMBERARRAY'
    | 'BOOL';

  /**
   * 模型类型
   * @description 值模式 [系统面板模型类型] {PANELMODEL：面板定义模型、 VIEWMODEL：视图定义模型、 CTRLMODEL：部件定义模型 }
   * @type {( string | 'PANELMODEL' | 'VIEWMODEL' | 'CTRLMODEL')}
   * 来源  getType
   */
  type?: string | 'PANELMODEL' | 'VIEWMODEL' | 'CTRLMODEL';

  /**
   * 部件模型
   * @type {boolean}
   * @default false
   * 来源  isCtrlModel
   */
  ctrlModel?: boolean;

  /**
   * 面板模型
   * @type {boolean}
   * @default false
   * 来源  isPanelModel
   */
  panelModel?: boolean;

  /**
   * 视图模型
   * @type {boolean}
   * @default false
   * 来源  isViewModel
   */
  viewModel?: boolean;
}
