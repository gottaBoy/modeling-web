import { IApiTabExpViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体分页导航视图UI状态
 * @export
 * @interface ITabExpViewState
 * @extends {IViewState}
 * @extends {IApiTabExpViewState}
 */
export interface ITabExpViewState extends IViewState, IApiTabExpViewState {
  /**
   * 导航标识
   *
   * @author zk
   * @date 2023-06-19 09:06:40
   * @type {string}
   * @memberof ITabExpViewState
   */
  srfnav: string;
}
