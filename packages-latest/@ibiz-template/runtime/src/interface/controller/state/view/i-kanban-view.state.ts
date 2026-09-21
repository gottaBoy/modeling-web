import { IApiKanbanViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体看板视图UI状态
 * @export
 * @interface IKanbanViewState
 * @extends {IMDViewState}
 * @extends {IApiKanbanViewState}
 */
export interface IKanbanViewState extends IMDViewState, IApiKanbanViewState {}
