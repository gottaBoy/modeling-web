import { ILanguageRes } from '../res/ilanguage-res';
import { ISysCss } from '../res/isys-css';
import { ISysImage } from '../res/isys-image';
import { IModelObject } from '../imodel-object';

/**
 *
 * 代码表项模型对象接口
 * @export
 * @interface ICodeItem
 */
export interface ICodeItem extends IModelObject {
  /**
   * 背景颜色
   * @type {string}
   * 来源  getBKColor
   */
  bkcolor?: string;

  /**
   * 开始值
   * @type {number}
   * 来源  getBeginValue
   */
  beginValue?: number;

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 文本颜色
   * @type {string}
   * 来源  getColor
   */
  color?: string;

  /**
   * 数据
   * @type {string}
   * 来源  getData
   */
  data?: string;

  /**
   * 结束值
   * @type {number}
   * 来源  getEndValue
   */
  endValue?: number;

  /**
   * 图标样式
   * @type {string}
   * 来源  getIconCls
   */
  iconCls?: string;

  /**
   * 图标样式(X)
   * @type {string}
   * 来源  getIconClsX
   */
  iconClsX?: string;

  /**
   * 图标路径
   * @type {string}
   * 来源  getIconPath
   */
  iconPath?: string;

  /**
   * 图标路径(X)
   * @type {string}
   * 来源  getIconPathX
   */
  iconPathX?: string;

  /**
   * 代码项集合
   *
   * @type {ICodeItem[]}
   * 来源  getPSCodeItems
   */
  codeItems?: ICodeItem[];

  /**
   * 显示样式
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 图标对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 文本
   * @type {string}
   * 来源  getText
   */
  text?: string;

  /**
   * 文本样式
   * @type {string}
   * 来源  getTextCls
   */
  textCls?: string;

  /**
   * 文本语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTextPSLanguageRes
   */
  textLanguageRes?: ILanguageRes;

  /**
   * 提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 提示信息语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTooltipPSLanguageRes
   */
  tooltipLanguageRes?: ILanguageRes;

  /**
   * 代码项数据
   * @type {string}
   * 来源  getUserData
   */
  userData?: string;

  /**
   * 代码项数据2
   * @type {string}
   * 来源  getUserData2
   */
  userData2?: string;

  /**
   * 值
   * @type {string}
   * 来源  getValue
   */
  value?: string;

  /**
   * 默认代码项
   * @type {boolean}
   * @default false
   * 来源  isDefault
   */
  default?: boolean;

  /**
   * 禁止选择
   * @type {boolean}
   * @default false
   * 来源  isDisableSelect
   */
  disableSelect?: boolean;

  /**
   * 包含开始值
   * @type {boolean}
   * @default false
   * 来源  isIncludeBeginValue
   */
  includeBeginValue?: boolean;

  /**
   * 包含结束值
   * @type {boolean}
   * @default false
   * 来源  isIncludeEndValue
   */
  includeEndValue?: boolean;

  /**
   * 显示为空白
   * @type {boolean}
   * @default false
   * 来源  isShowAsEmtpy
   */
  showAsEmtpy?: boolean;
}
