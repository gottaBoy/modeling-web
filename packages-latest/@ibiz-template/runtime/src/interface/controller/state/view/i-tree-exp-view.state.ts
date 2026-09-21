import { IApiTreeExpViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体树导航视图UI状态
 * @export
 * @interface ITreeExpViewState
 * @extends {IMDViewState}
 * @extends {IApiTreeExpViewState}
 */
export interface ITreeExpViewState extends IMDViewState, IApiTreeExpViewState {
  /**
   * 导航数据
   *
   * @type {string}
   * @memberof ITreeExpViewState
   */
  srfnav: string;
}
