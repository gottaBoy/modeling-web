import { IApiReportViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体报表视图UI状态
 * @export
 * @interface IReportViewState
 * @extends {IViewState}
 * @extends {IApiReportViewState}
 */
export interface IReportViewState extends IViewState, IApiReportViewState {}
