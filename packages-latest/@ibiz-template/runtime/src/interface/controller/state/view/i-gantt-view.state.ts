import { IApiGanttViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体甘特视图UI状态
 * @export
 * @interface IGanttViewState
 * @extends {IMDViewState}
 * @extends {IApiGanttViewState}
 */
export interface IGanttViewState extends IMDViewState, IApiGanttViewState {}
