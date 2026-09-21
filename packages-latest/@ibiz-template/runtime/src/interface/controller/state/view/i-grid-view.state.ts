import { IApiGridViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 表格视图UI状态
 * @export
 * @interface IGridViewState
 * @extends {IMDViewState}
 * @extends {IApiGridViewState}
 */
export interface IGridViewState extends IMDViewState, IApiGridViewState {}
