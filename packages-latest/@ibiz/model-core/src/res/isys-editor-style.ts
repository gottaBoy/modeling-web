import { ISysCss } from './isys-css';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISysEditorStyle
 */
export interface ISysEditorStyle extends IModelObject {
  /**
   * 界面处理模式
   * @description 值模式 [编辑器后台处理对象类型] {None：无处理、 CodeList：代码表、 PickupText：外键文本、 AC：自动填充、 Custom：自定义 }
   * @type {( string | 'None' | 'CodeList' | 'PickupText' | 'AC' | 'Custom')}
   * 来源  getAjaxHandlerType
   */
  ajaxHandlerType?:
    | string
    | 'None'
    | 'CodeList'
    | 'PickupText'
    | 'AC'
    | 'Custom';

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 容器类型
   * @description 值模式 [编辑器应用场合] {FORMITEM：表单项编辑器、 GRIDCOLUMN：表格单元格编辑器、 PANELFIELD：面板属性编辑器 }
   * @type {( string | 'FORMITEM' | 'GRIDCOLUMN' | 'PANELFIELD')}
   * 来源  getContainerType
   */
  containerType?: string | 'FORMITEM' | 'GRIDCOLUMN' | 'PANELFIELD';

  /**
   * 编辑器高度
   * @type {number}
   * 来源  getEditorHeight
   */
  editorHeight?: number;

  /**
   * 编辑器类型
   * @type {string}
   * 来源  getEditorType
   */
  editorType?: string;

  /**
   * 编辑器宽度
   * @type {number}
   * 来源  getEditorWidth
   */
  editorWidth?: number;

  /**
   * 链接视图显示模式
   * @description 值模式 [编辑器引用视图类型] {NORMAL：常规、 MODAL：模态、 EMBEDDED：嵌入 }
   * @type {( string | 'NORMAL' | 'MODAL' | 'EMBEDDED')}
   * 来源  getLinkViewShowMode
   */
  linkViewShowMode?: string | 'NORMAL' | 'MODAL' | 'EMBEDDED';

  /**
   * 界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 前端应用插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 引用视图显示模式
   * @description 值模式 [编辑器引用视图类型] {NORMAL：常规、 MODAL：模态、 EMBEDDED：嵌入 }
   * @type {( string | 'NORMAL' | 'MODAL' | 'EMBEDDED')}
   * 来源  getRefViewShowMode
   */
  refViewShowMode?: string | 'NORMAL' | 'MODAL' | 'EMBEDDED';

  /**
   * 样式代码
   * @type {string}
   * 来源  getStyleCode
   */
  styleCode?: string;

  /**
   * 仅扩展界面样式
   * @type {boolean}
   * @default false
   * 来源  isExtendStyleOnly
   */
  extendStyleOnly?: boolean;

  /**
   * 替换默认样式
   * @type {boolean}
   * 来源  isReplaceDefault
   */
  replaceDefault?: boolean;
}
