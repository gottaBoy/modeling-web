import { IEditor } from '../ieditor';
import { ISysValueRule } from '../../valuerule/isys-value-rule';

/**
 *
 * 文本编辑器模型基础对象接口
 * 继承父接口类型值[AC|AC_FS|AC_NOBUTTON|AC_FS_NOBUTTON]
 * @export
 * @interface ITextEditor
 */
export interface ITextEditor extends IEditor {
  /**
   * 最大长度[MAXLENGTH]
   * @type {number}
   * 来源  getMaxLength
   */
  maxLength?: number;

  /**
   * 最小长度[MINLENGTH]
   * @type {number}
   * @default 0
   * 来源  getMinLength
   */
  minLength?: number;

  /**
   * 阈值应用代码表对象
   *
   * @type {string}
   * 来源  getPSAppCodeList
   */
  appCodeListId?: string;

  /**
   * 值规则
   *
   * @type {ISysValueRule}
   * 来源  getPSSysValueRule
   */
  sysValueRule?: ISysValueRule;

  /**
   * 显示最大长度[SHOWMAXLENGTH]
   * @type {boolean}
   * @default false
   * 来源  isShowMaxLength
   */
  showMaxLength?: boolean;
}
