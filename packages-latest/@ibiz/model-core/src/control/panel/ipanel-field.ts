import { IEditorContainer } from '../ieditor-container';
import { IPanelItem } from './ipanel-item';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 面板属性项模型对象接口
 * 继承父接口类型值[FIELD]
 * @export
 * @interface IPanelField
 */
export interface IPanelField extends IPanelItem, IEditorContainer {
  /**
   * 默认状态
   * @description 值模式 [编辑项默认状态] {1：只读、 2：禁用 }
   * @type {( number | 1 | 2)}
   * @default 0
   * 来源  getFieldStates
   */
  fieldStates?: number | 1 | 2;

  /**
   * 输出代码表配置模式
   * @description 值模式 [代码表输出模式] {0：无、 1：只输出选择项、 2：输出子项 }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getOutputCodeListConfigMode
   */
  outputCodeListConfigMode?: number | 0 | 1 | 2;

  /**
   * 属性项图片对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 重置项名称集合
   *
   * 来源 getResetItemNames
   */
  resetItemNames?: string[];

  /**
   * 值格式化
   * @type {string}
   * 来源  getValueFormat
   */
  valueFormat?: string;

  /**
   * 视图模型属性名称
   * @type {string}
   * 来源  getViewFieldName
   */
  viewFieldName?: string;

  /**
   * 允许空值输入
   * @type {boolean}
   * @default true
   * 来源  isAllowEmpty
   */
  allowEmpty?: boolean;

  /**
   * 转换为代码项文本
   * @type {boolean}
   * @default false
   * 来源  isConvertToCodeItemText
   */
  convertToCodeItemText?: boolean;

  /**
   * 隐藏属性项
   * @type {boolean}
   * @default false
   * 来源  isHidden
   */
  hidden?: boolean;

  /**
   * 需要代码表配置
   * @type {boolean}
   * @default false
   * 来源  isNeedCodeListConfig
   */
  needCodeListConfig?: boolean;
}
