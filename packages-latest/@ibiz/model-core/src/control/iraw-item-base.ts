import { IControlAttribute } from './icontrol-attribute';
import { IControlLogic } from './icontrol-logic';
import { IControlRender } from './icontrol-render';
import { IRawItemParam } from './iraw-item-param';
import { ILanguageRes } from '../res/ilanguage-res';
import { ISysCss } from '../res/isys-css';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件直接内容成员模型基础对象接口
 * 子接口类型识别属性[contentType]
 * @export
 * @interface IRawItemBase
 */
export interface IRawItemBase extends IModelObject {
  /**
   * 内容类型
   * @type {string}
   * 来源  getContentType
   */
  contentType?: string;

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
   * 直接内容项参数集合
   *
   * @type {IRawItemParam[]}
   * 来源  getPSRawItemParams
   */
  rawItemParams?: IRawItemParam[];

  /**
   * 系统样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;

  /**
   * 内容高度
   * @type {number}
   * @default 0.0
   * 来源  getRawItemHeight
   */
  rawItemHeight?: number;

  /**
   * 内容宽度
   * @type {number}
   * @default 0.0
   * 来源  getRawItemWidth
   */
  rawItemWidth?: number;

  /**
   * 操作提示信息
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

  /**
   * 模板模式
   * @type {boolean}
   * @default false
   * 来源  isTemplateMode
   */
  templateMode?: boolean;
}
