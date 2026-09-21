import { IApiCalendarViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description  实体日历视图UI状态
 * @export
 * @interface ICalendarViewState
 * @extends {IMDViewState}
 * @extends {IApiCalendarViewState}
 */
export interface ICalendarViewState
  extends IMDViewState,
    IApiCalendarViewState {}
