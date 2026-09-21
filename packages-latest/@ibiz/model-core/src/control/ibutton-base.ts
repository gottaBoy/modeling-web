import { ILanguageRes } from '../res/ilanguage-res';
import { IModelObject } from '../imodel-object';

/**
 *
 * 按钮部件模型基础对象接口
 * @export
 * @interface IButtonBase
 */
export interface IButtonBase extends IModelObject {
  /**
   * 边框样式
   * @description 值模式 [边框样式] {NONE：无边框、 SOLID：实线边框、 DOTTED：点状边框、 DASHED：虚线边框、 DOUBLE：双线边框 }
   * @type {( string | 'NONE' | 'SOLID' | 'DOTTED' | 'DASHED' | 'DOUBLE')}
   * 来源  getBorderStyle
   */
  borderStyle?: string | 'NONE' | 'SOLID' | 'DOTTED' | 'DASHED' | 'DOUBLE';

  /**
   * 按钮直接样式
   * @type {string}
   * 来源  getButtonCssStyle
   */
  buttonCssStyle?: string;

  /**
   * 按钮高度
   * @type {number}
   * @default 0.0
   * 来源  getButtonHeight
   */
  buttonHeight?: number;

  /**
   * 按钮样式
   * @description 值模式 [按钮样式] {DEFAULT：默认、 INVERSE：反向、 PRIMARY：主要、 INFO：信息、 SUCCESS：成功、 WARNING：警告、 DANGER：危险、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'INVERSE' | 'PRIMARY' | 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * 来源  getButtonStyle
   */
  buttonStyle?:
    | string
    | 'DEFAULT'
    | 'INVERSE'
    | 'PRIMARY'
    | 'INFO'
    | 'SUCCESS'
    | 'WARNING'
    | 'DANGER'
    | 'STYLE2'
    | 'STYLE3'
    | 'STYLE4';

  /**
   * 按钮类型
   * @type {string}
   * @default PANELBUTTON
   * 来源  getButtonType
   */
  buttonType?: string;

  /**
   * 按钮宽度
   * @type {number}
   * @default 0.0
   * 来源  getButtonWidth
   */
  buttonWidth?: number;

  /**
   * 图标对齐
   * @description 值模式 [按钮图标方向] {LEFT：左侧、 TOP：上方、 RIGHT：右侧、 BOTTOM：下方 }
   * @type {( string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM')}
   * 来源  getIconAlign
   */
  iconAlign?: string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM';

  /**
   * 按钮绘制模式
   * @description 值模式 [按钮绘制模式] {BUTTON：按钮、 LINK：链接 }
   * @type {( string | 'BUTTON' | 'LINK')}
   * @default BUTTON
   * 来源  getRenderMode
   */
  renderMode?: string | 'BUTTON' | 'LINK';

  /**
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 操作提示语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTooltipPSLanguageRes
   */
  tooltipLanguageRes?: ILanguageRes;
}
