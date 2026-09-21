import { IApiTreeGridExViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体树表格视图（增强）UI状态
 * @export
 * @interface ITreeGridExViewState
 * @extends {IMDViewState}
 * @extends {IApiTreeGridExViewState}
 */
export interface ITreeGridExViewState
  extends IMDViewState,
    IApiTreeGridExViewState {}
