import { IApiIndexViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 应用首页视图UI状态
 * @export
 * @interface IIndexViewState
 * @extends {IViewState}
 * @extends {IApiIndexViewState}
 */
export interface IIndexViewState extends IViewState, IApiIndexViewState {
  /**
   * 菜单收缩变化
   *
   * @type {boolean}
   */
  isCollapse: boolean;
}
