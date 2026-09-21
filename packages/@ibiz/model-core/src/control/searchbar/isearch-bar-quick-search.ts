import { ISearchBarItem } from './isearch-bar-item';
import { IDEFSearchMode } from '../../dataentity/defield/idefsearch-mode';

/**
 *
 * @export
 * @interface ISearchBarQuickSearch
 */
export interface ISearchBarQuickSearch extends ISearchBarItem {
  /**
   * 属性搜索模式
   *
   * @type {IDEFSearchMode}
   * 来源  getPSDEFSearchMode
   */
  defsearchMode?: IDEFSearchMode;
}
