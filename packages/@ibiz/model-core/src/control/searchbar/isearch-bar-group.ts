import { ISearchBarItem } from './isearch-bar-item';
import { IDEDQCondition } from '../../dataentity/ds/idedqcondition';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * @export
 * @interface ISearchBarGroup
 */
export interface ISearchBarGroup extends ISearchBarItem {
  /**
   * 过滤器条件
   *
   * @type {IDEDQCondition[]}
   * 来源  getFilterPSDEDQConditions
   */
  filterDEDQConditions?: IDEDQCondition[];

  /**
   * 分组提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 分组提示信息多语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTooltipPSLanguageRes
   */
  tooltipLanguageRes?: ILanguageRes;

  /**
   * 宽度
   * @type {number}
   * 来源  getWidth
   */
  width?: number;

  /**
   * 添加分隔栏
   * @type {boolean}
   * 来源  isAddSeparator
   */
  addSeparator?: boolean;

  /**
   * 默认分组
   * @type {boolean}
   * @default false
   * 来源  isDefaultGroup
   */
  defaultGroup?: boolean;
}
