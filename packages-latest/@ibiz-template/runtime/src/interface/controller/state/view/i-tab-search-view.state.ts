import { IApiTabSearchViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体分页搜索视图UI状态
 * @export
 * @interface ITabSearchViewState
 * @extends {IViewState}
 * @extends {IApiTabSearchViewState}
 */
export interface ITabSearchViewState
  extends IViewState,
    IApiTabSearchViewState {
  /**
   * 导航标识
   *
   * @author zk
   * @date 2023-06-19 09:06:40
   * @type {string}
   * @memberof ITabSearchViewState
   */
  srfnav: string;
}
