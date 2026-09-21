import { IApiTreeGridViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体树表格视图UI状态
 * @export
 * @interface ITreeGridViewState
 * @extends {IMDViewState}
 * @extends {IApiTreeGridViewState}
 */
export interface ITreeGridViewState
  extends IMDViewState,
    IApiTreeGridViewState {}
