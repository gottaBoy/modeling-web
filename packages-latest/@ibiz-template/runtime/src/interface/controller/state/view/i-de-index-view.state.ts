import { IApiDEIndexViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体首页视图UI状态
 * @export
 * @interface IDEIndexViewState
 * @extends {IViewState}
 * @extends {IApiDEIndexViewState}
 */
export interface IDEIndexViewState extends IViewState, IApiDEIndexViewState {
  /**
   * 导航数据
   *
   * @author lxm
   * @date 2023-12-11 06:23:55
   * @type {string}
   */
  srfnav: string;
}
