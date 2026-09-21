import { IApiExpViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 导航视图UI状态
 * @export
 * @interface IExpViewState
 * @extends {IViewState}
 * @extends {IApiExpViewState}
 */
export interface IExpViewState extends IViewState, IApiExpViewState {
  /**
   * 导航数据
   *
   * @author zk
   * @date 2023-05-30 04:05:45
   * @type {string}
   * @memberof IGridExpViewState
   */
  srfnav: string;
}
