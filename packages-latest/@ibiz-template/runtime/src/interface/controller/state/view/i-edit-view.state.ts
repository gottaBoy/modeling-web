import { IApiEditViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体编辑视图UI状态
 * @export
 * @interface IEditViewState
 * @extends {IViewState}
 * @extends {IApiEditViewState}
 */
export interface IEditViewState extends IViewState, IApiEditViewState {
  /**
   * 是否为复制模式
   *
   * @author chitanda
   * @date 2023-09-26 17:09:21
   * @type {boolean}
   */
  copyMode?: boolean;
}
