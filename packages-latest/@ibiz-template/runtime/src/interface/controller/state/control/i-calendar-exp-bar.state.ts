import { IApiCalendarExpBarState } from '../../../api';
import { IExpBarControlState } from './i-exp-bar-control.state';

/**
 * @description 日历导航栏部件状态接口
 * @export
 * @interface ICalendarExpBarState
 * @extends {IExpBarControlState}
 */
export interface ICalendarExpBarState
  extends IExpBarControlState,
    IApiCalendarExpBarState {}
