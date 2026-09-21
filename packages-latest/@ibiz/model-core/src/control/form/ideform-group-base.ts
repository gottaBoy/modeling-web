import { IDEFormDetail } from './ideform-detail';

/**
 *
 * 实体表单分组面板成员模型基础对象接口
 * @export
 * @interface IDEFormGroupBase
 */
export interface IDEFormGroupBase extends IDEFormDetail {
  /**
   * 动态标题绑定值项
   * @type {string}
   * 来源  getCaptionItemName
   */
  captionItemName?: string;

  /**
   * 成员项忽略输入模式
   * @type {number}
   * @default 0
   * 来源  getItemIgnoreInput
   */
  itemIgnoreInput?: number;

  /**
   * 成员集合
   *
   * @type {IDEFormDetail[]}
   * 来源  getPSDEFormDetails
   */
  deformDetails?: IDEFormDetail[];

  /**
   * 标题栏关闭模式
   * @description 值模式 [分组标题栏关闭模式] {0：无关闭、 1：启用关闭（默认打开）、 2：启用关闭（默认关闭） }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getTitleBarCloseMode
   */
  titleBarCloseMode?: number | 0 | 1 | 2;

  /**
   * 提供锚点
   * @type {boolean}
   * @default false
   * 来源  isEnableAnchor
   */
  enableAnchor?: boolean;
}
