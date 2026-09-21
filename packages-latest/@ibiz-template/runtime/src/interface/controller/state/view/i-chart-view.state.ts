import { IApiChartViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体图表视图UI状态
 * @export
 * @interface IChartViewState
 * @extends {IMDViewState}
 * @extends {IApiChartViewState}
 */
export interface IChartViewState extends IMDViewState, IApiChartViewState {}
