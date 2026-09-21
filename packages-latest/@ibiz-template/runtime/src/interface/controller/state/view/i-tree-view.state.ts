import { IApiTreeViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体树视图UI状态
 * @export
 * @interface ITreeViewState
 * @extends {IMDViewState}
 * @extends {IApiTreeViewState}
 */
export interface ITreeViewState extends IMDViewState, IApiTreeViewState {}
