import { IApiCalendarExpViewState } from '../../../api';
import { IExpViewState } from './i-exp-view.state';

/**
 * @description 实体日历导航视图UI状态
 * @export
 * @interface ICalendarExpViewState
 * @extends {IExpViewState}
 * @extends {IApiCalendarExpViewState}
 */
export interface ICalendarExpViewState
  extends IExpViewState,
    IApiCalendarExpViewState {}
