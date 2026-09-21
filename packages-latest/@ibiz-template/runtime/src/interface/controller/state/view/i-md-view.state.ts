import { IApiMDViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 多数据视图UI状态
 * @export
 * @interface IMDViewState
 * @extends {IViewState}
 * @extends {IApiMDViewState}
 */
export interface IMDViewState extends IViewState, IApiMDViewState {}
